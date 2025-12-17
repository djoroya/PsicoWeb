#!/bin/bash
set -e
eval "$(conda shell.bash hook)"

# Get the root directory of the project
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Starting installation in $PROJECT_ROOT..."

# 1. Create .conda environment if it doesn't exist
if [ ! -d ".conda" ]; then
    echo "Creating Conda environment in .conda..."
    conda create -p .conda/ python=3.9
else
    echo ".conda environment already exists."
fi

conda activate .conda/
conda install pip


# 2. Install backend dependencies
echo "Installing backend dependencies..."
# Use the pip inside the conda environment directly
pip install -r backend/requirements.txt

# 3. Install frontend dependencies if node_modules doesn't exist
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "frontend/node_modules already exists. Skipping npm install."
fi

echo "Installation complete! You can now run the project using ./scripts/run.sh"
