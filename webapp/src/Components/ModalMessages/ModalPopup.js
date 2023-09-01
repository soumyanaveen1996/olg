import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/css/style.css";

const ModalPopup = (props) => {
	let {
		title,
		children,
		onClose,
		size = "lg",
		keyboard = true,
		backdrop = "static",
		noHeader,
		className,
		noBorder,
		bodyStyleObject,
	} = props;
	return (
		<Modal
			id="frontm"
			isOpen={true}
			toggle={onClose}
			size={size}
			keyboard={keyboard}
			backdrop={backdrop}
			className={className}
			centered={true}
			zIndex="999"
		>
			{onClose && (
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<a
						className={`close-icon modal-close-header ${noBorder}`}
						onClick={onClose}
					>
						<CloseIcon style={{ color: "grey", fontSize: 18 }} />
					</a>
				</div>
			)}
			{!noHeader && (
				<ModalHeader
					className={`modal-header-text-alignment ${noBorder}`}
					// toggle={onClose}
				>
					{title}
				</ModalHeader>
			)}
			<ModalBody style={{ ...bodyStyleObject }}>{children}</ModalBody>
		</Modal>
	);
};

export default ModalPopup;
