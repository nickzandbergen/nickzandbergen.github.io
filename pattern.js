var distMax;

function setup() {
    createCanvas(1920, 1080);
    noStroke();
    frameRate(72);
    distMax = mag(width/2, height/2);
}

function draw() {
    var size = mag(mouseX - pmouseX, mouseY - pmouseY);
    size = Math.sqrt(size);
    
    var red = map(mouseX, 0, width, 0, 255);
    var grn = map(mouseY, 0, height, 0, 255);
    var blu = map(dist(mouseX, mouseY, width/2, height/2), 0, distMax, 0, 255);
    
    if(mouseIsPressed)
    {    
        red = 255 - red;
        blu = 255 - blu;
        grn = 255 - grn;
    }
    fill(red, grn, blu);
    ellipse(mouseX, mouseY, size, size);
  
} 
