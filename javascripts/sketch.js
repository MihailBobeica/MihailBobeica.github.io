var HW;
var HH;
var N;
var O;
var R;
var IR;

var BG;
var colors = [];

var player;
var coin;
var polarPoints = [];
var triangles = [];

var score = 0;


function setup(){
    createCanvas(400, 420);
    HW = width / 2.0;
    HH = height / 2.0;
    N = 5; // must be between 3 and 8
    O = createVector(HW, HH);
    R = HW * 0.8;
    IR = R * cos(PI / N);
    
    BG = [80];
    initColors();
    
    coin = new Coin();
    player = new PolarPoint(0, 0);
    initPolarPoints();
    initTriangles();
}

function mouseClicked(){
  player.move();
  coin.collide();
}

function draw(){
    background(BG);
    
    for (let i = 0; i < triangles.length; i++){
        triangles[i].show();
    }
    
    coin.show();
    
    displayScore();
}

class PolarPoint{
    constructor(_a, _r, _o){
        this.x = 0;
        this.y = 0;
        this.a = _a;
        this.r = _r;
        this.update();
    }
    
    update(){
        this.x = this.r * cos(this.a) + O.x;
        this.y = this.r * sin(this.a) + O.y;
    }
    
    move(){
        let dx = mouseX - O.x;
        let dy = mouseY - O.y;
        if (abs(dx) < 1){
            if (dy > 0){
                this.a = PI / 2.0;
            }else{
                this.a = 1.5 * PI;
            }
        }else{
            this.a = atan(1.0 * dy/dx);
            if (dx < 0){
                this.a += PI;
            }
        }
        
        this.r = mag(dx, dy);
        if (this.r > IR){
            this.r = IR;
        }
        this.update();
    }
}

class Triangle{
    constructor(_i, _polarPoints){
        this.i = _i;
        this.polarPoints = _polarPoints;
    }
    
    show(){
        fill(colors[this.i]);
        stroke(BG);
        strokeWeight(2);
        beginShape();
        for(let i = 0; i < this.polarPoints.length; i++){
            let x = this.polarPoints[i].x;
            let y = this.polarPoints[i].y;
            vertex(x, y);
        }
        endShape();
    }
}

function initPolarPoints(){
    let dA = 2 * PI / N;
    for (let i = 0; i < N; i++){
        polarPoints[i] = new PolarPoint(i * dA, R);
    }
}

function initTriangles(){
    for (let i = 0; i < N; i++){
        let pp = [];
        pp[0] = player;
        if (i == N - 1){
            pp[1] = polarPoints[N - 1];
            pp[2] = polarPoints[0];
        }else{
            pp[1] = polarPoints[i];
            pp[2] = polarPoints[i + 1];
        }
        triangles[i] = new Triangle(i, pp);
    }
}

function initColors(){
    colors = [
    [220,   0, 127],
    [255, 127,   0],
    [220, 220,   0],
    [0,   200,   0],
    [0,   200, 200],
    [0,   127, 200],
    [0,     0, 200],
    [108,   0, 217]];
}

class Coin{
    constructor(){
        this.i = 0;
        this.d = width / 20.0;
        this.p = new PolarPoint(0, 0);
    }
    
    update(){
        this.i = int(random(N));
        this.p = new PolarPoint(this.randomAngle(), random(IR * 0.8));
    }
    
    randomAngle(){
        let accuracy = 360.0;
        return 2 * PI * random(accuracy) / accuracy;
    }
    
    collide(){
        for (let i = 0; i < triangles.length; i++){
            if (pointInTriangle(this.p, triangles[i])){
                if (this.i == i){
                    this.update();
                    increaseScore();
                }
            }
        }
    }
    
    show(){
        fill(colors[this.i]);
        stroke(BG);
        strokeWeight(2);
        ellipse(this.p.x, this.p.y, this.d, this.d);
    }
}

function increaseScore(){
    score += 1;
}

function sign(p1, p2, p3){
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle(pt, t){
    let d1, d2, d3;
    let has_neg, has_pos;
    
    let v1 = t.polarPoints[0];
    let v2 = t.polarPoints[1];
    let v3 = t.polarPoints[2];
    
    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);
    
    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
    
    return !(has_neg && has_pos);
}

function displayScore(){
  noFill();
  stroke(220);
  strokeWeight(2);
  textSize(40);
  textAlign(CENTER);
  text("score: " + score, O.x, 40);
}
