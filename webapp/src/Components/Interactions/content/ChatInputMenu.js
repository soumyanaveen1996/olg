import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import FileUploadButton from "../../Common/FileUploadButton";
import ModalPopup from "../../ModalMessages/ModalPopup";
import ShareContacts from "./ShareContacts";
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import Tooltip from "@mui/material/Tooltip";

class ChatInputMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
			showAddMember: false,
			contactIds: [],
			allProfileImages: {},
		};
	}

	componentDidMount() {
		let memberArray = [];

		if (this.props.allProfileImages) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}
		if (this.props.contacts) {
			this.props.contacts.map((elem) => {
				memberArray.push(elem.userId);
			});
		}

		this.setState({ contactIds: [...memberArray] });
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.allProfileImages, prevProps.allProfileImages)) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}
	}

	toggle = (e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
	};

	closeAddMember = () => {
		this.setState({ showAddMember: false });
	};

	sendContacts = (contacts) => {
		console.log("sending contacts", contacts);
		contacts.forEach((contact) => {
			this.props.sendMessage([contact]);
		});

		this.setState({ showAddMember: false });
	};

	render() {
		return (
			<>
				<SentimentSatisfiedOutlinedIcon
					style={{
						color: "#cecfd3",
						fontSize: 25,
					}}
					onClick={this.props.toggleEmoji}
				/>
				<FileUploadButton onFilesSet={this.toggle} />
				<Tooltip title="Contacts" placement="top">
					<PermContactCalendarOutlinedIcon
						onClick={() => {
							this.setState({ showAddMember: true });
						}}
						style={{ color: "#cecfd3", margin: 1 }}
					/>
				</Tooltip>
				{this.state.showAddMember && (
					<ModalPopup
						onClose={this.closeAddMember}
						size="sm"
						title="Share contacts"
					>
						<ShareContacts
							allProfileImages={this.props.allProfileImages}
							members={[...this.state.contactIds]}
							memberDetails={[...this.props.contacts]}
							shareContacts={this.sendContacts}
							cancel={this.closeAddMember}
						/>
					</ModalPopup>
				)}
			</>
		);
	}
}

ChatInputMenu.propTypes = {
	allProfileImages: PropTypes.object.isRequired,
};

export default ChatInputMenu;
