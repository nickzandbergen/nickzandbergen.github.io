var squares = 8; //change this
var size;


function setup() {
    createCanvas(1920, 1080);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;
}

function draw() {
  
        

} 
function mousePressed() {
    
    ellipse(mouseX, mouseY, 45, 45);
    
    return false;
    
}
