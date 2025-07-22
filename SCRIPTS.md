# Browser Graphics Programming - Script Documentation

This document explains the convenience scripts available for managing the browser graphics programming projects.

## Available Scripts

### 🚀 `./scripts/startup.sh`

**Purpose**: Installs dependencies and starts all projects

**What it does**:
- Checks for required tools (pnpm, Node.js)
- Installs dependencies for root and all sub-projects
- Starts the Multi-Colored Star Field development server
- Creates PID files for process management
- Provides status feedback and URLs

**Usage**:
```bash
./scripts/startup.sh
```

**Output**: 
- Server starts on `http://localhost:3000`
- PID files stored in `.pids/` directory
- Logs stored in `.pids/starfield.log`

---

### 📊 `./scripts/status.sh`

**Purpose**: Check the status of all running projects

**What it shows**:
- System information (Node.js, pnpm versions)
- Project running status with PID and uptime
- Memory usage information
- Port usage status
- Log file information
- Quick action suggestions

**Usage**:
```bash
./scripts/status.sh
```

**Example Output**:
```
🌟 Browser Graphics Programming - Project Status
==============================================
Multi-Colored Star Field Status
✅ Running (PID: 12345)
  Uptime: 1h 23m 45s
  Memory: 145.2 MB
🌐 Accessible at: http://localhost:3000
```

---

### 🛑 `./scripts/shutdown.sh`

**Purpose**: Stop all running projects gracefully

**What it does**:
- Stops all project processes using PID files
- Attempts graceful shutdown first, then force kills if needed
- Cleans up PID files and temporary data
- Frees up ports (especially port 3000)
- Provides cleanup status feedback

**Usage**:
```bash
./scripts/shutdown.sh
```

**Safety Features**:
- Graceful shutdown with 2-second wait
- Force kill as fallback
- Port cleanup verification
- PID file cleanup

---

## Package.json Scripts

You can also use these npm/pnpm scripts from the root directory:

```bash
# Start all projects (calls startup.sh)
pnpm start

# Stop all projects (calls shutdown.sh)  
pnpm stop

# Check status (calls status.sh)
pnpm run status

# Install all dependencies
pnpm run install:all

# Clean all node_modules and temp files
pnpm run clean

# Run the star field project directly
pnpm run dev

# Build the star field project
pnpm run build
```

## File Structure

```
browser-graphics-programming/
├── scripts/
│   ├── startup.sh          # Start all projects
│   ├── shutdown.sh         # Stop all projects
│   └── status.sh           # Check project status
├── .pids/                  # Created at runtime
│   ├── starfield.pid       # Process ID file
│   └── starfield.log       # Development server logs
└── package.json            # Root workspace config
```

## Process Management

### PID Files
- Location: `.pids/` directory (created automatically)
- Format: One PID per line
- Cleanup: Automatic on shutdown

### Log Files
- Development logs: `.pids/starfield.log`
- Rotation: Manual (logs can grow large during development)

### Port Management
- Multi-Colored Star Field: Port 3000
- Automatic conflict detection
- Graceful port cleanup on shutdown

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 3000
lsof -i:3000

# Force kill processes on port 3000
./scripts/shutdown.sh
```

### Stale PID Files
```bash
# Check if processes are actually running
./scripts/status.sh

# Clean up manually if needed
rm -rf .pids/
```

### Permission Issues
```bash
# Make scripts executable
chmod +x scripts/*.sh
```

### Dependencies Issues
```bash
# Clean and reinstall everything
pnpm run clean
pnpm run install:all
```

## Development Workflow

### Starting Development
```bash
./scripts/startup.sh
# Open http://localhost:3000 in browser
```

### Checking Status
```bash
./scripts/status.sh
```

### Following Logs
```bash
tail -f .pids/starfield.log
```

### Stopping Development
```bash
./scripts/shutdown.sh
```

## Integration with IDE

### VS Code Tasks
The scripts can be integrated into VS Code tasks for easy access:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start All Projects",
            "type": "shell",
            "command": "./scripts/startup.sh",
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        }
    ]
}
```

### Git Hooks
Add to `.git/hooks/post-checkout` for automatic startup:

```bash
#!/bin/bash
./scripts/startup.sh
```

## Best Practices

1. **Always use `./scripts/status.sh`** before starting to check current state
2. **Use `./scripts/shutdown.sh`** before switching branches or updating dependencies
3. **Monitor logs** during development with `tail -f .pids/starfield.log`
4. **Check port conflicts** if startup fails
5. **Use workspace commands** (`pnpm start`, `pnpm stop`) for convenience

## Security Notes

- Scripts only bind to localhost (127.0.0.1)
- No external network access required
- PID files contain only process IDs
- Log files may contain sensitive development data
- Scripts require execute permissions (`chmod +x`)

---

*This documentation is part of the Browser Graphics Programming project.*
