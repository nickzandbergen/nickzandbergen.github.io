var squares = 20;//change this! 
var size;


function setup() {
    createCanvas(480, 720);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;

}

function draw() {
    
    
    background(128);
    
    drawSquaresSquared(false);
    drawSquaresSquared(true);

    
    
} //end of draw 


function drawSquaresSquared(black) {
    var offset = 0;
    if(!black)
        offset = size / Math.SQRT2;
        
        
    
    for(var i = 0; i < width; i += size *  Math.SQRT2) {
        for(var j = 0; j < height; j += size *  Math.SQRT2) {
            drawSquare(i + offset, j + offset , black)
            
            
            
            
            
        }
    }
    
    
}
function drawSquare(x, y, black) {
    push();
    
    translate(x,y);
    rotate(frameCount);
    
    if (black) {
       fill(0); 
    } else {
        fill(255);
    }
    rect(0,0,size, size);
    
    pop();
    
}
