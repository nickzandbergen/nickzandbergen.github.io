var squares = 8; //change this
var size;


function setup() {
    createCanvas(1080, 1080);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;
}

function draw() {
    N = frameCount % 360
    for(var x = 0; x < 
        

} 



function drawSquare(x, y, grayscale, rotation) {
    push();
    
    fill(grayscale);
    translate(x, y);
    rotate(rotation);
    rect(0,0,size, size);
    
    pop();
    
}
/*

N = frameCount % 360 
IF N % 90 == 0
 default square grid / diagonal?

N <= 180 // rotation
 N <= 90 // WHITE squares

 else //BLACK square 

else //lines
  N %= 180

  N <= 90
     checkerboard -> lines

  else
    lines -> checkerboard

function parameters:
x, y, grayscale, angle(boolean)

//translate (x,y)
rotate to angle
//color square grayscale

*/
