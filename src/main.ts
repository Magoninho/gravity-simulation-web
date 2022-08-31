import Attractor from "./attractor.js";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");


let attractors: Attractor[] = new Array(55);
for (let a = 0; a < attractors.length; a++) {
	attractors[a] = new Attractor(randomNumber(0, 770), randomNumber(0, 550), randomNumber(2, 10));
	attractors[a].setVel(chooseNumber([-0.1, 0.1]), chooseNumber([-0.1, 0.1]))
}

let mainAttractor = new Attractor(400, 300, 25);



const gameLoop = () => {
	ctx.clearRect(0, 0, 800, 600)
	for (const a of attractors) {
		if (!a.destroyed) {
			a.update();
			a.render(ctx);
			mainAttractor.attract(a);
		}
	}

	mainAttractor.render(ctx);

	

	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


function randomNumber(a: number, b: number): number {
	return Math.floor(Math.random() * b) + a;
}

function chooseNumber(choices: Array<number>): number {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
  }