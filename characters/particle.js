const particleArray = [];

class Particle {
  constructor() {
    this.x = titan.x + 5;
    this.y = titan.y + 16;
    this.size = Math.random() * 5 + 0;
    this.spaceY = Math.random() * 1 - 0.5;
    this.color = "hsla(" + purpleHue + ",100%, 50%, 0.05)";
  }
  update() {
    if (this.size >= 0.1) this.size += 0.3
    this.x -= speed;
    this.y += this.spaceY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particleArray.unshift(new Particle());
  for (var i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }

  // if more than 200 particlee remove 20 particles
  if (particleArray.length > 200) {
    for (var i = 0; i < 20; i++) {
      particleArray.pop(particleArray[i]);
    }
  }
}
