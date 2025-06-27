#!/bin/bash

# Holo Fill Setup Script
echo "🚀 Setting up Holo Fill..."

# Check if Python 3.11+ is installed
python_version=$(python3 --version 2>&1 | grep -oE '[0-9]+\.[0-9]+' | head -1)
required_version="3.11"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Python 3.11 or higher is required. Current version: $python_version"
    exit 1
fi

echo "✅ Python version check passed: $python_version"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

node_version=$(node --version | grep -oE '[0-9]+' | head -1)
if [ "$node_version" -lt 16 ]; then
    echo "❌ Node.js 16 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed"

# Check if Poetry is installed
if ! command -v poetry &> /dev/null; then
    echo "❌ Poetry is not installed. Please install Poetry first:"
    echo "   curl -sSL https://install.python-poetry.org | python3 -"
    exit 1
fi

echo "✅ Poetry is installed"

# Install backend dependencies
echo "📥 Installing backend dependencies with Poetry..."
poetry install

# Install frontend dependencies
echo "📥 Installing frontend dependencies with npm..."
cd frontend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file from template..."
    cp backend/env.example backend/.env
    echo "⚠️  Please edit backend/.env and add your OpenAI API key"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env and add your OpenAI API key"
echo "2. Start the backend server (in one terminal):"
echo "   poetry run uvicorn app.main:app --reload"
echo "3. Start the frontend server (in another terminal):"
echo "   cd frontend && npm start"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 API documentation will be available at: http://localhost:8000/docs"
echo ""
echo "💡 Development commands:"
echo "   # Backend:"
echo "   poetry run black .          # Format code"
echo "   poetry run isort .          # Sort imports"
echo "   poetry run flake8 .         # Lint code"
echo "   poetry run mypy .           # Type check"
echo "   poetry run pytest           # Run tests"
echo ""
echo "   # Frontend:"
echo "   cd frontend"
echo "   npm start                   # Run dev server"
echo "   npm test                    # Run tests"
echo "   npm run build              # Build for production" 