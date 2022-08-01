// Appearance
var ox;
var oy;

// Cell 
var r = 20;
var s = Math.round(1.5 * r);
var hs = s / 2;

var CELL_COLOR;
var CELL_DEFAULT_COLOR;
var CELL_STROKE_COLOR;
var CELL_STROKE_WEIGHT = 2;




// functions
function getIndex(x, y) {
  return y * (y + 1) / 2 + x;
}


// classes
class Cell{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.v = 0;
    this.index = getIndex(this.x, this.y);
    this.ux = r * (2 * this.x - this.y);
    this.uy = Math.round(1.732 * r * this.y);
    this.c = CELL_DEFAULT_COLOR;
  }
  
  onMousePressed(turn) {
    if(this.v == 0) {
      if(Math.hypot(mouseX - ox, mouseY - oy, this.ux, this.uy) < hs) {
        this.c = CELL_COLOR;
        this.v = turn;
        return turn * -1;
      }
    }
    return turn;
  }
  
  show() {
    fill(this.c);
    stroke(CELL_STROKE_COLOR);
    strokeWeight(CELL_STROKE_WEIGHT);
    circle(this.ux, this.uy, s);
  }
}


class Player{
  constructor(name, turn){
    this.name = name;
    this.turn = turn;
    this.points = 0;
  }
  
  earn(points) {
    this.points += points;
  }
}

var cell;

// setup
function setup() {
  createCanvas(640, 640);
  
  // Appearance
  ox = width / 2;
  oy = 50;
  
  // Cell
  CELL_COLOR = color(100);
  CELL_DEFAULT_COLOR = color(220);
  CELL_STROKE_COLOR = color(0);
  
  cell = new Cell(0, 0);
}

// draw
function draw() {
  background(255);
  translate(ox, oy);
  
  
  cell.show();
}

function mousePressed() {
  cell.onMousePressed();
}

