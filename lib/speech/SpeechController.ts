type SpeechEvents = {
	onStart?: () => void;
	onEnd?: () => void;
};

const FFT_SIZE = 256;

export class SpeechController {
	private audioContext: AudioContext | null = null;
	private analyser: AnalyserNode | null = null;
	private waveformBuffer = new Uint8Array(0);

	private events: SpeechEvents = {};

	setEvents(events: SpeechEvents) {
		this.events = events;
	}

	speak(text: string) {
		if (!text.trim()) return;
		this.ensureAudioGraph();

		// TODO: Replace this placeholder with ElevenLabs playback pipeline.
		// Keeping this no-op for now disables all TTS output.
		this.events.onEnd?.();
	}

	getAmplitude() {
		if (!this.analyser || this.waveformBuffer.length === 0) {
			return 0;
		}

		this.analyser.getByteTimeDomainData(this.waveformBuffer);

		let sumSquares = 0;
		for (let i = 0; i < this.waveformBuffer.length; i += 1) {
			const normalizedSample = (this.waveformBuffer[i] - 128) / 128;
			sumSquares += normalizedSample * normalizedSample;
		}

		const rms = Math.sqrt(sumSquares / this.waveformBuffer.length);
		const normalized = Math.min(1, Math.max(0, rms * 2));
		return normalized;
	}

	stop() {
		this.events.onEnd?.();
	}

	private ensureAudioGraph() {
		if (this.audioContext && this.analyser) {
			return;
		}

		if (typeof window === "undefined") return;

		const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
		if (!Ctx) return;

		this.audioContext = new Ctx();

		this.analyser = this.audioContext.createAnalyser();
		this.analyser.fftSize = FFT_SIZE;
		this.analyser.smoothingTimeConstant = 0.8;
		this.waveformBuffer = new Uint8Array(this.analyser.fftSize);
	}
}
