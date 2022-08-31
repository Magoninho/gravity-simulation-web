const G = 95;

export default class Attractor {
	private x;
	private y;
	private vx = 0;
	private vy = 0;
	private mass;
	public destroyed = false;

	constructor(x: number, y: number, mass: number) {
		this.x = x;
		this.y = y;
		this.mass = mass;
	}

	attract(other: Attractor) {
		let dx = (this.x - other.x);
		let dy = (this.y - other.y);
		let dist = (Math.hypot(dx, dy));

		let angle = Math.atan2(dy, dx);

		// Newton's Law of Universal Gravitation
		let force = G * (this.mass * other.mass) / dist ** 2;

		// if collision
		if (dist < this.mass * 0.5) {
			this.mass += other.mass;
			other.destroyed = true;
		}

		this.x += force * Math.cos(angle) / this.mass;
		this.y += force * Math.sin(angle) / this.mass;

		other.x += force * Math.cos(angle) / other.mass;
		other.y += force * Math.sin(angle) / other.mass;
	}

	setVel(vx: number, vy: number) {
		this.vx = vx;
		this.vy = vy;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
	}

	render(ctx: CanvasRenderingContext2D) {
		let centerX = this.x;
		let centerY = this.y;
		let radius = this.mass;

		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = '#003300';
		ctx.stroke();
	}
}