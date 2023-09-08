import React, { PureComponent } from "react";

class TableMessageRow extends PureComponent {
	render() {
		let { data } = this.props;
		let keys = Object.keys(data);

		return (
			<div className="p-2">
				<table className="table">
					<tbody>
						{keys.map((key) => {
							return (
								<tr>
									<td
										style={{
											fontSize: "16px",
											fontWeight: "bold",
											color: "#4A4A4A",
											borderTop: 0,
											borderBottom: "1px solid #F4F4F4",
										}}
									>
										{key}
									</td>
									<td
										style={{
											fontSize: "16px",
											color: "#4A4A4A",
											borderTop: 0,
											borderBottom: "1px solid #F4F4F4",
											textAlign: "right",
										}}
									>
										{data[key].toString()}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TableMessageRow;
