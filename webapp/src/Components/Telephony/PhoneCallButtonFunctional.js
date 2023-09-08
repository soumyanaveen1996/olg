import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ModalPopup from "../ModalMessages/ModalPopup";
import DiallerKeyPad from "./DiallerKeyPad";

const PhoneCallButtonFunctional = (props) => {
	const [openDialPad, setOpenDialPad] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(null);

	useEffect(() => {
		let { to } = props;
		if (to) {
			setPhoneNumber(to);
		}
	}, [props]);

	// fix time between calling the user

	const openDialpadFnc = () => {
		setOpenDialPad(true);
	};

	const closeDiallerPad = () => {
		setOpenDialPad(false);
	};

	const { className = "", style = {} } = props;
	return (
		<>
			<a onClick={openDialpadFnc} className={className} style={style}>
				{props.children}
			</a>
			{openDialPad && (
				<ModalPopup size="sm" noHeader className="dialler-modal">
					<DiallerKeyPad
						callerInfo={{ toNumber: phoneNumber }}
						onClose={closeDiallerPad}
					/>
				</ModalPopup>
			)}
		</>
	);
};

//commenting pulling of redux state as it is not needed for now,
// if needed then just uncomment the code below

// const mapDataToProps = (state) => {
// 	return {
// 		user: state.user,
// 		balance: state.user.balance,
// 		isPostpaidUser: state.user.voipStatus || false,
// 	};
// };

// export default connect(mapDataToProps, null)(PhoneCallButtonFunctional);
export default PhoneCallButtonFunctional;
