const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source;

const sound = (t) => {
	const duration = 20;
	const sampleRate = audioCtx.sampleRate;
	const frameCount = sampleRate * settings.duration;
	const channels = 2;

	const myArrayBuffer = audioCtx.createBuffer(channels, frameCount, sampleRate);

	const k = 0.01;
	const val = 0.5;

	for (let channel = 0; channel < channels; channel++) {
		const nowBuffering = myArrayBuffer.getChannelData(channel);
		for (let i = 0; i < frameCount; i++) {
			const t = i / sampleRate;
			nowBuffering[i] = soundF(t); //[-1.0; 1.0]
		}
	}

	source = audioCtx.createBufferSource();
	source.buffer = myArrayBuffer;
	source.connect(audioCtx.destination);
	source.start();

	const arrBuff = audioBufferToWav(myArrayBuffer, { float32: true });
	const blob = new Blob([arrBuff], { type: 'audio/wav' });
	const url = window.URL.createObjectURL(blob);

	const link = document.getElementById('download-sound');
	link.href = url;
	link.download = 'out';
};


const stopSound = () => {
	source.stop();
};

const modulate = (t) => {
	const f = 1;
	return (Math.cos(2*Math.PI * t*f) + 1) / 2;
};

const soundF = (t) => {
	/*
	const f0 = 440; // la
	const i = 2; // number of semitones (positive or negative)
	const f = f0 * 2 ** (i/12);
	*/
	const f = 55;
	return modulate(t) * Math.sin(2*Math.PI * t*f);
};
