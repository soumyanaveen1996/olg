import React, { useEffect, useState, useRef } from "react";
import { getImageFile, setImageFile } from "../../Services/StorageService";
const HomeSlideRight = (props) => {
	let { image, imgKey } = props;

	const [localImgFile, setLocalImgFile] = useState("");
	const imgRef = useRef();
	imgRef.current = imgKey;

	useEffect(() => {
		getImageFileFunc();
	}, [imgKey, localImgFile]);

	const getImageFileFunc = async () => {
		const imgFile = await getImageFile(imgKey);
		setLocalImgFile(imgFile);
	};

	let src;
	if (imgKey) {
		if (localImgFile) {
			src = "url('" + localImgFile + "')";
		} else {
			src = "url('" + image + "')";
			fetch(image)
				.then(function (response) {
					return response.blob();
				})
				.then(function (myBlob) {
					const reader = new FileReader();
					reader.onload = (event) => {
						setImageFile(imgKey, event.target.result);
					};
					reader.readAsDataURL(myBlob);
				});
		}
	} else {
		src = "url('" + image + "')";
	}

	return (
		<img
			loading="lazy"
			className="slider-bg"
			style={{
				flex: 3,
				backgroundImage: src,
				backgroundSize: "cover",
			}}
		/>
	);
};

export default HomeSlideRight;
