import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Interactions.css";
import { Scrollbars } from "react-custom-scrollbars-2";

const UserList = () => {
	return (
		<div
			className="Interactions-sidebar sidebar-sm bg-white b-r"
			id="sidebar-collapse"
		>
			<div className="navbar">
				<div className="search-collapse show">
					<form className="form-inline ml-1">
						<button
							className="no-padding bg-trans border0 text-muted"
							type="button"
						>
							<i className="icon-magnifier" />
						</button>
						<input
							className="form-control border0"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
					</form>
				</div>
			</div>
			<Scrollbars autohide style={{ height: "calc(100vh - 60px - 60px)" }}>
				<div className="Interactions-messages">
					<div className="">
						<div className="list">
							<div className="list-item">
								<a href="#" className="list-link" />
								<div className="list-thumb avatar32 bg-primary rounded-circle">
									{" "}
									MA{" "}
								</div>
								<div className="list-body">
									<div className="float-right text-muted">23M</div>
									<span className="list-title">John Doe</span>
									<span className="list-content">FrontM User</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Scrollbars>
			<div
				style={{ position: "inherit" }}
				className="sidebar-button-footer d-flex pl-3 pr-3 align-items-center justify-content-center"
			>
				<a href="#" className="btn btn-icon btn-new-chat">
					<i className="icon-pencil fs16" /> New Chat
				</a>
			</div>
		</div>
	);
};

UserList.propTypes = {};
export default UserList;
