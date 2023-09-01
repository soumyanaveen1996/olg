import React from "react";

const HomeSlidesNavigation = (props) => {
	let { leftOnly, rightOnly, activeIndex, goTo, loginPage, previous, next } =
		props;

	return (
		<React.Fragment>
			{!loginPage && (
				<div
					className="d-flex justify-content-around p-4"
					style={{ width: "100%" }}
				>
					{!rightOnly && (
						<a className="btn btn-install btn-lg" onClick={previous}>
							<i className="icon-arrow-left" /> Previous
						</a>
					)}
					{!leftOnly && (
						<a className="btn btn-install btn-lg" onClick={next}>
							Next <i className="icon-arrow-right" />
						</a>
					)}
				</div>
			)}

			<div
				className="mt-3"
				style={{
					width: "100%",
					borderTop: "1px solid #DEDEDE",
				}}
			>
				<div className="p-4 d-flex justify-content-center align-items-center">
					<a
						onClick={() => {
							goTo(0);
						}}
					>
						<span
							className="home-nav-dot"
							style={{
								backgroundColor: activeIndex === 0 ? "#2FC76F" : "#DEDEDE",
							}}
						/>
					</a>
					<a
						onClick={() => {
							goTo(1);
						}}
					>
						<span
							className="home-nav-dot"
							style={{
								backgroundColor: activeIndex === 1 ? "#638DFF" : "#DEDEDE",
							}}
						/>
					</a>
					<a
						onClick={() => {
							goTo(2);
						}}
					>
						<span
							className="home-nav-dot"
							style={{
								backgroundColor: activeIndex === 2 ? "#E5743B" : "#DEDEDE",
							}}
						/>
					</a>
					<a
						onClick={() => {
							goTo(3);
						}}
					>
						<span
							className="home-nav-dot"
							style={{
								backgroundColor: activeIndex === 3 ? "#638DFF" : "#DEDEDE",
							}}
						/>
					</a>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HomeSlidesNavigation;
