#!/bin/bash

# Browser Graphics Programming - Startup Script
# This script installs dependencies and starts all projects

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -i:"$1" >/dev/null 2>&1
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_status "Starting Browser Graphics Programming projects..."
print_status "Project root: $PROJECT_ROOT"

# Check for required tools
if ! command_exists "pnpm"; then
    print_error "pnpm is not installed. Please install it first:"
    echo "  npm install -g pnpm"
    exit 1
fi

# Check if port 3000 is already in use
if port_in_use 3000; then
    print_warning "Port 3000 is already in use. Checking if it's our project..."
    if curl -s http://localhost:3000 | grep -q "Multi-Colored Star Field" 2>/dev/null; then
        print_success "Multi-Colored Star Field is already running on port 3000"
        print_status "Open your browser to: http://localhost:3000"
        exit 0
    else
        print_error "Port 3000 is in use by another application. Please stop it first."
        exit 1
    fi
fi

# Install root dependencies if package.json exists
if [ -f "$PROJECT_ROOT/package.json" ]; then
    print_status "Installing root dependencies..."
    cd "$PROJECT_ROOT"
    pnpm install
    print_success "Root dependencies installed"
fi

# Start Multi-Colored Star Field project
print_status "Starting Multi-Colored Star Field project..."
cd "$PROJECT_ROOT/multi-colored-star-field"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_status "Installing Multi-Colored Star Field dependencies..."
    pnpm install
    print_success "Dependencies installed"
fi

# Create a PID file directory
mkdir -p "$PROJECT_ROOT/.pids"

# Start the development server in the background
print_status "Starting development server on port 3000..."
nohup pnpm run dev > "$PROJECT_ROOT/.pids/starfield.log" 2>&1 &
echo $! > "$PROJECT_ROOT/.pids/starfield.pid"

# Wait a moment for the server to start
sleep 3

# Check if the server started successfully
if port_in_use 3000; then
    print_success "Multi-Colored Star Field started successfully!"
    print_status "Server logs: $PROJECT_ROOT/.pids/starfield.log"
    print_status "Server PID: $(cat $PROJECT_ROOT/.pids/starfield.pid)"
    echo ""
    print_success "🌟 Your star field is ready!"
    print_status "Open your browser to: http://localhost:3000"
    echo ""
    print_status "Use './scripts/status.sh' to check running projects"
    print_status "Use './scripts/shutdown.sh' to stop all projects"
else
    print_error "Failed to start the development server"
    print_status "Check logs: $PROJECT_ROOT/.pids/starfield.log"
    exit 1
fi
