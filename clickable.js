const lineColor = [200, 0, 0];
const circleOutline = [20,20,20];
const circleColor = [220,20,220];
const gravity = 1.5;
const r = 300;
const initX = 300;
const initY = 0;
const lineStartX = initX;
const lineStartY = 0;
const damping = 0.999;
const pendulumR = 100;
let x = initX;
let y = initY;
let textX, textY;
let theta = Math.PI/2;
let velocity = 0;
let acceleration = 0;

let suspend = false;

let count = 0;




function setup()  {

    createCanvas(600, 600);
   

}

function draw(){

    background(175, 135, 20);
    //theta = updateThetaSimple(theta);
   
   if(!suspend){
    theta = updateThetaPendulum(theta, r, velocity);
   }

   if(!suspend){
        x = calcX(r, theta);
        y = calcY(r, theta);
   } else {
        x = mouseX;
        y = mouseY;
        theta = asin((mouseX - initX)/r);

   }


    drawCircle(x, y);

    count++;
    if(count%5 == 0){
       textX = calcX(r, theta);
       textY =  calcY(r, theta);
    }
    drawText(textX, textY);
    
}


function drawText(x, y){
    textSize(16);
    text(`x: ${Math.floor(x)}`, 10, 400);
    text(`y: ${Math.floor(y)}`, 10, 420);
    text(`lengthSideA: ${Math.floor(x-initX)}`, 10, 440);
    text(`lengthSideB: ${Math.floor(y-initY)}`, 10, 460);
    text(`thetaCalc: ${Math.floor((asin(Math.floor(x-initX)/ r))*(180/PI))}`, 10, 480);
    text(`outerangle : ${90-Math.floor((asin(Math.floor(x-initX)/ r))*(180/PI))}`, 10, 500);
}



function mousePressed(){
    const distX = mouseX - x; 
    const distY = mouseY - y; 
    if(distX < pendulumR && distY < pendulumR) {
        console.log('in circle');
        suspend = true;
    }
}

function mouseReleased(){
    console.log('free');
    suspend = false;
//theta = asin( (mouseY - initY) / r );
    theta = asin((mouseX - initX)/r);
}

function calcHype(mX, mY, iX, iY){
    const lengthSideA = mX - iX;
    const lengthSideB = mY- iY;

   return sqrt(sq(lengthSideA) + sq(lengthSideB))
}





function updateThetaSimple(theta){
    const velocity = 0.01;
    return theta += velocity;
}


function updateThetaPendulum(theta, r, velocity){                                             
    acceleration += (-1 * gravity / r) * sin(theta);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
    acceleration *= damping;
    velocity += acceleration;                            // Increment velocity
    // velocity *= damping;                                    // multiply velocity times mass
    theta += velocity;                                      // Increment angle
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
    ellipse(x, y, pendulumR);
}




// theta+=inc

