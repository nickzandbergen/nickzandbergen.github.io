var squares = 8;//change this! 
var size;
var black = true;


function setup() {
    createCanvas(1080, 720);
    noStroke();
    angleMode(DEGREES);
    rectMode(CENTER);
    size = width/squares;
}

function draw() {
    if(frameCount % 90 == 0) {
        if (black) {
            background(255);
        } else {
            background(0);   
        }
        
        background(128);
        
        black = !black;
    }
    
    drawSqauresSquared(black);
    drawSquaresSquared(!black);

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
    
    
    if (x - size > width) {
        x = -size; 
    } else if (y - size > height) {
        y = -size;   
    }
    
    translate(x, y);
    
    rotate(frameCount + 45);
    
    rect(0,0,size, size);
    
    pop();
    
}
