import React, { Component } from "react";
import Mandatory from "./Mandatory";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";
import ModalPopup from "../../../../ModalMessages/ModalPopup";
import Spinner from "react-spinkit";
import _ from "lodash";

class LookUpField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSpinner: false,
			results: [],
			element: {},
		};

		this.wrapperRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		if (this.props.element) {
			this.setState({ element: this.props.element });
		}
		if (this.props.element && this.props.element.showSpinner) {
			this.setState({ showSpinner: this.props.element.showSpinner });
		}

		if (this.props.element && this.props.element.results) {
			this.setState({
				results: this.props.element.results,
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.element &&
			!_.isEqual(this.props.element, prevState.element)
		) {
			this.setState({ element: this.props.element });
		}
		if (
			this.props.element &&
			this.props.element.showSpinner !== prevState.showSpinner
		) {
			this.setState({ showSpinner: this.props.element.showSpinner });
		}

		if (
			this.props.element &&
			!_.isEqual(this.props.element.results, prevState.results)
		) {
			this.setState({
				showSpinner: false,
				results: this.props.element.results,
			});
		}
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.wrapperRef && this.wrapperRef.current.contains(event.target)) {
			return;
		}
		let { clearLookUpResults, fieldIndex } = this.props;
		let { element, valueSelected } = this.state;
		if (!valueSelected) {
			clearLookUpResults(element.id, fieldIndex);
		}
	}

	handleBtnClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ showSpinner: true });
		let { clearLookUpResults, doDataLookUp, action, fieldIndex } = this.props;

		let { valueSelected, element } = this.state;
		if (valueSelected) {
			action("");
			this.setState({ valueSelected: false, showSpinner: false, results: [] });
			clearLookUpResults(element.id, fieldIndex);
			// doDataLookUp(element.id, "");
			return;
		}

		doDataLookUp(element.id, element.value);
	};

	showMoreInfo = (info, text) => {
		this.setState({ moreInfo: info, moreInfoTitle: text });
	};

	hideMoreInfo = () => {
		this.setState({ moreInfo: null, moreInfoTitle: null });
	};

	render() {
		let { action, completed, onBlurField, isReadOnly } = this.props;
		let {
			element,
			valueSelected,
			moreInfo,
			moreInfoTitle,
			showSpinner,
			results,
		} = this.state;
		// let results = element.results;
		// console.log("lookup fields results ====== ", moreInfo);
		// results = [
		//   { text: "one", info: { name: "kell" } },
		//   { text: "this is two", info: { name: "max" } },
		//   { text: "this is three" },
		//   { text: "four", info: { name: "kell" } },
		//   { text: "this is five", info: { name: "max" } },
		//   { text: "this six" },
		// ];
		let content = (isReadOnly && (
			<div
				className="d-flex flex-row justify-content-between readOnlyForm"
				style={{ width: "100%", paddingLeft: "30px", paddingRight: "30px" }}
				key={element.id}
			>
				<label htmlFor={element.id}>
					<Mandatory element={element} />
					{element.title}
				</label>
				<label>{(element.value && element.value.text) || ""}</label>
			</div>
		)) || (
				<div
					className="form-group px-4 lookUpField"
					style={{ width: "100%" }}
					key={element.id}
				>
					<div className="d-flex flex-row">
						<label htmlFor={element.id}>
							<Mandatory element={element} />
							{element.title}
						</label>
						{element && element.info && (
							<span className="ml-2">
								<InfoIcon id={`tooltip-${element.id}`} info={element.info} />
							</span>
						)}
					</div>
					<div className="d-flex align-items-center" ref={this.wrapperRef}>
						<div style={{ width: "100%" }}>
							<form
								onSubmit={this.handleBtnClick}
								className="d-flex justify-content-center align-items-center"
								style={{
									boxSizing: "border-box",
									width: "100%",
									border: "0.2px solid rgba(91,91,91,0.2)",
									borderRadius: "10px",
									backgroundColor: "#FFFFFF",
									boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
								}}
							>
								<input
									className="form-control chat-input border0"
									style={{ borderRadius: "10px" }}
									placeholder="Search"
									value={
										element.value && element.value.text
											? element.value.text
											: element.value
												? element.value
												: ""
									}
									onChange={(e) => {
										action(e.target.value);
									}}
									// onKeyPress={(e) => {
									//   e.key === "Enter" && e.preventDefault();
									// }}
									disabled={completed === true || element.readOnly}
									onBlur={onBlurField}
								/>
								{!completed && !element.readOnly && (
									<a
										onClick={this.handleBtnClick}
										className="btn border0"
										style={{ position: "inherit" }}
										disabled={completed === true || element.readOnly}
									>
										{!valueSelected && (
											<span>
												{!showSpinner && (
													<img src="/img/search-icon@2x.png" width="12" />
												)}
												{showSpinner && (
													<div>
														<Spinner name="circle" color="steelblue" />
													</div>
												)}
											</span>
										)}
										{valueSelected && (
											<img src="/img/search-clear-icon@2x.png" width="12" />
										)}
										{/*{showSpinner && (*/}
										{/*  <div>*/}
										{/*    <Spinner name="circle" color="steelblue" />*/}
										{/*  </div>*/}
										{/*)}*/}
									</a>
								)}
							</form>
							{!valueSelected && results && results.length ? (
								<div
									style={{
										backgroundColor: "#F4F4F4",
										borderRadius: "4px",
										boxShadow:
											"0 0 0 1px hsla(0,0%,0%,0.1), 0 4px 11px hsla(0,0%,0%,0.1)",
										marginBottom: "8px",
										marginTop: "8px",
										position: "absolute",
										width: "90%",
										zIndex: 1,
										boxSizing: "border-box",
									}}
								>
									<div
										className="lookUpField_DropDown"
										style={{
											maxHeight: "150px",
											overflowY: "auto",
											paddingBottom: "4px",
											paddingTop: "4px",
											position: "relative",
											boxSizing: "border-box",
										}}
									>
										{results.map((result, index) => (
											<div
												key={index}
												className="d-flex justify-content-between"
												style={{
													backgroundColor: "transparent",
													color: "inherit",
													cursor: "default",
													display: "block",
													fontSize: "inherit",
													padding: "8px 12px",
													width: "100%",
													userSelect: "none",
													boxSizing: "border-box",
												}}
											>
												<a
													style={{ cursor: "pointer" }}
													onClick={() => {
														action({ ...result }, "lookupselection");
														this.setState({
															valueSelected: true,
														});
													}}
												>
													{result.text}
												</a>
												{result.info && Object.keys(result.info).length > 0 && (
													<a
														style={{
															height: "20px",
															width: "20px",
															border: "1px solid #638DFF",
															backgroundColor: "#FFFFFF",
															borderRadius: "50%",
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															color: "#638DFF",
															cursor: "pointer",
														}}
														onClick={() => {
															this.showMoreInfo(result.info, result.text);
														}}
													>
														i
													</a>
												)}
											</div>
										))}
									</div>
								</div>
							) : null}
						</div>
					</div>
					<ErrorMessage element={element} />
					{moreInfo && (
						<ModalPopup
							onClose={this.hideMoreInfo}
							size="sm"
							title={moreInfoTitle}
						>
							<div className="rounded">
								<div className="d-flex justify-content-between my-1">
									<div>{moreInfo}</div>
								</div>
								{/* <div>
                {Object.keys(moreInfo).map((key) => {
                  return (
                    <div
                      className="d-flex justify-content-between my-1"
                      key={key}
                    >
                      <div style={{ fontWeight: "bold" }}>{key}</div>
                      <div>{moreInfo[key]}</div>
                    </div>
                  );
                })}
              </div> */}
							</div>
						</ModalPopup>
					)}
				</div>
			);
		return content;
	}
}

export default LookUpField;
