import React from "react";

const WindowTitle = ({ title }) => {
	return (
		<div className="d-flex draggable-icon-container flex-row align-items-center">
			<span style={{ marginLeft: "10px", fontSize: "bold" }}>{title}</span>
		</div>
	);
};

export default WindowTitle;

//Old code form componentInWindow

{
	/* <div className="d-flex draggable-icon-container flex-row align-items-center">
  <span style={{ marginLeft: "10px", fontSize: "bold" }}>
    {elem.options.title}
  </span>
</div> */
}
