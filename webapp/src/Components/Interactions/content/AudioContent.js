import React, { Component } from "react";
import {
	getFileUrl,
	getFileUsingUrl,
	isFileFromS3,
} from "../../../Services/FilesService";

class AudioContent extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
	}

	playAudio = () => {
		let { data, id } = this.props;
		let fileName = Array.isArray(data) ? data[0] : data;
		if (isFileFromS3(fileName)) {
			this.loadVideo(fileName, id);
		} else {
			getFileUsingUrl(getFileUrl(this.props.conversationId, fileName)).then(
				(audioUrl) => {
					this.loadAudio(audioUrl, id);
				}
			);
		}
	};

	loadAudio = (audioUrl, id) => {
		let audio = document.getElementById("audio_" + id);
		let source = document.getElementById("audioSource_" + id);
		source.src = audioUrl;
		audio.load(); //call this to just preload the audio without playing
		audio.play();
		this.setState({ downloaded: true });
	};

	render() {
		return (
			<div
				className="d-flex justify-content-end align-items-center"
				style={{ height: "60px" }}
			>
				<div>
					<a
						className="btn btn-sm btn-open mr-2"
						onClick={this.playAudio}
						disabled={this.state.downloaded}
					>
						Play Audio
					</a>
				</div>
				<audio id={"audio_" + this.props.id} controls="controls">
					<source id={"audioSource_" + this.props.id} src="" />
					Your browser does not support the audio format.
				</audio>

				{/*<audio controls controlsList="nodownload">*/}
				{/*{audioUrl && <source src={audioUrl} type="audio/mpeg" />}*/}
				{/*</audio>*/}

				{/*{this.state.loading && <NoStateSpinner />}*/}
			</div>
		);
	}
}
export default AudioContent;

{
	/*<audio controls autoPlay="autoplay" controlsList="nodownload">*/
}
