import React, { useEffect, useState } from "react";
import { getImageFile, setImageFile } from "../../Services/StorageService";
const CachedImage = ({ image, imgKey, width, imgClassName, ...otherProps }) => {
	const [src, setSrc] = useState(null);

	useEffect(() => {
		if (imgKey) {
			getImageFile(imgKey).then((localImgFile) => {
				if (localImgFile) {
					setSrc(localImgFile);
				} else {
					setSrc(image);
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
			});
		} else {
			setSrc(image);
		}
	}, []);

	if (src !== null) {
		return (
			<img
				loading="lazy"
				width={width}
				className={imgClassName}
				src={src}
				{...otherProps}
			/>
		);
	}
	return null;
};

export default CachedImage;
