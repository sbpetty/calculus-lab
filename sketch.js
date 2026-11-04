let target = 5;
let currentX = 3;
let iterations = 0;
let xDisplay;
let counter;
let targetInput;
let startingXInput;
let message;

const TOLERANCE = 0.000001;

function setup() {
	const canvas = createCanvas(600, 400);
	canvas.parent("graph-container");

	const newtonButton = createButton("Calculate next iteration");
	newtonButton.mousePressed(newtonStep);

	createSpan(" Target number: ");
	targetInput = createInput(String(target), "number");
	targetInput.attribute("step", "any");

	const setTargetButton = createButton("Set target");
	setTargetButton.mousePressed(setTarget);

	createSpan(" Starting X: ");
	startingXInput = createInput(String(currentX), "number");
	startingXInput.attribute("step", "any");

	const setXButton = createButton("Set starting X");
	setXButton.mousePressed(setStartingX);

	xDisplay = createP("X = " + currentX);
	counter = createP("Iterations: " + iterations);

	message = createP("");
	message.class("status-message");
}

function draw() {
	background(250);
	translate(width / 2, height / 2);

	stroke(150);
	strokeWeight(1);
	line(-width / 2, 0, width / 2, 0);
	line(0, -height / 2, 0, height / 2);

	// Draw f(x) = x^2 - target.
	stroke(40, 110, 220);
	strokeWeight(3);
	noFill();
	beginShape();

	const xRange = getXRange();
	const sampleCount = 200;
	for (let i = 0; i <= sampleCount; i += 1) {
		const x = -xRange + (2 * xRange * i) / sampleCount;
		vertex(graphX(x), graphY(quadratic(x)));
	}

	endShape();

	drawTangentLine(getTangentLine(currentX));

	stroke(0, 0, 0);
	fill("Black");

	const tangent = getTangentLine(currentX);
	circle(graphX(tangent.x), graphY(tangent.y), 4);

	const intercept = getNextX();
	if (intercept !== null) {
		circle(graphX(intercept), 0, 4);
	}
}

function graphX(x) {
	return x * getXScale();
}

function graphY(y) {
	return -y * getYScale();
}

function quadratic(x) {
	return x ** 2 - target;
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
	};
}

function drawTangentLine(tangentLine) {
	// Extend the tangent across the entire visible graph.
	const x1 = -getXRange();
	const x2 = getXRange();
	const y1 = tangentLine.slope * (x1 - tangentLine.x) + tangentLine.y;
	const y2 = tangentLine.slope * (x2 - tangentLine.x) + tangentLine.y;

	stroke(255, 0, 0);
	line(graphX(x1), graphY(y1), graphX(x2), graphY(y2));
}

function setStartingX() {
	const numberInput = Number(startingXInput.value());

	if (!Number.isFinite(numberInput) || numberInput === 0) {
		showMessage("Please enter a nonzero finite starting value.");
		return;
	}

	currentX = numberInput;
	xDisplay.html("X = " + currentX);
	iterations = 0;
	counter.html("Iterations: " + iterations);
	showMessage("");
}

function setTarget() {
	const numberInput = Number(targetInput.value());

	if (!Number.isFinite(numberInput) || numberInput <= 0) {
		showMessage("Please enter a positive finite target number.");
		return;
	}

	target = numberInput;
	iterations = 0;
	counter.html("Iterations: " + iterations);
	showMessage("");
}

function newtonStep() {
	const nextX = getNextX();

	if (nextX === null) {
		showMessage("Newton's method cannot continue because the derivative is zero.");
		return;
	}

	currentX = nextX;
	xDisplay.html("X = " + currentX);
	iterations += 1;
	counter.html("Iterations: " + iterations);

	if (Math.abs(quadratic(currentX)) < TOLERANCE) {
		const rootSign = currentX < 0 ? "negative" : "positive";
		showMessage(`Converged to the ${rootSign} square root of ${target}.`);
	} else {
		showMessage("");
	}
}

function showMessage(text) {
	message.html(text);
}

function getNextX() {
	if (derivative(currentX) !== 0) {
		const nextX = currentX - (quadratic(currentX) / derivative(currentX));
		return Number.isFinite(nextX) ? nextX : null;
	}

	return null;
}

function getXRange() {
	return Math.max(5, Math.sqrt(target) * 2.5);
}

function getYRange() {
	return Math.max(5, target * 1.5);
}

function getXScale() {
	return width / (2 * getXRange());
}

function getYScale() {
	return height / (2 * getYRange());
}
