import React, { useState } from "react";

const urlParams = new URLSearchParams(window.location.search);
const sipuri = urlParams.get("sipuri") || "9199@3.236.101.39:5060";
const password = urlParams.get("password") || "9199";
const websocket = urlParams.get("websocket") || "wss://3.236.101.39:8089/ws";
const name = urlParams.get("name") || "9199";
const disabledButtons = urlParams.get("buttons");
const disabledFeatures = urlParams.get("features");
const outsideComponentDial = urlParams.get("dial");
const mode = urlParams.get("mode");

//example url
//http://localhost:3000/phone/react-sip-phone?name=testname&websocket=wss://test-websocket-01-us-east-5.test.com:5065
//&sipuri=user_test@test.domain.com&password=tEsTpAsSwOrD&features=callbuttonsettings&buttons=holdtransfermute

const SipVideo = () => {
	const [dialstring, setDialstring] = useState("");
	return (
		<React.Fragment>
			<section className="phone-component-override">
				{outsideComponentDial ? (
					<div>
						<input
							placeholder="Enter a number to dial"
							onChange={(e) => setDialstring(e.target.value)}
						/>
						<button>Dial</button>
					</div>
				) : null}
			</section>
		</React.Fragment>
	);
};

export default SipVideo;
