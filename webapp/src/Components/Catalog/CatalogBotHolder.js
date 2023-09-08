import React from "react";
export default function CatalogBotHolder({ className, style, children }) {
	return (
		<div style={style} className={className}>
			{children}
		</div>
	);
}
