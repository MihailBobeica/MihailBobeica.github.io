var n = 80;
var maxVel = 8;
var radius = 20;
var diameter = radius * 2;
var balls;

function setup(){
    createCanvas(400, 400);
    balls = new Array();
    for(var i=0; i<n; i++){
        var x = random(0, width);
        var y = random(0, height);
        balls.push(new Ball(new Vector(x, y)));
    }
}

function draw(){
    background(220);
    noStroke();
    for(var i=0; i<n; i++){
        balls[i].move();
        balls[i].bounce();
        balls[i].show();
    }
}

class Vector{
    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
    }
}

class Ball{
    constructor(_pos){
        this.pos = _pos;
        this.vel = new Vector(random(-maxVel, maxVel), random(-maxVel, maxVel));
        this.c = color(random(0, 255), random(0, 255), random(0, 255));
    }

    show(){
        fill(this.c);
        ellipse(this.pos.x, this.pos.y, diameter, diameter);
    }

    move(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    bounce(){
        if(this.pos.x > width - radius){
            this.vel.x *= -1
            this.pos.x = width - radius;
        }else if(this.pos.x < radius){
            this.vel.x *= -1
            this.pos.x = radius;
        }
        if(this.pos.y > height - radius){
            this.vel.y *= -1
            this.pos.y = height - radius;
        }else if(this.pos.y < radius){
            this.vel.y *= -1
            this.pos.y = radius;
        }
    }
}
