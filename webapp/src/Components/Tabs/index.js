import React from "react";
import _ from "lodash";
import "./Tab.css";

export default function Tabs(props) {
	const handleChange = (index) => {
		props.updateSelectedTabs(index);
	};

	return (
		<div>
			<ul
				className="inline"
				style={{
					overflow: "auto",
				}}
			>
				{props.children.map((elem, index) => {
					let style = index === props.selected ? "selected" : "";
					return (
						<li
							className={style}
							key={index}
							onClick={() => handleChange(index)}
						>
							{elem.props.title}
						</li>
					);
				})}
			</ul>
			<div className="tab">{props.children[props.selected]}</div>
		</div>
	);
}
