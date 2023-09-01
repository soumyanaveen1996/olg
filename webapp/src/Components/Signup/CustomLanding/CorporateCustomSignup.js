import React, { Component } from "react";
import "./thuraya.css";
import SignupHeader from "./SignupHeader";
import SignupForm from "./SignupForm";
import {
	STATION_SATCOM_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
} from "../../../Utils/Constants";
// export default class CorporateCustomSignup extends Component {
//   render() {
//     const { landingPath } = this.props;
//     let backgroundColor = "rgba(31, 38, 48, 0.7)";
//     if (landingPath === STATION_SATCOM_LANDING) {
//       backgroundColor = "rgba(9,69,116, 0.7)";
//     }

//     return (
//       <div>
//         <div
//           className="d-flex flex-column signup-box px-lg-5 py-lg-5"
//           style={{
//             backgroundColor: backgroundColor,
//             width: landingPath === VIKAND_LANDING && "550px",
//             height: landingPath === VIKAND_LANDING && "unset",
//           }}
//         >
//           <SignupHeader landingPath={landingPath} />
//           <div
//             style={{
//               marginTop: landingPath === VIKAND_LANDING ? "10px" : "30px",
//             }}
//           >
//             <SignupForm {...this.props} />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

function CorporateCustomSignup(props) {
	const { landingPath } = props;
	let backgroundColor = "rgba(31, 38, 48, 0.7)";
	if (landingPath === STATION_SATCOM_LANDING) {
		backgroundColor = "rgba(9,69,116, 0.7)";
	}
	return (
		<div>
			<div
				className="d-flex flex-column align-items-center justify-content-center signup-box px-lg-5 py-lg-5"
				style={{
					backgroundColor: backgroundColor,
					width:
						(landingPath === VIKAND_LANDING || VIKAND_DIRECT_LANDING) &&
						"550px",
					height:
						(landingPath === VIKAND_LANDING || VIKAND_DIRECT_LANDING) &&
						"unset",
				}}
			>
				<SignupHeader landingPath={landingPath} />
				<div
					style={{
						marginTop:
							landingPath === VIKAND_LANDING || VIKAND_DIRECT_LANDING
								? "10px"
								: "30px",
					}}
				>
					<SignupForm {...props} />
				</div>
			</div>
		</div>
	);
}

export default CorporateCustomSignup;
