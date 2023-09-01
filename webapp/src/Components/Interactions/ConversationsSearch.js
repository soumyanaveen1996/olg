import React, { Component } from "react";

class ConversationsSearch extends Component {
	state = {};

	handleInputChange = (e) => {
		this.setState({ searchText: e.target.value });
	};

	search = (e) => {
		e.preventDefault();
		this.props.search(this.state.searchText);
	};

	clearSearch = () => {
		this.setState({ searchText: "" });
		this.props.search();
	};

	render() {
		let searchText = this.state.searchText;
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ width: "100%" }}
			>
				<form
					className="form-inline justify-content-center"
					onSubmit={this.search}
					style={{ width: "100%" }}
				>
					<div
						className="d-flex align-items-center"
						style={{
							// border: "1px solid rgb(229, 232, 238)",
							// borderRadius: "2px"

							height: "40px",
							width: "90%",
							border: "1px solid #DEDEDE",
							borderRadius: "10px",
							backgroundColor: "#FFFFFF",
						}}
					>
						{(!searchText || !searchText.length) && (
							<button
								className="bg-trans border0 text-muted"
								type="submit"
								style={{
									position: "inherit",
									paddingLeft: "17px",
									paddingRight: "7px",
								}}
							>
								<i
									className="icon-magnifier"
									style={{
										fontWeight: "bold",
										color: "#638DFF",
										fontSize: "16px",
									}}
								/>
							</button>
						)}
						{searchText && searchText.length && (
							<a
								className="bg-trans border0 text-muted"
								style={{
									position: "inherit",
									alignSelf: "center",
									paddingLeft: "17px",
									paddingRight: "7px",
								}}
								onClick={this.clearSearch}
							>
								<span
									aria-hidden="true"
									className="icon-cross"
									style={{
										fontWeight: "bold",
										color: "#638DFF",
										fontSize: "16px",
									}}
								/>
							</a>
						)}

						<input
							className="form-control search-input border0"
							type="search"
							placeholder="Search apps"
							onChange={this.handleInputChange}
							value={this.state.searchText}
							style={{
								height: "35px",
								width: "90%",
								margin: "0 5px",
								border: "0px solid #fff",
							}}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default ConversationsSearch;
