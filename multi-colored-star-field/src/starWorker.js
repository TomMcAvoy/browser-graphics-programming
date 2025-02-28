self.onmessage = function (e) {
  const { width, height, numStars } = e.data;
  const stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1, // Ensure minimum radius of 1
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    });
  }

  self.postMessage(stars);
};
