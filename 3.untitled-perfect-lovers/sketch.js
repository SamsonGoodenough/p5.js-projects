var CLOCK_WIDTH;
var BACKGROUND_COLOR;
const HOUR_HAND = 0.55;
const MINUTE_HAND = 0.7;
const SECOND_HAND = 0.8;
var offset;

function setup (){
  createCanvas (windowWidth, windowHeight);
  colorMode(HSB, 255, 255, 255, 255);
  BACKGROUND_COLOR = color(random(255), 55, 172);
  CLOCK_WIDTH = width/4;
}

function draw(){
  background(BACKGROUND_COLOR);
  ellipseMode(CENTER);
  offset = ((day()-1)*24*60*60 + hour()*60*60 + minute()*60 + second()) * 0.8;

  drawClock(createVector(width*0.33, height/2), 0);
  drawClock(createVector(width*0.66, height/2), offset);
}

function drawClock(pos, offset) {
  // clock shadow
  fill(52, 50);
  noStroke();
  ellipse(pos.x-10, pos.y+10, CLOCK_WIDTH, CLOCK_WIDTH);

  // clock base
  fill(78);
  stroke(52);
  strokeWeight(4);
  ellipse(pos.x, pos.y, CLOCK_WIDTH, CLOCK_WIDTH);

  stroke(252);

  if(offset == 0){
    var h = hour();
    var m = minute();
    var s = (second());
  } else {
    var h = floor(((offset / (60*60*24)) % 1)*24);
    var m = floor(((((offset / (60*60*24)) % 1)*24) % 1)*60);
    var s = (((((((offset / (60*60*24)) % 1)*24) % 1)*60) % 1)*60);
  }

  // hour
  push();
    translate(pos.x, pos.y);

    // draw hour dots
    for(var i = 0; i < 12; i++){
      point(0, CLOCK_WIDTH/2 * 0.9);
      rotate(TWO_PI/12);
    }

    // draw hour hand
    rotate(map(h + map(m, 0, 60, 0, 1), 0, 24, 0, TWO_PI * 2));
    line(0, 0, 0, -CLOCK_WIDTH/2 * HOUR_HAND);
  pop();

  // minute
  push();
    translate(pos.x, pos.y);
    strokeWeight(2);

    // draw minute dots
    for(var i = 0; i < 60; i++){
      point(0, CLOCK_WIDTH/2 * 0.9);
      rotate(TWO_PI/60);
    }

    // draw minute hand
    rotate(map(m + map(s, 0, 60, 0, 1), 0, 60, 0, TWO_PI));
    strokeWeight(3);
    line(0, 0, 0, -CLOCK_WIDTH/2 * MINUTE_HAND);
  pop();

  // second
  push();
    translate(pos.x, pos.y);

    // draw second hand
    rotate(map(s, 0, 60, 0, TWO_PI));
    strokeWeight(1);
    line(0, 0, 0, -CLOCK_WIDTH/2 * SECOND_HAND);
  pop();

  noFill();
  ellipse(pos.x, pos.y, 4, 4);
}
