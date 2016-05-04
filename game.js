
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
	ship.shapeColor = color(0, 123, 255);
	ship.rotateToDirection = true;
	ship.maxSpeed = 40;
	ship.friction = .95;
}
function draw() {
	background(123);
	if(keyWentDown('p')) {
		ship.visible = !ship.visible;
	}

	if(ship.position.x <= 0)
		ship.position.x += width;
	if(ship.position.y <= 0)
		ship.position.y += height;
	
	ship.position.x %= width;
	ship.position.y %= height;
	/*
	ship.shapeColor = color((red(ship.shapeColor) + 1) % 255,
							(green(ship.shapeColor) + 1) % 255,
							(blue(ship.shapeColor) + 1) % 255
							);
	*/

	if(mouseIsPressed) {
		ship.attractionPoint(1, mouseX, mouseY);
	}


	drawSprites();
}