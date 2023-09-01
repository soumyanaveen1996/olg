import React from "react";
import { Link } from "react-router-dom";

export default function FMLink({ title, href, color = "inherit" }) {
	return (
		<Link style={{ color }} to={href}>
			{title}
		</Link>
	);
}
