
var ship;
function preload() {


}
function setup() {

	createCanvas(800,800);
	background(123);

	//graphics
	fill(120);
	stroke('green');
	strokeWeight(4);
	//ship properties
	ship = createSprite(width/2, height/2, 30, 30);
	ship.shapeColor = color(0, 128, 255);
	ship.rotateToDirection = true;
	ship.maxSpeed = 20;
	//ship.friction = .96;
}
function draw() {
	//background(123);
	
	if(ship.position.x <= 0)
		ship.position.x += width;
	if(ship.position.y <= 0)
		ship.position.y += height;
	
	ship.position.x %= width;
	ship.position.y %= height;




	/*
	var redC = red(ship.shapeColor);
	var greenC = green(ship.shapeColor);
	var blueC = blue(ship.shapeColor);
	*/
	ship.shapeColor = color(green(ship.shapeColor),
							blue(ship.shapeColor),
							red(ship.shapeColor)
							
							);
	//*/

	if(keyDown('1')) {
		ship.attractionPoint(2, mouseX, mouseY);
		console.log("test");
	}
	//ship.attractionPoint(5, random(width), random(height));

	drawSprites();
}