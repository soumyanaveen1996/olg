import React, { useState } from "react";
import cx from "classnames";
import styles from "./ChannelsSearch.module.css";
const ChannelsSearch = (props) => {
	const [searchText, changeSearchText] = useState("");

	const handleInputChange = (e) => {
		changeSearchText(e.target.value);
		props.updateChannelSearchKey(e.target.value);
	};

	const clearSearch = () => {
		changeSearchText("");
		props.updateChannelSearchKey("");
	};

	return (
		<div
			className={cx(
				styles.container,
				"d-flex align-items-center justify-content-end"
			)}
		>
			{searchText && searchText.length ? (
				<a
					className={cx(styles.btn_icon_conatiner, "text-muted")}
					onClick={clearSearch}
				>
					<i className={cx(styles.icon, "icon-cross")} />
				</a>
			) : (
				<a className={cx(styles.btn_icon_conatiner, "text-muted")}>
					<i className={cx(styles.icon, "icon-magnifier")} />
				</a>
			)}

			<input
				className={cx(styles.search_input, "form-control")}
				type="search"
				placeholder="Search groups"
				onChange={handleInputChange}
				value={searchText}
			/>
		</div>
	);
};

export default ChannelsSearch;
