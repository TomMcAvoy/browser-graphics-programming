#!/bin/bash

# Browser Graphics Programming - Shutdown Script
# This script stops all running projects

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

# Function to check if a process is running
process_running() {
    kill -0 "$1" 2>/dev/null
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_status "Shutting down Browser Graphics Programming projects..."

# Check for PID files directory
PID_DIR="$PROJECT_ROOT/.pids"
if [ ! -d "$PID_DIR" ]; then
    print_warning "No PID directory found. No processes to stop."
    exit 0
fi

# Stop Multi-Colored Star Field
STARFIELD_PID_FILE="$PID_DIR/starfield.pid"
if [ -f "$STARFIELD_PID_FILE" ]; then
    STARFIELD_PID=$(cat "$STARFIELD_PID_FILE")
    if process_running "$STARFIELD_PID"; then
        print_status "Stopping Multi-Colored Star Field (PID: $STARFIELD_PID)..."
        kill "$STARFIELD_PID"
        
        # Wait for graceful shutdown
        sleep 2
        
        # Force kill if still running
        if process_running "$STARFIELD_PID"; then
            print_warning "Process still running, force killing..."
            kill -9 "$STARFIELD_PID" 2>/dev/null || true
        fi
        
        print_success "Multi-Colored Star Field stopped"
    else
        print_warning "Multi-Colored Star Field process not running (stale PID file)"
    fi
    
    # Remove PID file
    rm -f "$STARFIELD_PID_FILE"
else
    print_warning "No Multi-Colored Star Field PID file found"
fi

# Kill any remaining processes on port 3000
print_status "Checking for remaining processes on port 3000..."
PORT_PIDS=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PORT_PIDS" ]; then
    print_status "Killing remaining processes on port 3000: $PORT_PIDS"
    echo "$PORT_PIDS" | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Clean up any Next.js processes
print_status "Cleaning up Next.js processes..."
pkill -f "next-server" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true

# Verify port 3000 is free
if lsof -i:3000 >/dev/null 2>&1; then
    print_error "Port 3000 is still in use. You may need to manually kill the process:"
    lsof -i:3000
else
    print_success "Port 3000 is now free"
fi

# Clean up empty PID directory
if [ -d "$PID_DIR" ] && [ -z "$(ls -A "$PID_DIR")" ]; then
    rmdir "$PID_DIR"
    print_status "Cleaned up empty PID directory"
fi

print_success "🌟 All Browser Graphics Programming projects have been stopped"
print_status "Use './scripts/startup.sh' to start projects again"
