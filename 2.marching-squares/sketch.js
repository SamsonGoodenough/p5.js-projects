let gap = 5;
let scale = 0.01;
let inc = 0.004;
let offset = 0;
let pressedX = 0;
let pressedY = 0;

let show_instructions = true;

function setup() {
  createCanvas (windowWidth, windowHeight);
}

function draw() {
  background(0);
  let map = create_map(offset);
  display_map(map);

  offset += inc;

  if (show_instructions){
    text("Click and drag left/right to -/+ speed", 0, 10);
    text("Click and drag down/up to -/+ scale", 0, 25);
    text("To dismiss press i", 0, 40);
  }
}

function create_map(offset) {
  let map = [];
  for (let i = 0; i < width / gap + 1; i++) {
    map[i] = [];
    for (let j = 0; j < height / gap + 1; j++) {
      map[i][j] = noise(i * scale, j * scale, offset);
    }
  }

  return map;
}

function display_map(map) {
  beginShape();
  for (let i = 0; i < map.length - 1; i++) {
    for (let j = 0; j < map[i].length - 1; j++) {
      let x = i * gap;
      let y = j * gap;
      let a = createVector(x + gap * 0.5, y);
      let b = createVector(x + gap, y + gap * 0.5);
      let c = createVector(x + gap * 0.5, y + gap);
      let d = createVector(x, y + gap * 0.5);
      let land = getState(
        ceil(map[i][j] - 0.5),
        ceil(map[i + 1][j] - 0.5),
        ceil(map[i + 1][j + 1] - 0.5),
        ceil(map[i][j + 1] - 0.5)
      );
      stroke(255);
      strokeWeight(1);
      drawState(land, a, b, c, d);
    }
  }
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1;
}

function drawLine(v1, v2) {
  line(v1.x, v1.y, v2.x, v2.y);
}

function drawState(state, a, b, c, d) {
  switch (state) {
    case 1:
      drawLine(c, d);
      break;
    case 2:
      drawLine(b, c);
      break;
    case 3:
      drawLine(b, d);
      break;
    case 4:
      drawLine(a, b);
      break;
    case 5:
      drawLine(a, d);
      drawLine(b, c);
      break;
    case 6:
      drawLine(a, c);
      break;
    case 7:
      drawLine(a, d);
      break;
    case 8:
      drawLine(a, d);
      break;
    case 9:
      drawLine(a, c);
      break;
    case 10:
      drawLine(a, b);
      drawLine(c, d);
      break;
    case 11:
      drawLine(a, b);
      break;
    case 12:
      drawLine(b, d);
      break;
    case 13:
      drawLine(b, c);
      break;
    case 14:
      drawLine(c, d);
      break;
  }
}

function mousePressed(){
  pressedX = mouseX;
  pressedY = mouseY;
}

function mouseDragged(){
  scale += map((mouseY - pressedY), 0, height, 0, 0.1);
  scale = constrain(scale, 0.01, 0.9);

  inc += map((mouseX - pressedX), 0, width, 0, 0.01);
  inc = constrain(inc, 0, 0.1);
}

function keyPressed(){
  if (key == 'i'){
    show_instructions = false;
  }
}