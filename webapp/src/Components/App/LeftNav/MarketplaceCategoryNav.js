import React, { PureComponent } from "react";
import LeftNavBot from "./LeftNavBot";
import MenuArrow from "../../Common/MenuArrow";

class MarketplaceCategoryNav extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	render() {
		let { category, bots, selectedConversation } = this.props;
		let { active } = this.state;

		let classNames =
			"d-flex justify-content-between align-items-center appnav-link";

		return (
			<li style={{ paddingTop: "0px", margin: "0px" }}>
				<div className={classNames}>
					<a
						onClick={() => {
							this.setState({ active: !active });
						}}
						className="list-item active d-flex align-items-center justify-content-between"
						style={{
							fontSize: "14px",
							color: "#fff",
							marginBottom: 0,
							opacity: 1,
							fontWeight: 400,
							width: "100%",
						}}
					>
						{/*{active && (*/}
						{/*<span className="combined-shape" style={{ display: "block" }} />*/}
						{/*)}*/}
						{/*<Avatar*/}
						{/*imgSrc={`${R.prop(*/}
						{/*"contentURL",*/}
						{/*Config*/}
						{/*)}${category.toLowerCase().replace(/ /g, "_") + ".png"}`}*/}
						{/*size={20}*/}
						{/*style={{ opacity: 1 }}*/}
						{/*/>*/}

						<span className="list-title text-white fs12 font-weight-bold">
							{category}
						</span>
						<MenuArrow
							onOpen={() => {
								this.setState({ active: true });
							}}
							onClose={() => {
								this.setState({ active: false });
							}}
							open={active}
						/>
					</a>

					{/*<a*/}
					{/*style={{*/}
					{/*fontSize: "14px",*/}
					{/*color: "#fff",*/}
					{/*marginBottom: 0*/}
					{/*}}*/}
					{/*onClick={() => {*/}
					{/*this.setState({ active: true });*/}
					{/*}}*/}
					{/*>*/}
					{/*{category}*/}
					{/*</a>*/}
				</div>
				{active && (
					<ul>
						{bots.map((bot) => (
							<li key={bot.botId} style={{ margin: "0px", paddingTop: "0px" }}>
								<div>
									<LeftNavBot
										key={bot.botId}
										bot={bot}
										onUnsubscribe={this.onUnsubscribe}
										createConversation={this.props.createConversation}
										active={
											selectedConversation.bot &&
											selectedConversation.bot.botId === bot.botId
										}
									/>
								</div>
							</li>
						))}
					</ul>
				)}
			</li>
		);
	}
}

export default MarketplaceCategoryNav;
