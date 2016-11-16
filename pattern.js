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
    
    if(frameCount % 361 >= 90) {
        background(255);
        drawSquaresSquared(true);
        drawSquaresSquared(false);
    } else if(frameCount % 361 >= 180) {
        background(0);
        drawSquaresSquared(false);
        drawSquaresSquared(true);
    } else if(frameCount % 361 >= 270) {
        
    } else {//defualt case, 90 < frameCount <= 0
        
    }

} 


function drawSquaresSquared(black) {
    var offset = 0;
    if(!black)
        offset = size / Math.SQRT2;
        
    for(var i = 0; i < width; i += size *  Math.SQRT2) {
        for(var j = 0; j < height; j += size *  Math.SQRT2) {
            drawSquare(i + offset, j + offset , black);
        }
    }
    
}
function drawSquare(x, y, black) {
    push();
    
    translate(x,y);
    rotate(frameCount + 45);
    
    if (black) {
       fill(0); 
    } else {
       fill(255);
    }
    
    
    rect(0,0,size, size);
    
    pop();
    
}
