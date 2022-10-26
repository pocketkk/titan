const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 2 + 20;
    this.bottom = (Math.random() * canvas.height) / 2 + 20;
    this.left = canvas.width;
    this.right = canvas.width + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = "hsla(" + hue + ",100%,50%,1)";
    this.counted = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    //top pipe drawing
    ctx.fillRect(this.x, 0, this.width, this.top);
    //bottom pipe drawing
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= speed;
    if (!this.counted && this.x < titan.x) {
      //score++;
      //this.counted = true;
    }
    this.draw();
  }

  isCollision(titan) {
    // INCOMPLETE
    return !(
      ((a.y + a.height) < (b.y)) || (a.y > (b.y + b.height)) ||
      ((a.x + a.width) < b.x) || (a.x > (b.x + b.width))
    );
  }
}


function handleObstacles() {
  if (frame % 150 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (var i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
}

function handleCollision() {
  console.log('collision');
  for (var i = 0; i < obstaclesArray.length; i++) {
    let obstacle = obstaclesArray[i]
    if (
      obstacle.x < titan.front && titan.top < obstacle.top
    ) {
      titan.dead = true;
      titan.image.src = "images/titan_dead.png";
      console.log('dead');
      return true;
    }
  }
}
