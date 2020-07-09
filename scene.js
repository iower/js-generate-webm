const oscillator = (min, max, period, time, phase = 0) => {
	const a = ((Math.cos(time / period * 2 * Math.PI + Math.PI + phase) + 1) / 2);
	return min + (max - min) * a;
};

const n = 6;
const scale = 0.95;
const maxDepth = 50;

const drawCircles = ({ ctx, time, depth = 1 }) => {
	const size = settings.height/2;

	const minR = size * scale ** (depth - 1);
	const maxR = (size * scale) * scale ** (depth - 1);
	const period = 0.99 ** (depth - 1);
	const r = oscillator(minR, maxR, period, time);

	ctx.beginPath();
	ctx.arc(settings.width/2, settings.height/2, r, 0, 2 * Math.PI);
	ctx.strokeStyle = `hsl(${(time * 10 + depth * 10)}, 100%, 50%)`;
	ctx.stroke();

	if (depth < maxDepth) {
		drawCircles({ ctx, time, depth: ++depth });
	}
};

const draw = (ctx, time) => {
	ctx.fillStyle = 'black'; // videos cant handle transprency
	ctx.fillRect(0, 0, settings.width, settings.height);

	ctx.lineWidth = 1;
	ctx.lineCap = 'round';

	drawCircles({ ctx, time });

	return ctx;
};
