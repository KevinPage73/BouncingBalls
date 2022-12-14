/*
 * This program sketch is copied from Evan Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 */

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;

function preload() {

  //sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {
  image = loadImage('night-sky.jpg');

  createCanvas(windowWidth, windowHeight);


  
  noStroke();
  
  //sound.play();    // play the audio file once
  //sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }
  
  ball1 = new Ball(); 
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  rect(width/2 - BOX_WIDTH/2,  0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(32);           // size of the text (pixels)
  fill(0, 102, 153);      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Hello World!', width/2, BOX_HEIGHT/2);   
 
}

function draw() {
  image(image, 0, 0);

  background(255);
  createBox();
  
  //ball1.display(); 
  ball1.checkForHitWall(); 
  ball1.moveBall();
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].moveBall();
    balls[ballNum].checkForHitBall(ball1);
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = 20 + random(80);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height){
      this.ballY = height - radius; 
      this.speedY = -this.speedY
    }
    if((this.ballY-radius) < 0) {
      this.ballY = radius; 
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width){
      this.ballX = width - radius; 
      this.speedX = -this.speedX; 
    }
    if((this.ballX-radius) < 0) {
      this.ballX = radius; 
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;
    
    if ((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) { 
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    } 
  }
  
  checkForHitBall(other){
    let radius = this.size/2; 
    if(other.size/2 >= this.size/2)
      radius = other.size/2 
    if(abs(this.ballX - other.ballX) <= radius && abs(this.ballY - other.ballY) <= radius){
      this.speedX = 0;
      this.speedY = 0; 
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}