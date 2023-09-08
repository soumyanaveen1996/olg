import Config from "../Utils/Config";

const R = require("ramda");
class AudioRecorder {
	constructor() {
		this.mediaRecorder = null;
		this.mediaTimeout = null;
	}

	startRecording() {
		return new Promise((resolve, reject) => {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaRecorder.start();

				const audioChunks = [];
				this.mediaRecorder.addEventListener("dataavailable", (event) => {
					audioChunks.push(event.data);
				});

				this.mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
					// audioUrl = URL.createObjectURL(audioBlob);
					resolve(audioBlob);
				});

				this.mediaTimeout = setTimeout(() => {
					this.mediaRecorder.stop();
				}, 60000);
			});
		});
	}

	stopRecording() {
		if (this.mediaRecorder) {
			this.mediaRecorder.stop();
			clearInterval(this.mediaTimeout);
		}
	}
}

export default AudioRecorder;
