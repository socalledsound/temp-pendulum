const scale = 100;
const offset = 200;
let x = 200, y = 200, ballR = 50;
let theta = 0;
let loopers = Array.from({length: 4});


setup = () => {
    createCanvas(600, 600);
    strokeWeight(6);
    stroke(140,40,140);
    fill(200,60,120);
    
}

draw = () => {
    background(255);

    x = calcX();
    y = calcY();
    ellipse(x, y, ballR);
    theta+=0.05
}


class Looper{

    constructor(x, y, r, theta, freq){
        this.x = x; 
        this.y = y;
        this.r = r;
        this.theta = theta;
        this.freq = freq;
    }


    update(){

    }

    display(){
        
    }


}



const calcX = () => Math.sin(theta)*scale + offset;
const calcY = () => Math.cos(theta)*scale + offset;
