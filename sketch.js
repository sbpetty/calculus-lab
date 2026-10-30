function setup() {
	const canvas = createCanvas(600, 400);
	canvas.parent("graph-container");
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
		const y = x * x;

		// Convert mathematical coordinates to pixels.
		const screenX = x * 40;
		const screenY = -y * 15;

		vertex(screenX, screenY);
	}

	endShape();
}
