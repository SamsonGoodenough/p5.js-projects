const scale = 8;
const moveChance = 0.9;

var grid = [];
let bug;

function setup (){
  createCanvas (windowWidth, windowHeight);
  colorMode(HSB, 255, 255, 255, 255)

  for (var i = 0; i < width/scale; i++){
    grid[i] = [];

    for (var j = 0; j < height/scale; j++){
      type = int(random(5))
      if (type <= 2){
        grid[i][j] = new Bug(i, j, type);
      } else {
        grid[i][j] = 0;
      }
    }
  }
}

function draw(){
  background(52);
  noStroke();

  updateGrid();
  drawGrid();
}

function updateGrid() {
  for (var i = 0; i < width/scale; i++){
    for (var j = 0; j < height/scale; j++){
      if (grid[i][j] != 0){
        if (chance(moveChance)){
          grid[i][j].move();
        }
      }
    }
  }
}

function drawGrid() {
  for (var i = 0; i < width/scale; i++){
    for (var j = 0; j < height/scale; j++){
      if (grid[i][j] != 0){
        grid[i][j].display();
      }
    }
  }
}

function mouseClicked() {
  grid[int(mouseX/scale)][int(mouseX/scale)] = new Bug(int(mouseX/scale), int(mouseY/scale), 0);
}

function chance(p) {
  if (random(1) < p){
    return true;
  }

  return false;
}

class Bug {
  constructor(x, y, t) {
    this.x = x;
    this.y = y;
    this.type = t;
    this.color = color(map(this.type, 0, 3, 0, 155), 155, 255);
  }

  display() {
    fill(this.color);
    rect(this.x*scale, this.y*scale, scale, scale);
  }

  move() {
    var xMoves;
    if (this.x <= 0){
      xMoves = [0, 1];
    } else if (this.x >= int(width/scale)-1){
      xMoves = [-1, 0];
    } else {
      xMoves = [-1, 0, 1];
    }

    var yMoves;
    if (this.y <= 0){
      yMoves = [0, 1];
    } else if (this.y >= int(height/scale)-1){
      yMoves = [-1, 0];
    } else {
      yMoves = [-1, 0, 1];
    }

    var dX = this.x + random(xMoves);
    var dY = this.y + random(yMoves);
    if (grid[dX][dY] != 0) {
      if (this.beats(grid[dX][dY]))
        grid[dX][dY].type = this.type;
    } else {
      let Carl = new Bug(dX, dY, this.type);
      grid[dX][dY] = Carl;
      
      grid[this.x][this.y] = 0;
    }
    
  }

  beats(b) {
    if (this.type == 2 && b.type == 0) {
      return true;
    } else if (b.type == this.type + 1) {
      return true;
    } else {
      return false;
    }
  }
  
}
