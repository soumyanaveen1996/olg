import React from "react";
import PropTypes from "prop-types";

const ContactRemovalConfirmation = (props) => {
	let { contact, cancel, remove } = props;

	return (
		<div className="p-4 text-center">
			<div>Are you sure you want to remove {contact.userName}? </div>
			<div className="mt-2 warning-text">
				<i className="icon-warning mr-2" />
				You can’t revert this action
			</div>

			<div className="mt-4">
				<a
					onClick={cancel}
					className="btn btn-sm btn-outline-info btn-install my-1 mx-2"
				>
					Cancel
				</a>
				<a onClick={remove} className="btn btn-sm btn-open my-1 mx-2">
					Yes, delete
				</a>
			</div>
		</div>
	);
};

ContactRemovalConfirmation.propTypes = {
	contact: PropTypes.object.isRequired,
	remove: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
};

export default ContactRemovalConfirmation;
