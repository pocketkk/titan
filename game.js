var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

let purpleHue = 1000;
let hue = 0;
let speed = 2;
let up = 10;
let down = -10;
let isFlip = true;
let frame = 0;

// Variables
const state = {
  current: 1,
  getReady: 0,
  game: 1,
  over: 2
}

function setup(){
  titan.init(ctx);
}

function draw(){
  ctx.fillStyle = "#c0c0c0";
  ctx.fillRect(0,0,cvs.width,cvs.height);
  bg.draw();
  titan.draw();
}

function loop(){
  draw();
  update();
  requestAnimationFrame(loop);
}

function update(){
  handleCollision();
  if (handleCollision()) {
  } else {
    handleParticles();
    handleObstacles();
    titan.update();
    hue++;
    frame++;
    if(hue % 5 === 0 && !(hue % 10) !== 0){
      purpleHue--;
      hue = 0;
    }

    if (hue % 20 == 0) {
      purpleHue = 1000;
    }
  }
}

window.addEventListener("keydown", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            if(titan.y - titan.radius <= 0) return;
            titan.flap();
            break;
        case state.over:
            break;
    }
});

// CONTROL THE GAME
cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            if(titan.y - titan.radius <= 0) return;
            titan.flap();
            break;
        case state.over:
            break;
    }
});

// add listener to cvs for keypresses

cvs.addEventListener("keydown", function(evt){
  console.log(evt.keyCode);
});

// BACKGROUND
const bg = {
    sX : 0,
    sY : 0,
    w : 3072,
    h : 1536,
    x : 0,
    y : cvs.height - 554,
    image : new Image(),
    speed : speed,

    draw : function(){
        this.image.src = "images/layer-1-sky.png";
        this.sX = this.sX + this.speed;
        if(this.sX + cvs.width >= this.w){
            this.sX = 0;
        }
        ctx.drawImage(this.image, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        //ctx.drawImage(this.image, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

// FOREGROUND
const fg = {
    sX: 276,
    sY: 0,
    w: 224,
    h: 112,
    x: 0,
    y: cvs.height - 112,

    dx : 2,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },

    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

console.log("setting up")
setup();
loop();
