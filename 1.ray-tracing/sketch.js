let walls = [];
let emitters = [];
function setup() {
  createCanvas (windowWidth, windowHeight);
  background(0);
  createWalls();
  createEdges();
  emitters.push(new RayEmitter(mouseX, mouseY, 0.0625));
}

function draw() {
  background(0);
  
  for (let wall of walls) {
    wall.show();
  }

  emitters[0].update(mouseX, mouseY);

  for (emitter of emitters){
    emitter.look(walls);
  }
}

function createWalls() {
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
}

function createEdges() {
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
}

function mouseClicked() {
  emitters.push(new RayEmitter(mouseX, mouseY, emitters[0].density));
}

function mouseWheel(event) {
  d = event.delta;
  emitters[0].changeDensity(d);
}

function keyPressed() {
  walls = [];
  emitters = [];
  createWalls();
  createEdges();
  emitters.push(new RayEmitter(mouseX, mouseY, 0.0625 ));
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}