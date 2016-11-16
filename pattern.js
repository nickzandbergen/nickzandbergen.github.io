var squares = 8;//change this! 
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
        
    for(var i = 0; i < squares; i += 1) {
        for(var j = 0; j < squares; j += 1) {
            drawSquare(i * size * Math.SQRT2 + offset, j * size * Math.SQRT2 + offset, black);
        }
    }
    
}
function drawSquare(x, y, black) {
    push();
    
    if (black) {
       fill(0); 
       x += frameCount;
       y += frameCount;
    } else {
       fill(255);
    }
    
    translate(x, y);
    rotate(frameCount + 45);
    
    
    
    
    rect(0,0,size, size);
    
    pop();
    
}
