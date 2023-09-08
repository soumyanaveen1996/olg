import React from "react";

export function SmallCircleButton({
	onClick,
	backgroundColor,
	color,
	iconClass,
	iconFile,
	border,
	className,
	size,
	toggleDisable,
}) {
	return (
		<a
			className={
				"btn btn-rounded circle-btn d-flex justify-content-center align-items-center " +
				(className ? className : "")
			}
			disabled={toggleDisable}
			style={{
				backgroundColor,
				color,
				width: size ? size + "px" : "36px",
				height: size ? size + "px" : "36px",
				border,
			}}
			onClick={onClick}
		>
			{iconFile && (
				<img
					loading="lazy"
					src={iconFile}
					style={{
						height: "15px",
						width: "10px",
					}}
				/>
			)}
			{iconClass && <i className={iconClass} style={{ fontSize: "18px" }} />}
		</a>
	);
}
