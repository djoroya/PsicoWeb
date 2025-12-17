#!/bin/bash
eval "$(conda shell.bash hook)"

conda activate .conda/

# Check MongoDB
if [ "$(systemctl is-active mongod)" = "active" ]; then
    echo "MongoDB está en ejecución."
else
    echo "MongoDB no está en ejecución. Iniciando MongoDB..."
    sudo systemctl start mongod
fi

echo "--- PRODUCTION MODE ---"

echo "Starting Backend (Gunicorn)..."
# Load environment variables
if [ -f backend/.env ]; then
    echo "Loading environment variables from backend/.env"
    export $(cat backend/.env | grep -v '^#' | xargs)
fi

# Support ADMIN_PASSWORD_PROD overriding ADMIN_PASSWORD
if [ -n "$ADMIN_PASSWORD_PROD" ]; then
    echo "Using ADMIN_PASSWORD_PROD for admin credentials."
    export ADMIN_PASSWORD="$ADMIN_PASSWORD_PROD"
fi

# Kill existing app.py or gunicorn
pkill -f "gunicorn"
pkill -f "app.py"

# Run Gunicorn
# Users 4 workers, binds to port defined in env or 5000
PORT=${PORT:-5000}
gunicorn --chdir backend app:app -w 4 -b 0.0.0.0:$PORT &
BACKEND_PID=$!

echo "Building and Starting Frontend..."
cd frontend
# Build the project
echo "Building frontend assets..."
npm run build

# Serve the built assets
echo "Serving frontend..."
# npm run preview serves the 'dist' folder. Default port 4173.
npm run preview -- --host --port 8080 &
FRONTEND_PID=$!

echo "Production started!"
echo "Backend running on port $PORT"
echo "Frontend running on http://localhost:8080"

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
