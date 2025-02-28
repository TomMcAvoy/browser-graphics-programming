// filepath: /multi-colored-star-field/multi-colored-star-field/src/main.js

const canvas = document.getElementById('starField');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const worker = new Worker('worker.js');

worker.onmessage = function(event) {
    const { imageData, x, y } = event.data;
    ctx.putImageData(imageData, x, y);
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    worker.postMessage({ action: 'render', width: canvas.width, height: canvas.height });
    requestAnimationFrame(draw);
}

draw();

window.onload = function() {
    const backgroundLayer = document.getElementById('background-layer');
    const starsLayer = document.getElementById('stars-layer');
    const effectsLayer = document.getElementById('effects-layer');

    const bgCtx = backgroundLayer.getContext('2d');
    const starsCtx = starsLayer.getContext('2d');
    const effectsCtx = effectsLayer.getContext('2d');

    function resizeCanvas() {
        backgroundLayer.width = window.innerWidth;
        backgroundLayer.height = window.innerHeight;
        starsLayer.width = window.innerWidth;
        starsLayer.height = window.innerHeight;
        effectsLayer.width = window.innerWidth;
        effectsLayer.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawBackground() {
        bgCtx.fillStyle = 'black';
        bgCtx.fillRect(0, 0, backgroundLayer.width, backgroundLayer.height);
    }

    function drawStars() {
        starsCtx.clearRect(0, 0, starsLayer.width, starsLayer.height);
        const starCount = 100;
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * starsLayer.width;
            const y = Math.random() * starsLayer.height;
            const radius = Math.random() * 2 + 1;
            starsCtx.beginPath();
            starsCtx.arc(x, y, radius, 0, Math.PI * 2);
            starsCtx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
            starsCtx.fill();
        }
    }

    function drawEffects() {
        effectsCtx.clearRect(0, 0, effectsLayer.width, effectsLayer.height);
        // ...existing code to draw effects...
    }

    function animate() {
        drawBackground();
        drawStars();
        drawEffects();
        requestAnimationFrame(animate);
    }

    animate();
}