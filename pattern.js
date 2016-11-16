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
    
    if(frameCount % 360 <= 90) {
        background(255);
        drawSquaresSquared(true);
        drawSquaresSquared(false);
    } else if(frameCount % 360 <= 180) {
        background(0);
        drawSquaresSquared(false);
        drawSquaresSquared(true);
    } else if(frameCount % 360 <= 270) {
        background(255);
        drawSquaresSquared(true);
        drawSquaresSquared(false);
    } else {//defualt case, 90 < frameCount % 360 >= 0
        background(0);
        drawSquaresSquared(false);
        drawSquaresSquared(true);
    }

} 


function drawSquaresSquared(black) {
    var x = 0, y = 0;
    var offset = 0;
    if(!black)
        offset = size / Math.SQRT2;
        
    for(var i = 0; i < squares; i += 1) {
        for(var j = 0; j < squares; j += 1) {
            x = i * size * Math.SQRT2;
            y = j * size * Math.SQRT2;
            if (black) {
                x += (frameCount * size) / 90;
                y += (frameCount * size) / 90;
                if (x > width) {
                    x = width - x;
                    y = 0;
                } else if (y > height) {
                    y = height - y;
                    x = 0;
                }
            }
            drawSquare(x, y, black);
        }
    }
    
}

function drawSquare(x, y, black) {
    push();
    
    if (black) {
       fill(0); 
    } else {
       fill(255);
    }
    
    translate(x, y);
    
    rotate(frameCount + 45);
    
    rect(0,0,size, size);
    
    pop();
    
}
