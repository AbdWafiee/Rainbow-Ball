var balls = [];
var bullets = [];
var ship;
var cnv;

function setup() {

  //creates the canvas and mouse press is only applies when it's pressed within the canvas
  cnv = createCanvas(871, 572);
  cnv.mousePressed(loadBullets);

  createElement('h2', 'Use your mouse/trackpad to move the square ship around, and left click to fire bullets at the bouncing balls. Ensure that you click the mouse button within the confines of the dark-grey box.');

  ship = new Ship();

  for (var i = 0; i < 25; i++) {
    var bouncingBalls = new Bouncingballs(random(0, width), random(0, height/1.3));
    balls.push(bouncingBalls);
  }
}

function draw() {
  background(51,51,51);
  ship.drawShip();

  // draw the balls onto the canvas
  for (var i = 0; i < balls.length; i++) {
    balls[i].drawBall();
  }

  // draws the bullets and checks to see if there is any contact between bullets and balls
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].drawBullets();
    bullets[i].move();
    for (var j = 0; j < balls.length; j++) {
      if (bullets[i].hit(balls[j])) {
        bullets[i].disappear();
        balls[j].disappear();
        //console.log("Hit!");
      }
    }
  }

  // remove the bullet when it hits a ball
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].gone) {
      bullets.splice(i, 1);
    }
  }

  // remove the ball when it hits a bullet
  for (var i = 0; i < balls.length; i++) {
    if (balls[i].gone) {
      balls.splice(i, 1);
    }
  }
}

// class definition for a ball with random color arragements and position
function Bouncingballs(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 15;
  this.gone = false;

  this.velX = 2;
  this.velY = -2;

  this.r = random(0,255);
  this.g = random(0,255);
  this.b = random(0,255);

  this.drawBall = function() {

    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 0 || this.x > width) {
      this.velX *= -1;
    }

    if (this.y < 0 || this.y > height/1.3) {
      this.velY *= -1;
    }

    fill(this.r, this.g, this.b);
    strokeWeight(3);
    stroke(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  this.disappear = function() {
    this.gone = true;
  }
}

// class definition for a square ship that is moved by mouse movements
function Ship() {
  this.drawShip = function() {
    fill(255);
    rectMode(CENTER);
    rect(mouseX, height, 20, 40);
  }
}

// class definition for bullets when the mouse is pressed. Bullets are fired based on the x-position of the mouse.
function Bullets(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 5;
  this.bulletSpeed = 3;
  this.gone = false;

  this.drawBullets = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  this.move = function() {
    this.y = this.y - this.bulletSpeed;
  }

  this.hit = function(ball) {
    var d = dist(this.x, this.y, ball.x, ball.y);
    if (d < this.radius + ball.radius) {
      return true;
    }
    else {
      return false;
    }
  }

  this.disappear = function() {
    this.gone = true;
  }
}

// class definition to load the created bullets to an array when the mouse is pressed
function loadBullets() {
  var makeBullets = new Bullets(mouseX, height);
  bullets.push(makeBullets);
}
