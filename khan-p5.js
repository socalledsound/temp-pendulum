
let p;



 setup = () => {
    angleMode = 'radiams';
    p = new Pendulum(400, 0, 175);
    console.log(p);
}


 draw = () => {
    background(255);
    createCanvas(800, 800);
    p.go();
    // fill(0,0,0);
    // ellipse(400,175,100);
    
}



class Pendulum  {
    constructor(originX, originY, armLength){
    this.origin = createVector(originX, originY), 175
    this.armLength = armLength;
    this.position = createVector();
    this.angle = PI/4;
    
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    // Arbitrary damping
    this.damping = 0.995;
    // Arbitrary ball radius
    this.ballRadius = 48.0;      
    this.dragging = false;
    }

    go(){
        this.update();
        this.display();
    }

    update(){
        if (!this.dragging) {
            // Arbitrary constant
            var gravity = 0.4;
            // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
            this.aAcceleration = (-1 * gravity / this.armLength) * sin(this.angle);
            // Increment velocity
            this.aVelocity += this.aAcceleration;
            // Arbitrary damping
            this.aVelocity *= this.damping;
            // Increment angle
            this.angle += this.aVelocity;                         
        }
    }

    display(){
        console.log('hi');
        // Polar to cartesian conversion
    this.position = createVector(
        this.armLength * sin(this.angle),
        this.armLength * cos(this.angle));
     this.position.add(this.origin);
     stroke(0, 0, 0);
     strokeWeight(2);
     // Draw the arm
     line(this.origin.x, this.origin.y, this.position.x, this.position.y);
     fill(175, 175, 175);
     if (this.dragging) {
         fill(0, 0, 0);
     }
     // Draw the ball
     ellipse(this.position.x, this.position.y, this.ballRadius, this.ballRadius);
     
    }
    
    handleClick(mx, my){
        var d = dist(mx, my, this.position.x, this.position.y);
        if (d < this.ballRadius) {
            this.dragging = true;
        }
    }
    stopDragging(){
        this.aVelocity = 0; // No velocity once you let go
        this.dragging = false;
    };

    handleDrag(mx, my){
        // If we are dragging the ball, we calculate the angle between the 
        // pendulum origin and mouse location
        // we assign that angle to the pendulum
        if (this.dragging) {
          // Difference between 2 points
          var diff = p5.Vector.sub(this.origin, createVector(mx, my));
          // Angle relative to vertical axis
          this.angle = atan2(-1*diff.y, diff.x) - PI/2;
        }
    }

}


   mousePressed = () => {
        p.handleClick(mouseX, mouseY);
    };
    
   mouseDragged = () => {
        p.handleDrag(mouseX, mouseY);
    };
    
   mouseReleased = () => {
        p.stopDragging();
    }