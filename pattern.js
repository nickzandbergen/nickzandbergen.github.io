var squares = 20;//change this! 
var size;
var rotation;


function setup() {
    createCanvas(480, 720);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;
    var rotate = 128 ;
    
}

function draw() {
    
    
    background(128);
    
    drawSquaresSquared(rotate, false);
    drawSquaresSquared(rotate, true);

    
    if (rotate % 360 == 0)
        rotate = 0;
    rotate++
    
} //end of draw 


function drawSquaresSquared(rotation, black) {
    var offset = 0;
    if(!black)
        offset = size / Math.SQRT2;
        
        
    
    for(var i = 0; i < width; i += size *  Math.SQRT2) {
        for(var j = 0; j < height; j += size *  Math.SQRT2) {
            drawSquare(i + offset, j + offset, rotation , black)
            
            
            
            
            
        }
    }
    
    
}
function drawSquare(x, y, rotation, black) {
    push();
    translate(x,y);
    rotate(rotation);
    if (black) {
       fill(0); 
    } else {
        fill(255);
    }
    rect(0,0,size, size);
    
    pop();
    
}
