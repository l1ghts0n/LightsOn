let can = document.getElementById('canvas');
can.width = innerWidth;
can.height = innerHeight;

let CANVAS_HEIGHT = can.height,
	CANVAS_WIDTH = can.width

let mX = mY = 0, mD;
let offsetX = offsetY = 0;
let numStars = 650;
let stars = [];
let objects = [];

ctx = can.getContext('2d');

canvasPrototype = CanvasRenderingContext2D.prototype;

canvasPrototype.wrap = function (f) {
	const { resolveColor } = this;
	this.save();
	f();
	this.restore();
	this.resolveColor = resolveColor || (x => x);
};

onload = () => {
	for (let i = 0; i < numStars; i++) {
		let x = Math.round(Math.random() * CANVAS_WIDTH);
		let y = Math.round(Math.random() * CANVAS_HEIGHT);
		let length = 2 + Math.random() * 2;
		let opacity = Math.random();

		// Create a new star and draw
		let star = new Star(x, y, length, opacity);

		// Add the the stars array
		stars.push(star);
	}


	onresize()
	frame();
}

onresize = () => {
	CANVAS_WIDTH = innerWidth;
	CANVAS_HEIGHT = innerHeight;
	can.width = CANVAS_WIDTH;
	can.height = CANVAS_HEIGHT;
}

function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
	console.log(x)
}

Star.prototype.draw = function () {
	ctx.rotate((Math.PI * 1 / 10));
	ctx.save();
	ctx.translate(this.x, this.y);

	// Change the opacity
	if (this.opacity > 1) {
		this.factor = -1;
	}
	else if (this.opacity <= 0) {
		this.factor = 1;

		this.x = Math.round(Math.random() * CANVAS_WIDTH);
		this.y = Math.round(Math.random() * CANVAS_HEIGHT);
	}

	this.opacity += this.increment * this.factor;

	ctx.beginPath()
	for (let i = 5; i--;) {
		ctx.lineTo(0, this.length);
		ctx.translate(0, this.length);
		ctx.rotate((Math.PI * 2 / 10));
		ctx.lineTo(0, - this.length);
		ctx.translate(0, - this.length);
		ctx.rotate(-(Math.PI * 6 / 10));
	}
	ctx.lineTo(0, this.length);
	ctx.closePath();
	ctx.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	ctx.shadowBlur = 5;
	ctx.shadowColor = '#ffff33';
	ctx.fill();

	ctx.restore();
}


let lastFrame = performance.now();

frame = () => {


	// Rendering
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

	ctx.wrap(() => {
		ctx.fillStyle = "#000"
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
		for (let i = 0; i < stars.length - 1; i++) {
			stars[i].draw();
		}
	})


	requestAnimationFrame(frame);
}
