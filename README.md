# browser-graphics-programming

A collection of client-side graphics programming projects and techniques.

## Description

This repository demonstrates various techniques and algorithms for rendering graphics in the browser using HTML5 Canvas, WebGL, and modern web technologies. It includes interactive demos and examples showcasing different aspects of browser-based graphics programming.

## Projects

### Multi-Colored Star Field
A Doctor Who-themed animated star field featuring:
- Multi-layered rotating star field with burst effects
- Audio-synchronized animations using Web Audio API
- Nebula effects with radial gradients
- Next.js with TypeScript and Tailwind CSS
- Canvas 2D and WebGL rendering techniques

## Quick Start

### Option 1: Use the convenience scripts (recommended)
```bash
# Install dependencies and start all projects
./scripts/startup.sh

# Check status of running projects
./scripts/status.sh

# Stop all running projects
./scripts/shutdown.sh
```

### Option 2: Manual setup
1. Clone the repository:
    ```bash
    git clone https://github.com/thomasmcavoy/browser-graphics-programming.git
    cd browser-graphics-programming
    ```

2. Install dependencies:
    ```bash
    pnpm install
    cd multi-colored-star-field && pnpm install && cd ..
    ```

3. Start the development server:
    ```bash
    cd multi-colored-star-field
    pnpm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Features

- **Multi-layered Star Field**: Dynamic star field with configurable layers and speeds
- **Audio Synchronization**: Animations synchronized with Doctor Who theme music
- **Particle Effects**: Nebula and burst effects using Canvas 2D API
- **Responsive Design**: Adaptive layouts using Tailwind CSS
- **Modern Tech Stack**: Next.js, TypeScript, React, and Web APIs
- **Performance Optimized**: Web Workers and optimized rendering loops

## Development

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Turbo for fast development builds
- **Package Manager**: pnpm for efficient dependency management

## Testing

```bash
cd multi-colored-star-field
pnpm test
```

## Project Structure

```
browser-graphics-programming/
├── scripts/                 # Convenience scripts
│   ├── startup.sh          # Start all projects
│   ├── shutdown.sh         # Stop all projects
│   └── status.sh           # Check project status
├── multi-colored-star-field/ # Next.js star field demo
│   ├── src/                # Source code
│   ├── components/         # React components
│   ├── public/             # Static assets
│   └── package.json        # Project dependencies
└── README.md               # This file
```

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
