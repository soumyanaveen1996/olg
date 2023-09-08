import React, { Component } from "react";
import GenericAjax from "../../../Services/GenericAjax";
import Config from "../../../Utils/Config";
import _ from "lodash";

const R = require("ramda");

class ImageContent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.imgRef = React.createRef();
	}

	componentDidMount() {
		let { data } = this.props;
		this.loadImage(Array.isArray(data) ? data[0] : data);
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.data, prevProps.data)) {
			let nextData = this.props.data;
			let data = prevProps.data;
			let nextFileName = Array.isArray(nextData) ? nextData[0] : nextData;
			let fileName = Array.isArray(data) ? data[0] : data;

			if (nextFileName !== fileName) {
				this.loadImage(nextFileName);
			}
		}
	}

	loadImage = (fileName) => {
		// Retrieve the image URL from localStorage
		let storedImgUrl = localStorage.getItem(fileName);

		// If URL exists in localStorage and it is a blob URL
		if (storedImgUrl) {
			this.setState({ imgUrl: storedImgUrl });
		} else {
			this.setState({ loading: true });

			GenericAjax.downloadSignedUrlFile(
				`${R.prop("filesAPI", Config)}/downloadwithsignedurl/conversation/${this.props.conversationId}/${fileName}`
			)
				.then((res) => {
					if (res?.signedUrl) {
						// TODO : Store signed url instead of blob url
						// TODO: when get blob url from localstorage, it is not getting display
								this.setState({ loading: false, imgUrl: res?.signedUrl });
								localStorage.setItem(fileName, res?.signedUrl);
					}
				})
				.catch((error) => {
					console.error("ERROR in generating Signed Url", error);
					this.setState({ loading: false });
				});
		}
	};

	render() {
		let { imgUrl } = this.state;

		return (
			<div>
				<img
					ref={this.imgRef}  // attach the ref here
					loading="lazy"
					id="image-message"
					alt="img-message"
					src={imgUrl || ''}
					style={
						this.props.style || {
							overflow: "hidden",
							maxWidth: "100%",
							backgroundSize: "cover",
							height: "60vh",
						}
					}
				/>
				{/*{this.state.loading && (
				<div className="d-flex justify-content-center my-4">
				<NoStateSpinner />
				</div>
				)}*/}
			</div>
		);
	}
}

export default ImageContent;
