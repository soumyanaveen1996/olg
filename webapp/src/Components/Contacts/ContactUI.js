import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Contacts.css";
import Avatar from "../Common/Avatar";
import { updateProfileImage } from "../../State/actions/updateProfileImage";
import { getProfilePhoto } from "../../Services/FilesService";

const ContactUI = ({
	name,
	email,
	companyName,
	city,
	userId,
	allProfileImages,
}) => {
	const [profileImg, updateProfileImg] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		if (allProfileImages && userId && allProfileImages[userId]) {
			updateProfileImg(allProfileImages[userId]);
		} else {
			getTheProfileImg();
		}
	}, [allProfileImages]);

	const getTheProfileImg = () => {
		if (allProfileImages && userId && !allProfileImages[userId]) {
			getProfilePhoto(userId + "_75x75.png")
				.then((imgData) => {
					let imgObj = {};
					imgObj[userId] = imgData;
					dispatch(updateProfileImage(imgObj));
				})
				.catch((err) => {
					console.error("contact ui error on profile img", err);
				});
		}
	};

	return (
		<div className="d-flex align-items-center">
			{profileImg ? (
				<Avatar
					name={name}
					size={40}
					height={40}
					style={{ borderRadius: "50%" }}
					imgSrc={profileImg}
				/>
			) : (
				<Avatar
					name={name}
					size={40}
					height={40}
					style={{ borderRadius: "50%" }}
				/>
			)}
			<div className="ml-2">
				<div>{name}</div>
				{email && (
					<small>
						{email}
						{", "}
					</small>
				)}
				{companyName && (
					<small>
						{companyName}
						{", "}
					</small>
				)}
				<small>{city}</small>
			</div>
		</div>
	);
};

export default ContactUI;
