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
            const star = document.createElement('div');
            star.className = 'star rainbow-star';
            star.style.width = `${radius}px`;
            star.style.height = `${radius}px`;
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            document.body.appendChild(star);
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
