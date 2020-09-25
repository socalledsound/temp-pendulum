const lineColor = [200, 0, 0];
const circleOutline = [20,20,20];
const circleColor = [220,20,220];
const gravity = 1.5;
const r = 300;
const initX = 300;
const initY = 0;
const lineStartX = initX;
const lineStartY = 0;
const damping = 0.998;
let x = initX;
let y = initY;
let theta = Math.PI/2;
let velocity = 0;
let acceleration = 0;



function setup()  {

    createCanvas(600, 600);

}

function draw(){

    background(175, 135,20);
    //theta = updateThetaSimple(theta);
    console.log(theta);
    theta = updateThetaPendulum(theta, r, velocity);
    x = calcX(r, theta);
    y = calcY(r, theta);
    drawCircle(x, y);
    
}


function updateThetaSimple(theta){
    const velocity = 0.01;
    return theta += velocity;
}


function updateThetaPendulum(theta, r, velocity){                                             
    acceleration += (-1 * gravity / r) * sin(theta);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
  
    acceleration *= damping;
    velocity += acceleration;                            // Increment velocity
    // velocity *= damping;   
                                   // multiply velocity times mass
    theta += velocity;
                                      // Increment angle
    return theta                                    
}


function calcX (r, theta){
    return r * sin(theta)+ initX;
}

function calcY(r, theta){
    return r * cos(theta) + initY;
}


function drawCircle(x, y){
    // console.log(x, y);
    stroke(lineColor);
    line(lineStartX, lineStartY, x, y);
    stroke(circleOutline);
    strokeWeight(3);
    fill(circleColor);
    ellipse(x, y, 100);
}




// theta+=inc

