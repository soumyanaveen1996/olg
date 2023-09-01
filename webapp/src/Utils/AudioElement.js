import Config from "../Utils/Config";

const R = require("ramda");
class AudioElement {
	constructor() {
		this.breakTune = null;
		this.ring = null;
		this.beep = null;
		this.currStatus = false;
	}

	loadAudio() {
		if (this.ring === null) {
			console.info("%c Loading Audio Files", "color: grey;");
			let beepTone = `${R.prop("soundURL", Config)}beep_beep_beep.mp3`;
			let ringTone = `${R.prop("soundURL", Config)}FrontM_Ring.mp3`;
			this.ring = new Audio(ringTone);
			this.beep = new Audio(beepTone);
			this.ring.loop = false;
			this.beep.loop = false;
		}
	}

	toggleLoop(val) {
		if (!this.ring) return;
		// this.ring.loop = val;
		this.currStatus = val;
	}

	ringToneWithInterval() {
		this.breakTune = setInterval(() => {
			if (this.currStatus === true) {
				this.ring.play();
				// this.ringToneWithInterval();
			}
		}, 5000);
	}

	playRing() {
		if (!this.ring) return;
		// this.ring.play().catch((error) => {
		// 	console.error("Cannot play Ring Audio", error);
		// });

		this.ringToneWithInterval();
	}

	pauseRing() {
		clearInterval(this.breakTune);
		if (!this.ring) return;
		this.ring.pause();
	}

	playBeep() {
		if (!this.beep) return;
		this.beep.play().catch((error) => {
			console.error("Cannot play ring", error);
		});
	}

	pauseBeep() {
		if (!this.beep) return;
		this.beep.pause();
	}
	disableSound() {
		this.ring = null;
		this.beep = null;
	}
}

export default new AudioElement();
