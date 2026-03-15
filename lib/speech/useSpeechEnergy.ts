import { useEffect, useState } from "react";
import type { SpeechController } from "./SpeechController";

export function useSpeechEnergy(controller: SpeechController | null) {
	const [speechEnergy, setSpeechEnergy] = useState(0);

	useEffect(() => {
		if (!controller) {
			setSpeechEnergy(0);
			return;
		}

		let rafId = 0;

		const update = () => {
			const next = controller.getAmplitude();

			setSpeechEnergy((prev) => {
				if (Math.abs(prev - next) < 0.002) {
					return prev;
				}
				return next;
			});

			rafId = window.requestAnimationFrame(update);
		};

		rafId = window.requestAnimationFrame(update);

		return () => {
			window.cancelAnimationFrame(rafId);
		};
	}, [controller]);

	return speechEnergy;
}
