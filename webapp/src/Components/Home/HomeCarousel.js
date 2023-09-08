import React, { Component } from "react";
import { VIKAND_DIRECT_LANDING } from "../../Utils/Constants";

import HomeSlide1 from "./HomeSlide1";
import HomeSlide2 from "./HomeSlide2";
import HomeSlide3 from "./HomeSlide3";
import HomeSlide5 from "./HomeSlide5";

const slides = [HomeSlide1, HomeSlide2, HomeSlide3, HomeSlide5];

class HomeCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0, corporateScreen: false };
	}

	componentDidMount() {
		const pathArray = ["/vikandconnect"];
		if (window.location.pathname) {
			let pathIndex;
			pathIndex = pathArray.findIndex(
				(elem) => elem === window.location.pathname
			);
			if (pathIndex !== -1) {
				if (window.location.pathname === VIKAND_DIRECT_LANDING) {
					this.setState({ corporateScreen: true });
				}
			}
		}
		window.document.onkeydown = (e) => {
			e = e || window.event;
			switch (e.key) {
				case "ArrowLeft":
					this.previous();
					break;
				case "ArrowRight":
					this.next();
					break;
				default:
			}
		};
	}

	next = () => {
		const nextIndex =
			this.state.activeIndex === slides.length - 1
				? 0
				: this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	};

	previous = () => {
		const nextIndex =
			this.state.activeIndex === 0
				? slides.length - 1
				: this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	};

	goTo = (nextIndex) => {
		this.setState({ activeIndex: nextIndex });
	};

	render() {
		const { activeIndex } = this.state;

		let Slide = slides[activeIndex];

		return (
			<div
				className="d-flex flex"
				style={{ backgroundColor: "#fff", height: "100%" }}
			>
				<Slide
					corporateScreen={this.state.corporateScreen}
					next={this.next}
					previous={this.previous}
					history={this.props.history}
					activeIndex={activeIndex}
					goTo={this.goTo}
				/>
			</div>
		);
	}
}

export default HomeCarousel;
