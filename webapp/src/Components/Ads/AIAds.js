import React, { Component } from "react";
class AIAds extends Component {
	constructor() {
		super();
		this.state = {
			dummy: false,
		};
	}
	componentDidMount() {
		setTimeout(() => {
			var _ttq = _ttq || [];
			_ttq.push(["_setAccount", "FM"]);
			_ttq.push(["_setDataSource", "dp"]);
			_ttq.push(["_setProduct", "5"]);
			_ttq.push(["_setLevel", "1"]);
			_ttq.push(["_setLanguage", "[%...%]"]); // The current language (2 characters, ISO 639-1)
			_ttq.push(["_track"]);
			(function () {
				var ttr = document.createElement("script");
				ttr.type = "text/javascript";
				ttr.src =
					("https:" == document.location.protocol ? "https://" : "http://") +
					"ads.travelaudience.com/js/ta.js";
				var s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(ttr, s);
			})();
		}, 500);
		setTimeout(() => {
			this.setState({
				dummy: true,
			});
		}, 1000);
	}
	render() {
		return <div dummy={this.state.dummy} />;
	}
}

export default AIAds;
