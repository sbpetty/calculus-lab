let currentX = 3;
let iterations = 0;
let xDisplay;
let counter;
let input;

function setup() {
	const canvas = createCanvas(600, 400);
	canvas.parent("graph-container");

	let newton_button = createButton("Calculate");
	newton_button.mousePressed(newtonStep);

	let set_x_button = createButton("Set starting X");
	set_x_button.mousePressed(setStartingX);

	xDisplay = createP("X = " + currentX);
	counter = createP("Iterations: " + iterations);

	input = createInput("3", "number")
}

function draw() {
	background(250);

	// Move the coordinate origin to the center.
	translate(width / 2, height / 2);

	// Draw the coordinate axes.
	stroke(150);
	strokeWeight(1);

	line(-width / 2, 0, width / 2, 0);
	line(0, -height / 2, 0, height / 2);

	// Draw f(x) = x^2.
	stroke(40, 110, 220);
	strokeWeight(3);
	noFill();

	beginShape();

	for (let x = -5; x <= 5; x += 0.05) {
		const y = quadratic(x)

		vertex(screenX(x), screenY(y));
	}

	endShape();

	drawTangentLine(getTangentLine(currentX));

	stroke(0, 0, 0);
	fill("Black");

	circle(screenX(getTangentLine(currentX).x), screenY(getTangentLine(currentX).y), 4);

	if (getNextX() != null) {
		const intercept = getNextX();
		const screen_intercept = intercept * 40;
		
		circle(screen_intercept, 0, 4);
	}
}

function screenX(x) {
	return x * 40;
}

function screenY(y) {
	return -y * 15;
}

function quadratic(x) {
	return x ** 2 - 5;
}

function derivative(x) {
	return x * 2;
}

function getTangentLine(x) {
	const y = quadratic(x);
	const slope = derivative(x);

	return {
		x,
		y,
		slope
	}
}

function drawTangentLine(tangent_line) {
	const x1 = tangent_line.x - 5;
	const x2 = tangent_line.x + 5;
	const y1 = tangent_line.slope * (x1 - tangent_line.x) + tangent_line.y;
	const y2 = tangent_line.slope * (x2 - tangent_line.x) + tangent_line.y;

	stroke(255, 0, 0);
	line(screenX(x1), screenY(y1), screenX(x2), screenY(y2));
}

function setStartingX() {
	let number_input = Number(input.value());
	currentX = number_input;
	xDisplay.html("X = " + currentX);
	iterations = 0;
	counter.html("Iterations: " + iterations);
}

function newtonStep() {
	if (getNextX() != null) {
		currentX = getNextX();
		xDisplay.html("X = " + currentX);
		iterations += 1;
		counter.html("Iterations: " + iterations);
		return 0;
	} else {
		return 1;
	}
}

function getNextX() {
	if (derivative(currentX) != 0) {
		return currentX - (quadratic(currentX) / derivative(currentX));
	} else {
		return null;
	}
}