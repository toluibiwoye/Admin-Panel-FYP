/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";
import SDK from "Utils/SDK";

let sdk = new SDK();

const CoachDashboardPage = () => {
	const { dispatch } = React.useContext(AuthContext);
	const { dispatch: globalDispatch } = React.useContext(GlobalContext);
	const [totalPlayers, setTotalPlayers] = useState(0);
	const [totalStats, setTotalStats] = useState(0);
	const [playersWithoutStats, setPlayersWithoutStats] = useState(0);

	useEffect(() => {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "coach",
			},
		});

		(async () => {
			try {
				const totalPlayersData = await sdk.callRawAPI(
					"/api/v1/users/athletes",
					{},
					"GET"
				);
				const totalStatsData = await sdk.callRawAPI(
					"/api/v1/users/stats",
					{},
					"GET"
				);

				const { list, error } = totalPlayersData;
				const { list: list2, error2 } = totalStatsData;

				if (!error && !error2) {
					const playersWithoutStatsData =
						totalPlayersData.list.length -
						totalStatsData.list.length;

					setTotalPlayers(list.length);
					setTotalStats(list2.length);
					setPlayersWithoutStats(playersWithoutStatsData);
				}
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			}
		})();
	}, []);

	return (
		<div className="flex h-screen flex-col justify-start bg-gray-100 p-4">
			<h1 className="mb-8 text-4xl font-bold text-gray-800">Dashboard</h1>
			<div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-lg bg-white p-6 shadow-md">
					<h2 className="mb-4 text-lg font-semibold">
						Total Players
					</h2>
					<p className="text-2xl font-bold">{totalPlayers}</p>
				</div>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<h2 className="mb-4 text-lg font-semibold">Total Stats</h2>
					<p className="text-2xl font-bold">{totalStats}</p>
				</div>
				<div className="rounded-lg bg-white p-6 shadow-md">
					<h2 className="mb-4 text-lg font-semibold">
						Players Without Stats
					</h2>
					<p className="text-2xl font-bold">{playersWithoutStats}</p>
				</div>
			</div>
		</div>
	);
};

export default CoachDashboardPage;
