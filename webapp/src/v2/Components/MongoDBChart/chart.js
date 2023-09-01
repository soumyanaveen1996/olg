import React, { useEffect, useState } from "react";
import MongoDBChart from "./MongoDBChart";
import { useSelector } from "react-redux";

const Chart = ({ message }) => {
	const { dashboardId, userDomain } = message[0];
	const [data, setData] = useState([]);
	const { sessionId } = useSelector((state) => state.user.auth);
	useEffect(() => {
		const url =
			"https://gwdev.frontm.ai/grpc/user.UserService/GetMongoDashboardData";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				sessionId: sessionId,
			},
			body: JSON.stringify({
				dashboardId: dashboardId,
				userDomain: userDomain,
				tokenPayload: JSON.stringify({ userDomain: userDomain }),
			}),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson);
			});
	}, []);
	return (
		<div>
			<h1 />
			{data && (
				<MongoDBChart
					chartId={data?.mongoDashboardId}
					baseUri={data?.mongoDashboardUrl}
					token={data?.token}
				/>
			)}
		</div>
	);
};
export default Chart;
