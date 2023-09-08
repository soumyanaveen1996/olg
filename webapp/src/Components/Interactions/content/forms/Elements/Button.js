import React from "react";
export default function Button({ text, action, completed, className, style }) {
	return (
		<button
			style={style}
			type="submit"
			className={className}
			onClick={action}
			disabled={completed === true}
		>
			{text}
		</button>
	);
}
