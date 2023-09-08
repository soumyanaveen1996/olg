import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import cx from "classnames";
import styles from "./MarketplaceSearch.module.css";
const MarketplaceSearch = (props) => {
	const [searchText, changeSearchText] = useState("");

	useEffect(() => {
		return () => {
			debounceChange.cancel();
		};
	}, []);

	const handleInputChange = (value) => {
		makeSearch(value);
	};

	const debounceChange = useCallback(
		debounce((value) => props.searchCatalogue(value), 300),
		[]
	);

	const makeSearch = (value) => {
		changeSearchText(value);
		debounceChange(value);
	};

	const clearSearch = () => {
		makeSearch("");
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
				placeholder="Search"
				onChange={(e) => handleInputChange(e.target.value)}
				value={searchText}
			/>
		</div>
	);
};

export default MarketplaceSearch;
