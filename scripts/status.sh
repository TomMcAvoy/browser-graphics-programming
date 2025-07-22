#!/bin/bash

# Browser Graphics Programming - Status Script
# This script checks the status of all projects

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
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

print_header() {
    echo -e "${CYAN}$1${NC}"
}

# Function to check if a process is running
process_running() {
    kill -0 "$1" 2>/dev/null
}

# Function to check if a port is in use
port_in_use() {
    lsof -i:"$1" >/dev/null 2>&1
}

# Function to get process info for a port
get_port_process() {
    lsof -ti:"$1" 2>/dev/null || echo ""
}

# Function to format uptime
format_uptime() {
    local pid=$1
    local start_time=$(ps -o lstart= -p "$pid" 2>/dev/null | xargs -I {} date -j -f "%a %b %d %H:%M:%S %Y" "{}" "+%s" 2>/dev/null || echo "")
    
    if [ -n "$start_time" ]; then
        local current_time=$(date +%s)
        local uptime=$((current_time - start_time))
        local hours=$((uptime / 3600))
        local minutes=$(((uptime % 3600) / 60))
        local seconds=$((uptime % 60))
        
        if [ $hours -gt 0 ]; then
            echo "${hours}h ${minutes}m ${seconds}s"
        elif [ $minutes -gt 0 ]; then
            echo "${minutes}m ${seconds}s"
        else
            echo "${seconds}s"
        fi
    else
        echo "unknown"
    fi
}

# Function to get memory usage
get_memory_usage() {
    local pid=$1
    ps -o rss= -p "$pid" 2>/dev/null | awk '{printf "%.1f MB", $1/1024}' || echo "unknown"
}

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_header "🌟 Browser Graphics Programming - Project Status"
echo "=============================================="

# Check system information
print_status "System Information:"
echo "  Date: $(date)"
echo "  Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
echo "  pnpm: $(pnpm --version 2>/dev/null || echo 'Not installed')"
echo ""

# Check Multi-Colored Star Field
print_header "Multi-Colored Star Field Status"
echo "--------------------------------"

PID_DIR="$PROJECT_ROOT/.pids"
STARFIELD_PID_FILE="$PID_DIR/starfield.pid"

if [ -f "$STARFIELD_PID_FILE" ]; then
    STARFIELD_PID=$(cat "$STARFIELD_PID_FILE")
    if process_running "$STARFIELD_PID"; then
        print_success "✅ Running (PID: $STARFIELD_PID)"
        echo "  Uptime: $(format_uptime "$STARFIELD_PID")"
        echo "  Memory: $(get_memory_usage "$STARFIELD_PID")"
        echo "  Log file: $PROJECT_ROOT/.pids/starfield.log"
        
        # Check if accessible via HTTP
        if port_in_use 3000; then
            print_success "🌐 Accessible at: http://localhost:3000"
            
            # Try to get a response from the server
            if curl -s -f http://localhost:3000 >/dev/null 2>&1; then
                print_success "🚀 Server responding normally"
            else
                print_warning "⚠️  Server not responding to HTTP requests"
            fi
        else
            print_error "❌ Port 3000 not accessible"
        fi
    else
        print_error "❌ Not running (stale PID file)"
        echo "  PID file exists but process $STARFIELD_PID is not running"
    fi
else
    print_warning "❌ Not running (no PID file)"
fi

# Check port 3000 status
echo ""
print_header "Port 3000 Status"
echo "----------------"
if port_in_use 3000; then
    PORT_PID=$(get_port_process 3000)
    if [ -n "$PORT_PID" ]; then
        PORT_COMMAND=$(ps -o comm= -p "$PORT_PID" 2>/dev/null || echo "unknown")
        print_status "🔌 Port 3000 is in use"
        echo "  Process: $PORT_COMMAND (PID: $PORT_PID)"
        echo "  Uptime: $(format_uptime "$PORT_PID")"
        echo "  Memory: $(get_memory_usage "$PORT_PID")"
    else
        print_warning "🔌 Port 3000 is in use but process info unavailable"
    fi
else
    print_status "🔌 Port 3000 is free"
fi

# Check for log files
echo ""
print_header "Log Files"
echo "---------"
if [ -f "$PROJECT_ROOT/.pids/starfield.log" ]; then
    LOG_SIZE=$(du -h "$PROJECT_ROOT/.pids/starfield.log" | cut -f1)
    LOG_LINES=$(wc -l < "$PROJECT_ROOT/.pids/starfield.log")
    print_status "📄 Star Field log: $PROJECT_ROOT/.pids/starfield.log"
    echo "  Size: $LOG_SIZE"
    echo "  Lines: $LOG_LINES"
    
    # Show last few lines if there are any errors
    if grep -q "error\|Error\|ERROR" "$PROJECT_ROOT/.pids/starfield.log" 2>/dev/null; then
        print_warning "⚠️  Errors found in log file (showing last 5 lines):"
        tail -5 "$PROJECT_ROOT/.pids/starfield.log" | sed 's/^/    /'
    fi
else
    print_status "📄 No log files found"
fi

# Summary
echo ""
print_header "Quick Actions"
echo "-------------"
if [ -f "$STARFIELD_PID_FILE" ] && process_running "$(cat "$STARFIELD_PID_FILE")"; then
    echo "  ./scripts/shutdown.sh  - Stop all projects"
    echo "  tail -f $PROJECT_ROOT/.pids/starfield.log  - Follow logs"
else
    echo "  ./scripts/startup.sh   - Start all projects"
fi

echo ""
print_status "Status check complete ✨"
