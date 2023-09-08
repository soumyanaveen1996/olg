import React, { useEffect, useState } from "react";
const R = require("ramda");

// Avatar component
const Avatar = ({
	name,
	online = false,
	imgSrc,
	size = "avatar32",
	height = null,
	color,
	style,
}) => {
	const [avatarImg, changeAvatar] = useState(imgSrc);

	// Update avatar image when imgSrc changes
	useEffect(() => {
		changeAvatar(imgSrc);
	}, [imgSrc]);

	if (avatarImg) {
		const modifiedColor = color || "bg-primary";
		const width = `${size}px`;
		const heightSize = height ? `${height}px` : "auto";

		return (
			<div
				className="avatar-img-div"
				style={{ ...style, overflow: "hidden", width, height: heightSize, display: "flex", justifyContent: "center" }}>
				{online && <i className="states on" />}
				<img
					loading="lazy"
					className="img-fluid-custom"
					src={avatarImg}
					alt="NO LOGO URL"
					style={{ width, height: heightSize }}
				/>
			</div>
		);
	}

	const modifiedColor = color || "bg-info";
	const nameClass = `list-thumb avatar text-info-light rounded-circle ${modifiedColor} ${getAvatarSize(size)}`;

	return (
		<div className={nameClass} style={{ ...style, overflow: "hidden" }}>
			{online && <i className="states on" />}
			{getNameAvatar(name)}
		</div>
	);
};

// Function to get the class for avatar size
const getAvatarSize = (size) => {
	const avatarSizeMapping = {
		16: "avatar16",
		40: "avatar40",
		64: "avatar64",
		160: "avatar160",
		120: "avatar120",
	};

	return avatarSizeMapping[size] || "avatar32";
};

// Function to generate name avatar
const getNameAvatar = (name) => {
	const nameAvatar = R.isNil(name)
		? "NA"
		: R.pipe(
			R.split(" "),
			R.map((word) => word.charAt(0)),
			R.take(2),
			R.map((letter) => letter.toUpperCase()),
			R.join("")
		)(name);

	return nameAvatar;
};

export default Avatar;
