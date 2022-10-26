const titan = {
  animation : [
    'images/titan1.png',
    'images/titan2.png',
    'images/titan3.png',
    'images/titan4.png',
    'images/titan5.png'
  ],

  dead_image : [
    'images/titan_dead.png'
  ],

  x : 150,
  y : 250,
  w : 64,
  h : 64,
  radius: 32,
  frame : 0,
  counter : 0,
  image : new Image(),
  ctx: null,
  cvs: null,
  wing_direction : 1,
  dead : false,
  weight : 0.05,
  vY : 0.3,
  front : 0,
  top : 0,

  update : function() {
    if (this.dead) {
      return;
    }

    this.vY += this.weight;
    this.y += this.vY;

    this.front = this.x + this.w
    this.top = this.y + this.h;

    if (this.counter % 8 === 0) {
      if (this.frame > 4) {
        this.wing_direction = -1;
      }

      if (this.frame < 2) {
        this.wing_direction = 1;
      }

      this.frame += this.wing_direction;
    }

    this.image.src = this.animation[this.frame - 1];

    if(this.y + this.h >= cvs.height) {
      //this.dead = true;
      //this.image.src = this.dead_image[0];
      this.y = cvs.height - this.h;
      this.vY = 0.3;
    }

    if(this.y < 0) {
      //this.dead = true;
      //this.image.src = this.dead_image[0];
      this.y = 0;
      this.vY = 0.3;
    }

    this.counter++;
  },

  draw : function() {
    //animation = this.animation[this.frame];
    //ctx.drawImage(this.image, animation.sX, animation.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
    self.ctx.drawImage(this.image, this.x, this.y, 64, 64);
  },

  flap : function() {
    this.vY -= 3.0;
  },

  init : function(cvs, ctx) {
    console.log('initializing titan');
    this.image.src = "images/titan1.png";
    this.ctx = ctx;
    this.cvs = cvs;
  }
}
