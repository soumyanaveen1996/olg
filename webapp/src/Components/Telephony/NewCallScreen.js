import React, { PureComponent } from "react";
import NewCallContactsContainer from "./NewCallContactsContainer";

class NewCallScreen extends PureComponent {
	render() {
		return (
			<div
				style={{
					backgroundColor: "#fff",
					borderRadius: "0.3rem",
					overflow: "hidden",
				}}
			>
				<div>
					<NewCallContactsContainer
						noBalance={() => this.props.noBalance()}
						selectedDomain={this.props.selectedDomain}
						showDialPad={this.props.showDialPad}
						onCloseDialler={this.props.onCloseDialler}
					/>
				</div>
			</div>
		);
	}
}

export default NewCallScreen;
