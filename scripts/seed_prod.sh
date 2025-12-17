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

echo "--- PRODUCTION SEED ---"

# Load environment variables
if [ -f backend/.env ]; then
    echo "Loading environment variables from backend/.env"
    export $(cat backend/.env | grep -v '^#' | xargs)
fi

# Determine Admin Password
if [ -n "$ADMIN_PASSWORD_PROD" ]; then
    echo "Using ADMIN_PASSWORD_PROD for seeding admin user."
    export SEED_ADMIN_PASSWORD="$ADMIN_PASSWORD_PROD"
elif [ -n "$SEED_ADMIN_PASSWORD" ]; then
    echo "Using SEED_ADMIN_PASSWORD from environment."
    export SEED_ADMIN_PASSWORD="$SEED_ADMIN_PASSWORD"
elif [ -n "$ADMIN_PASSWORD" ]; then
    echo "Using ADMIN_PASSWORD for seeding admin user."
    export SEED_ADMIN_PASSWORD="$ADMIN_PASSWORD"
else
    echo "No admin password variable found. Using default from initial_data.json."
fi

# Run Seed Script
# Run Seed Script
# python scripts/seed_db.py
python scripts/seed_api.py

echo "Seed completed!"
