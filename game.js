
var ship;
var attractionPointX, attractionPointY;
var attraction
function preload() {


}
function setup() {
	frameRate(60);
	createCanvas(800,800);
	background(128);

	//graphics
	fill(120);
	stroke('green');
	strokeWeight(4);
	//ship properties

	ship = createSprite(width/2, height/2, 10, 1);

	//blendMode(DODGE);

	ship.shapeColor = color(0, 128, 255);
	ship.rotateToDirection = true;
	//ship.maxSpeed = 20;
	ship.velocity.x = random(5, 10);
	//ship.friction = 0.99;
	attraction = 1.5;
	attractionPointX = random(200,600);
	attractionPointY = random(200,600);
}
function draw() {
	
	if(ship.position.x <= 0)
		ship.position.x += width;
	if(ship.position.y <= 0)
		ship.position.y += height;
	
	ship.position.x %= width;
	ship.position.y %= height;

	ship.width = ship.velocity.mag() + 1;

	var redC = red(ship.shapeColor);
	var greenC = green(ship.shapeColor);
	var blueC = blue(ship.shapeColor);
	//has a range of 0-255, inclusive
	redC 	= sin(frameCount/15) * 127.5 + 127.5;
	blueC 	= cos(frameCount/7) * 127.5 + 127.5;
	greenC 	= sin(frameCount/3) * 127.5 + 127.5;

	ship.shapeColor = color(redC, blueC, greenC);

	if(keyDown('1')) {
		ship.attractionPoint(1, mouseX, mouseY);
	}
	if(keyDown('2')) {

		background(128);
	}
	if(keyDown('3')) {

	}
	if(keyDown('4')) {
		ship.velocity.x = 0;
		ship.velocity.y = 0;
	}
	ship.attractionPoint(attraction, attractionPointX, attractionPointY);

	drawSprites();
}