// Type definitions
interface Star {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  opacity: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function initializeStarField() {
  const canvas = document.getElementById('star-field') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas element with id "star-field" not found');
    return;
  }
  
  const context = canvas.getContext('2d');
  if (!context) {
    console.error('Could not get 2D rendering context');
    return;
  }
  
  const numStars = 100;
  const layers = 10;
  const stars: Star[][] = [];
  const nebulas: Nebula[] = [];
  let rotationAngle = 0;
  let burst = false;
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  let centerAngle = 0;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Calculate the maximum distance from the center to the corners of the canvas
  const maxDistance = Math.sqrt((canvas.width / 2) ** 2 + (canvas.height / 2) ** 2);

  // Pre-calculate star positions for each layer
  for (let i = 0; i < layers; i++) {
    const layerStars: Star[] = [];
    for (let j = 0; j < numStars; j++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * maxDistance;
      layerStars.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: (Math.random() * 2 + 0.5) * (i + 1), // Adjust emission speed
        angle: angle,
        opacity: 1 - i * 0.1,
      });
    }
    stars.push(layerStars);
  }

  // Pre-calculate nebula positions
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * maxDistance + maxDistance;
    nebulas.push({
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      radius: Math.random() * 200 + 100, // Increase size of nebulae
      color: `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.02) - 0.01, // Random rotation speed
    });
  }

  function drawNebula(ctx: CanvasRenderingContext2D, nebula: Nebula) {
    const gradient = ctx.createRadialGradient(
      nebula.x,
      nebula.y,
      nebula.radius / 2,
      nebula.x,
      nebula.y,
      nebula.radius
    );
    gradient.addColorStop(0, nebula.color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.translate(nebula.x, nebula.y);
    ctx.rotate(nebula.rotation);
    ctx.translate(-nebula.x, -nebula.y);

    ctx.beginPath();
    ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
  }

  function animate(audioContext: AudioContext | null, audioBuffer: AudioBuffer | null, startTime: number) {
    // Early return if context is null
    if (!context) return;
    
    const currentTime = audioContext ? audioContext.currentTime - startTime : 0;
    const frequency = Math.sin(currentTime * 2 * Math.PI * 0.5); // Adjust frequency to match the tune

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(centerX, centerY);
    context.rotate(rotationAngle);
    context.translate(-centerX, -centerY);

    // Draw nebulas
    nebulas.forEach((nebula) => {
      drawNebula(context!, nebula);
      nebula.rotation += nebula.rotationSpeed * frequency; // Sync rotation with frequency
    });

    // Draw stars
    stars.forEach((layerStars, layerIndex) => {
      layerStars.forEach((star) => {
        const distanceFromCenter = Math.sqrt((star.x - centerX) ** 2 + (star.y - centerY) ** 2);
        const speedFactor = burst ? Math.min(distanceFromCenter / maxDistance, 1) : 1;

        star.x += Math.cos(star.angle) * star.speed * speedFactor * frequency;
        star.y += Math.sin(star.angle) * star.speed * speedFactor * frequency;

        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * maxDistance;
          star.x = centerX + Math.cos(angle) * distance;
          star.y = centerY + Math.sin(angle) * distance;
          star.speed = (Math.random() * 2 + 0.5) * (layerIndex + 1); // Adjust emission speed
          star.angle = angle;
        }

        // Make the star at the very center black
        if (Math.abs(star.x - centerX) < 1 && Math.abs(star.y - centerY) < 1) {
          star.color = 'black';
        }

        context!.beginPath();
        context!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context!.fillStyle = star.color;
        context!.globalAlpha = star.opacity;
        context!.shadowBlur = 5;
        context!.shadowColor = star.color;
        context!.fill();
      });
    });

    context.restore();
    rotationAngle += 0.2 * frequency; // Increase rotation speed

    // Update center position to move in a circular path
    centerAngle += 0.02 * frequency; // Increase center movement speed
    const radius = canvas.width * 0.1; // 10% of the screen width
    centerX = canvas.width / 2 + Math.cos(centerAngle) * radius;
    centerY = canvas.height / 2 + Math.sin(centerAngle) * radius;

    requestAnimationFrame(() => animate(audioContext, audioBuffer, startTime));
  }

  function revolveLayers() {
    const firstLayer = stars.shift();
    if (firstLayer) {
      stars.push(firstLayer);
    }
    setTimeout(revolveLayers, 5000); // Adjust interval as needed
  }

  function toggleBurst() {
    burst = !burst;
    setTimeout(toggleBurst, 10000); // Toggle burst every 10 seconds
  }

  function startAudio() {
    // Modern browsers only support AudioContext, not webkitAudioContext
    const AudioContextClass = window.AudioContext || (window as typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('AudioContext not supported, starting animation without audio');
      animate(null, null, 0);
      return;
    }
    const audioContext = new AudioContextClass();
    fetch('/doctor-who-theme.mp3') // Ensure the path to the MP3 file is correct
      .then(response => response.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(audioBuffer => {
        const playAudio = () => {
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);

          // Resume the AudioContext after a user gesture
          const resumeAudioContext = () => {
            if (audioContext.state === 'suspended') {
              audioContext.resume().then(() => {
                source.start(0);
                const startTime = audioContext.currentTime;
                animate(audioContext, audioBuffer, startTime);
              });
            } else {
              source.start(0);
              const startTime = audioContext.currentTime;
              animate(audioContext, audioBuffer, startTime);
            }
          };

          source.onended = playAudio; // Restart the audio when it ends

          document.addEventListener('click', resumeAudioContext, { once: true });
          document.addEventListener('touchstart', resumeAudioContext, { once: true });
        };

        playAudio();
      })
      .catch(error => {
        console.error('Error loading audio file:', error);
        // Start animation without audio
        animate(null, null, 0);
      });
  }

  startAudio();
  setTimeout(revolveLayers, 5000); // Adjust interval as needed
  setTimeout(toggleBurst, 10000); // Start toggling burst
}
