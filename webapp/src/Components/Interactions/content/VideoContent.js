import React, { Component } from "react";
import {
	getFileUrl,
	getFileUsingUrl,
	isFileFromS3,
} from "../../../Services/FilesService";

class VideoContent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	playVideo = () => {
		let { data, id } = this.props;
		let fileName = Array.isArray(data) ? data[0] : data;
		if (isFileFromS3(fileName)) {
			this.loadVideo(fileName, id);
		} else {
			getFileUsingUrl(getFileUrl(this.props.conversationId, fileName)).then(
				(videoUrl) => {
					this.loadVideo(videoUrl, id);
				}
			);
		}
	};

	loadVideo = (videoUrl, id) => {
		let video = document.getElementById("video_" + id);
		let source = document.getElementById("videoSource_" + id);
		source.src = videoUrl;
		video.load(); //call this to just preload the audio without playing
		video.play();
		this.setState({ downloaded: true });
	};

	render() {
		let { videoUrl } = this.state;

		return (
			<div>
				<div>
					<video
						id={"video_" + this.props.id}
						controls
						style={this.props.style || { width: "100%", height: "100%" }}
						controlsList="nodownload"
					>
						<source
							src=""
							id={"videoSource_" + this.props.id}
							type="audio/mp4"
						/>
					</video>
				</div>
				<div>
					<a
						onClick={this.playVideo}
						disabled={this.state.downloaded}
						className="btn btn-sm btn-open"
					>
						Play Video
					</a>
				</div>

				{/*{this.state.loading && (*/}
				{/*<div className="d-flex justify-content-center my-4">*/}
				{/*<NoStateSpinner />*/}
				{/*</div>*/}
				{/*)}*/}
			</div>
		);
	}
}
export default VideoContent;
