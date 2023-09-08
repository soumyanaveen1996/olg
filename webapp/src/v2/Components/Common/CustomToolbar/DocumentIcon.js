import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

export default function DocumentIcon(props) {
	return (
		<SvgIcon {...props}>
			<defs>
				<filter id="gcn5c8x3wa" colorInterpolationFilters="auto">
					<feColorMatrix
						in="SourceGraphic"
						values="0 0 0 0 0.266667 0 0 0 0 0.282353 0 0 0 0 0.352941 0 0 0 1.000000 0"
					/>
				</filter>
			</defs>
			<g fill="none" fillRule="evenodd">
				<g>
					<g
						filter="url(#gcn5c8x3wa)"
						transform="translate(-85.000000, -186.000000) translate(30.000000, 168.000000)"
					>
						<g>
							<path
								d="M0 0L24 0 24 24 0 24z"
								transform="translate(55.000000, 18.000000)"
							/>
							<path
								fill="#000"
								fillRule="nonzero"
								d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5zm3 16H5V5h10v4h4v10zM7 17h10v-2H7v2zm5-10H7v2h5V7zm-5 6h10v-2H7v2z"
								transform="translate(55.000000, 18.000000)"
							/>
						</g>
					</g>
				</g>
			</g>
		</SvgIcon>
	);
}
