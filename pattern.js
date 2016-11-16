var squares = 9;//change this! 
var size;


function setup() {
    createCanvas(1080, 720);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;
}

function draw() {
    
    if(frameCount % 360 >= 90) {
        background(128);
        drawSquaresSquared(true);
        drawSquaresSquared(false);
    } else if(frameCount % 360 >= 180) {
        background(128);
        drawSquaresSquared(false);
        drawSquaresSquared(true);
    } else if(frameCount % 360 >= 270) {
        
    } else {//defualt case, 90 > frameCount >= 0
        
    }

} 


function drawSquaresSquared(black) {
    var offset = 0;
    if(!black)
        offset = size / Math.SQRT2;
        
    for(var i = 0; i < width; i += size) {
        for(var j = 0; j < height; j += size) {
            drawSquare(i * Math.SQRT2 + offset, j * Math.SQRT2 + offset, black);
        }
    }
    
}
function drawSquare(x, y, black) {
    push();
    
    translate(x,y);
    rotate(frameCount + 5 * 9);
    
    if (black) {
       fill(0); 
    } else {
       fill(255);
    }
    
    
    rect(0,0,size, size);
    
    pop();
    
}
