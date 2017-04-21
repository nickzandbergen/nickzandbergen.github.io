var distMax;

function setup() {
    createCanvas(1920, 1080);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    distMax = mag(width/2, height/2);
}

function draw() {
    
    
    var red = map(mouseX, 0, width, 0, 255);
    var grn = map(mouseY, 0, height, 0, 255);
    var blu = map(dist(mouseX, mouseY, width/2, height/2), 0, distMax, 0, 255);
    fill(red, grn, blu);
    ellipse(mouseX, mouseY, 45, 45);
  
} 
