import React, { useState, useEffect } from "react";
import Avatar from "../../Common/Avatar";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import history from "./../../../Services/History";
import { getProfilePhoto } from "../../../Services/FilesService";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfileImage } from "../../../State/actions/user";
import { clearLFStorage } from "../../../Services/LFStorage";
import { user } from "../../../Services/gRPC/Generated/UserService";
import { getAuthData, putInStorage } from "../../../Services/StorageService";
import { Tooltip } from "@mui/material";

const AvatarForwarded = React.forwardRef((props, ref) => (
	<Avatar innerRef={ref} {...props} />
));

export default function UserInfo(props) {
	let { userName, logout, userId } = props;
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [profilePhoto, setProfilePhoto] = useState(null);
	const userProfileImage = useSelector((state) => state.user.profileImage);
	const dispatch = useDispatch();

	function getFromStorage(key) {
		let stored = localStorage.getItem(key);
		// console.log("stored ======", stored);
		if (stored) {
			return JSON.parse(stored);
		}
		return null;
	}

	useEffect(() => {
		loadProfilePic();
	}, []);

	useEffect(() => {
		if (profilePhoto !== userProfileImage) {
			loadProfilePic(true);
		}
	}, [userProfileImage]);

	const toggle = () => setDropdownOpen(!dropdownOpen);

	const loadProfilePic = (newPic = false) => {
		if (userProfileImage && !newPic) {
			setProfilePhoto(userProfileImage);
		} else {
			// getProfilePhoto(userId + "_75x75.png")
			// 	.then((file) => {
			// 		setProfilePhoto(file);
			// 		dispatch(setUserProfileImage(file));
			// 	})
			// 	.catch((error) => {
			// 		console.error("loadProfilePic error", error);
			// 		setProfilePhoto(null);
			// 	});
		}
	};

	const gotoUserProfile = () => {
		history.push("/app/my-profile");
	};

	const clearListCookies = () => {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var spcook = cookies[i].split("=");
			deleteCookie(spcook[0]);
		}
		function deleteCookie(cookiename) {
			var d = new Date();
			d.setDate(d.getDate() - 1);
			var expires = ";expires=" + d;
			var name = cookiename;
			//alert(name);
			var value = "";
			document.cookie = name + "=" + value + expires + "; path=/acc/html";
		}
	};

	const LogoutAndReset = () => {
		let cookiePolicyAccepted = getFromStorage("cookiePolicyAccepted");

		clearLFStorage();

		var pathName = localStorage.getItem("pathName");
		localStorage.clear();
		localStorage.setItem("pathName", pathName);
		clearListCookies();
		setDropdownOpen(!dropdownOpen);
		if (cookiePolicyAccepted) {
			putInStorage("cookiePolicyAccepted", true);
		}

		logout();
	};

	return (
		<>
			{/* <OfflineSwitch /> */}
			<div className="d-flex align-items-center justify-content-end mr-2">
				{/* <span style={{ color: "#A7A7A7" }}>{userName}</span> */}
				<div className="list">
					<div>
						<Dropdown direction="start" isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle className="dropdownToggle">
								<Tooltip arrow title={userName}>
									<AvatarForwarded
										name={userName}
										imgSrc={profilePhoto}
										size={32}
										height={32}
										color="name-avatar"
										style={{
											borderRadius: "50%",
											display: "flex",
											textAlign: "center",
											backgroundColor: "#e5743b",
											justifyContent: "center",
											objectFit: "cover",
										}}
									/>
								</Tooltip>
							</DropdownToggle>

							<DropdownMenu className="user-profile-dd-menu">
								{/* <a
									className="nav-link mt-3 mb-1"
									style={{ color: "#666666" }}
									onClick={gotoUserProfile}
								>
									<span style={{ padding: 2 }}>My profile</span>
								</a> */}
								{/* <a
									className="nav-link mb-3 mt-1"
									style={{ color: "#E5453B" }}
									onClick={() => {
										setDropdownOpen(!dropdownOpen);
										logout();
									}}
								>
									<span style={{ padding: 2 }}>Log out</span>
								</a> */}
								<a
									className="nav-link mt-1 mb-1"
									style={{ color: "#E5453B" }}
									onClick={() => LogoutAndReset()}
								>
									<span style={{ padding: 2 }}>Log out</span>
								</a>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</div>
		</>
	);
}
