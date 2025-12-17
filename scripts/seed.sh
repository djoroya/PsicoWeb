#!/bin/bash
eval "$(conda shell.bash hook)"

conda activate .conda/

# comprobar si mongo esta iniciado usando systemctl status mongod
if [ "$(systemctl is-active mongod)" = "active" ]; then
    echo "MongoDB está en ejecución."
else
    echo "MongoDB no está en ejecución. Iniciando MongoDB..."
    sudo systemctl start mongod
fi

echo "Seeding database..."
# Load environment variables from .env file
if [ -f backend/.env ]; then
    echo "Loading environment variables from backend/.env"
    export $(cat backend/.env | grep -v '^#' | xargs)
fi

python scripts/seed_db.py
