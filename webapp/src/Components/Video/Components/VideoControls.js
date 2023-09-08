import React from "react";

// Material UI icons import
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";

import OpenInBrowserOutlinedIcon from "@mui/icons-material/OpenInBrowserOutlined";
import AlbumOutlinedIcon from "@mui/icons-material/AlbumOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// styles
import "../../../styles/css/video_styles.css";

// new Video conferencing DiallingScreen
const VideoControls = (props) => {
	return (
		<div className="video-conf-controls-div">
			<div className="video-conf-controls-persons-div">
				<div
					className="icon-div hand-cursor p1em"
					style={{ position: "relative" }}
				>
					<PeopleOutlinedIcon className="icon-non-rounded icon-block text-white" />
					<span className="">Participants</span>
					<span style={{ position: "absolute", right: 5, top: 0 }}>{2}</span>
				</div>
				{/* <div className="icon-div hand-cursor p1em">
					<ChatOutlinedIcon className="icon-non-rounded icon-block text-white" />
					<span className="">Chats</span>
				</div> */}
			</div>

			<div className="video-conf-controls-video-div">
				<div
					className="icon-div hand-cursor p1em"
					onClick={() => props.toggleAudio()}
				>
					{props.audioMute ? (
						<MicOffOutlinedIcon className="icon-block text-white icon-rounded" />
					) : (
						<MicOutlinedIcon className="icon-block text-white icon-rounded" />
					)}
					<span className="">Mute</span>
				</div>
				<div
					className="icon-div hand-cursor p1em"
					onClick={() => props.toggleVideo()}
				>
					{props.videoMute ? (
						<VideocamOffOutlinedIcon className="icon-block text-white icon-rounded" />
					) : (
						<VideocamOutlinedIcon className="icon-block text-white icon-rounded" />
					)}
					<span className="">Turn off cam</span>
				</div>
				{/* <div className=" icon-div hand-cursor p1em">
					<OpenInBrowserOutlinedIcon className="icon-block text-white icon-rounded" />
					<span className="">Share screen</span>
				</div>
				<div className="icon-div hand-cursor p1em">
					<AlbumOutlinedIcon className="icon-block text-white icon-rounded" />
					<span className="">Record</span>
				</div> */}
			</div>

			<div className="video-conf-controls-settings-div">
				{/* <div className="icon-div hand-cursor p1em">
					<PersonAddOutlinedIcon className="icon-non-rounded icon-block text-white" />
					<span className="">Invite</span>
				</div> */}

				{/* <div
					className="icon-div hand-cursor p1em"
					style={{ borderRight: "solid 1px #868383" }}
				>
					<MoreVertIcon className="icon-non-rounded icon-block text-white" />
					<span className="">Settings</span>
				</div> */}

				<div
					className="icon-div hand-cursor p1em"
					onClick={async () => props.endCall()}
				>
					<ExitToAppIcon className="icon-block text-white icon-rounded exit-icon" />
					<span className="">Exit</span>
				</div>
			</div>
		</div>
		// </div>
	);
};

export default VideoControls;
