// filepath: /multi-colored-star-field/multi-colored-star-field/src/worker.js

const canvasWidth = 800;
const canvasHeight = 600;
const numStars = 1000;
const stars = [];

function createStarField() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 0.5 + 0.5
        });
    }
}

function updateStars() {
    stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvasHeight) {
            star.y = 0;
            star.x = Math.random() * canvasWidth;
        }
    });
}

function renderStars() {
    const imageData = new Uint8ClampedArray(canvasWidth * canvasHeight * 4);
    stars.forEach(star => {
        const index = Math.floor(star.y) * canvasWidth + Math.floor(star.x);
        if (index >= 0 && index < imageData.length / 4) {
            imageData[index * 4] = parseInt(star.color.slice(4, star.color.indexOf(','))) % 256; // R
            imageData[index * 4 + 1] = 255; // G
            imageData[index * 4 + 2] = 255; // B
            imageData[index * 4 + 3] = 255; // A
        }
    });
    return imageData;
}

createStarField();

setInterval(() => {
    updateStars();
    const imageData = renderStars();
    postMessage(imageData);
}, 1000 / 60);