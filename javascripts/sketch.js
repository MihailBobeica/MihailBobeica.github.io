let half_w;
let half_h;
let line_length;
let one_third_PI;

let visible_lines = [];
let prev_lines = [];
let next_lines = [];
let iterations = 0;
let r_bkg = 77;
let g_bkg = 55;
let b_bkg = 88;


let run;

function setup(){
    createCanvas(windowWidth, 400);
    half_w = width / 2;
    half_h = height / 2;
    one_third_PI = PI / 3.0;
    line_length = 10;
    run = true;

    prev_lines.push(new HexLine(half_w, half_h, 0));

    // frameRate(5);
}

function draw(){
    background(r_bkg, g_bkg, b_bkg);

    if (run){
        for (let i=0; i<prev_lines.length; i++){
            let l = prev_lines[i];
            

            let l1 = new HexLine(l.x_e, l.y_e, l.angle_index + 1);
            let l2 = new HexLine(l.x_e, l.y_e, l.angle_index - 1);

            let save_l1 = true;
            let save_l2 = true;

            /*
            // rect boundaries
            if (l1.x_mid < 0 || l1.x_mid > width || l1.y_mid < 0 || l1.y_mid > height){
                save_l1 = false;
            }
            if (l2.x_mid < 0 || l2.x_mid > width || l2.y_mid < 0 || l2.y_mid > height){
                save_l2 = false;  
            }
            */

            // circle boundaries
            if (dist(l1.x_mid, l1.y_mid, half_w, half_h) > half_h){
                save_l1 = false;
            }
            if (dist(l2.x_mid, l2.y_mid, half_w, half_h) > half_h){
                save_l2 = false;
            }

            // check for duplicates in this generation
            if (save_l1){
                for (let j=0; j<next_lines.length; j++){
                    let nl = next_lines[j];
                    if (overlaying(l1.x_mid, l1.y_mid, nl.x_mid, nl.y_mid)){
                        save_l1 = false;
                    }
                }
            }
            if (save_l2){
                for (let j=0; j<next_lines.length; j++){
                    let nl = next_lines[j];
                    if (overlaying(l2.x_mid, l2.y_mid, nl.x_mid, nl.y_mid)){
                        save_l2 = false;
                    }
                }
            }

            // check for duplicates in the previous generation
            if (save_l1){
                for (let j=0; j<prev_lines.length; j++){
                    pl = prev_lines[j];
                    if (overlaying(l1.x_mid, l1.y_mid, pl.x_mid, pl.y_mid)){
                        save_l1 = false;
                    }
                }
            }
            if (save_l2){
                for (let j=0; j<prev_lines.length; j++){
                    pl = prev_lines[j];
                    if (overlaying(l2.x_mid, l2.y_mid, pl.x_mid, pl.y_mid)){
                        save_l2 = false;
                    }
                }
            }

            // check for duplicates in the visible
            if (save_l1){
                for (let j=0; j<visible_lines.length; j++){
                    let vl = visible_lines[j];
                    if (overlaying(l1.x_mid, l1.y_mid, vl.x_mid, vl.y_mid)){
                        save_l1 = false;
                    }
                }
            }
            if (save_l2){
                for (let j=0; j<visible_lines.length; j++){
                    let vl = visible_lines[j];
                    if (overlaying(l2.x_mid, l2.y_mid, vl.x_mid, vl.y_mid)){
                        save_l2 = false;
                    }
                }
            }

            // store generated lines
            if (save_l1 == true){
                next_lines.push(l1);
            }
            if (save_l2 == true){
                next_lines.push(l2);
            }
        }

        // update visible lines
        for (let j=0; j<prev_lines.length; j++){
            visible_lines.push(prev_lines[j]);
        }

        // exit consition
        if (next_lines.length == 0){
            run = false;
        }

        // reset lists
        prev_lines = next_lines;
        next_lines = []
    }
    else {
        let r = int(random(visible_lines.length));
        visible_lines[r].visible = ! visible_lines[r].visible;
    }

    // draw lines
    for (let i=0; i<visible_lines.length; i++){
        visible_lines[i].show();
    }

    iterations++;
}

class HexLine{
    constructor(_x_s, _y_s, _angle_index){
        this.x_s = _x_s;
        this.y_s = _y_s;
        this.angle_index = _angle_index;
        this.x_e = this.x_s + line_length * Math.cos(this.angle_index * one_third_PI);
        this.y_e = this.y_s + line_length * Math.sin(this.angle_index * one_third_PI);
        this.x_mid = (this.x_s + this.x_e) / 2.0;
        this.y_mid = (this.y_s + this.y_e) / 2.0;
        this.visible = true;
        this.p = iterations / 28.0;
    }

    show(){
        if (this.visible == true){
            stroke(l_i(245, r_bkg, this.p), l_i(245, g_bkg, this.p), l_i(245, b_bkg, this.p)); // bkg color 147, 112, 216 
            line(this.x_s, this.y_s, this.x_e, this.y_e);
        }
    }
}

function overlaying(_x1, _y1, _x2, _y2){
    return dist(_x1, _y1, _x2, _y2) < 0.1 * line_length ? true: false;
}

// linear interpolation
function l_i(a, b, p){
    if (p <= 1){
        return int((b - a) * p + a);
    }
    else {
        return b;
    }
}
