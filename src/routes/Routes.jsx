/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { GlobalContext } from "Context/Global";

import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import { PublicWrapper } from "Components/PublicWrapper";
import { NotFoundPage } from "Pages/404";
import { SnackBar } from "Components/SnackBar";
import { SessionExpiredModal } from "Components/SessionExpiredModal";

// generatePagesRoutes\
import { CoachWrapper } from "Components/CoachWrapper";
import { AnalystWrapper } from "Components/AnalystWrapper";

import {
	CoachDashboard,
	CoachLoginPage,
	CoachSignUpPage,
	CoachProfilePage,
	CoachListAthletesPage,
	CoachListStatsPage,
	CoachAddStatsPage,
	CoachEditStatsPage,
	AnalystDashboard,
	AnalystLoginPage,
	AnalystSignUpPage,
	AnalystProfilePage,
	AnalystListAthletesPage,
	AnalystListStatsPage,
	AnalystAddStatsPage,
	AnalystEditStatsPage,
} from "./LazyLoad";

export const DynamicWrapper = ({ isAuthenticated, role, children }) => {
	if (!isAuthenticated) {
		return <PublicWrapper>{children}</PublicWrapper>;
	}
	if (isAuthenticated) {
		if (role === "coach") {
			return <CoachWrapper>{children}</CoachWrapper>;
		}

		if (role === "analyst") {
			return <AnalystWrapper>{children}</AnalystWrapper>;
		}
	}
};

export const NotFound = ({ isAuthenticated, role }) => {
	if (!isAuthenticated) {
		return (
			<PublicWrapper>
				<NotFoundPage />
			</PublicWrapper>
		);
	}
	if (isAuthenticated) {
		if (role === "coach") {
			return (
				<CoachWrapper>
					<NotFoundPage />
				</CoachWrapper>
			);
		}

		if (role === "analyst") {
			return (
				<AnalystWrapper>
					<NotFoundPage />
				</AnalystWrapper>
			);
		}
	}
};

export default () => {
	const { state } = useContext(AuthContext);
	const {
		state: { isOpen },
		dispatch,
	} = useContext(GlobalContext);
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	function setDimension(e) {
		if (e.currentTarget.innerWidth >= 1024) {
			toggleSideBar(true);
		} else toggleSideBar(false);
		setScreenSize(e.currentTarget.innerWidth);
	}

	// const toTop = () => {
	//   containerRef.current.scrollTo(0, 0);
	// };

	const toggleSideBar = (open) => {
		if (isOpen && screenSize < 1024) {
			dispatch({
				type: "OPEN_SIDEBAR",
				payload: { isOpen: open },
			});
		} else if (!isOpen && screenSize >= 1024) {
			dispatch({
				type: "OPEN_SIDEBAR",
				payload: { isOpen: open },
			});
		}
	};

	useEffect(() => {
		window.addEventListener("resize", setDimension);

		return () => {
			window.removeEventListener("resize", setDimension);
		};
	}, [screenSize]);

	return (
		<div
			onClick={() => {
				isOpen ? toggleSideBar(false) : null;
			}}
			className={`h-screen overflow-x-hidden bg-gradient-to-br from-[#FCF3F9] to-[#EAF8FB]`}
		>
			<Routes>
				<Route
					path="/coach/login"
					element={
						<PublicRoute
							path="/coach/login"
							element={
								<PublicWrapper>
									<CoachLoginPage />
								</PublicWrapper>
							}
						/>
					}
				/>

				<Route
					path="/coach/sign-up"
					element={
						<PublicRoute
							path="/coach/sign-up"
							element={
								<PublicWrapper>
									<CoachSignUpPage />
								</PublicWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/dashboard"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/dashboard"
							element={
								<CoachWrapper>
									<CoachDashboard />
								</CoachWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/profile"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/profile"
							element={
								<CoachWrapper>
									<CoachProfilePage />
								</CoachWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/athletes"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/athletes"
							element={
								<CoachWrapper>
									<CoachListAthletesPage />
								</CoachWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/stats"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/stats"
							element={
								<CoachWrapper>
									<CoachListStatsPage />
								</CoachWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/add-stats"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/add-stats"
							element={
								<CoachWrapper>
									<CoachAddStatsPage />
								</CoachWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/coach/edit-stats/:id"
					element={
						<PrivateRoute
							access="coach"
							path="/coach/edit-stats/:id"
							element={
								<CoachWrapper>
									<CoachEditStatsPage />
								</CoachWrapper>
							}
						/>
					}
				/>

				{/* ANALYST ROUTES */}

				<Route
					path="/analyst/login"
					element={
						<PublicRoute
							path="/analyst/login"
							element={
								<PublicWrapper>
									<AnalystLoginPage />
								</PublicWrapper>
							}
						/>
					}
				/>

				<Route
					path="/analyst/sign-up"
					element={
						<PublicRoute
							path="/analyst/sign-up"
							element={
								<PublicWrapper>
									<AnalystSignUpPage />
								</PublicWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/dashboard"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/dashboard"
							element={
								<AnalystWrapper>
									<AnalystDashboard />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/profile"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/profile"
							element={
								<AnalystWrapper>
									<AnalystProfilePage />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/athletes"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/athletes"
							element={
								<AnalystWrapper>
									<AnalystListAthletesPage />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/stats"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/stats"
							element={
								<AnalystWrapper>
									<AnalystListStatsPage />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/add-stats"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/add-stats"
							element={
								<AnalystWrapper>
									<AnalystAddStatsPage />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					exact
					path="/analyst/edit-stats/:id"
					element={
						<PrivateRoute
							access="analyst"
							path="/analyst/edit-stats/:id"
							element={
								<AnalystWrapper>
									<AnalystEditStatsPage />
								</AnalystWrapper>
							}
						/>
					}
				/>

				<Route
					path={"*"}
					element={
						<PublicRoute
							path={"*"}
							element={<NotFound {...state} />}
						/>
					}
				/>
			</Routes>
			<SessionExpiredModal />
			<SnackBar />
		</div>
	);
};
