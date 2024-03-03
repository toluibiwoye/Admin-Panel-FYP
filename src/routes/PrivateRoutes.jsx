/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React from "react";
// import { Navigate } from "react-router-dom";
import { AuthContext } from "Context/Auth";
import { NotFound } from "./Routes";
import PublicRoute from "./PublicRoutes";
import CoachRoute from "./CoachRoutes";
import AnalystRoutes from "./AnalystRoutes";

const PrivateRoute = ({ path, element, access }) => {
	const Auth = React.useContext(AuthContext);

	if (Auth?.state?.isAuthenticated) {
		switch (true) {
			case Auth?.state?.role === "analyst" && access === "analyst":
				return <AnalystRoutes path={path}>{element}</AnalystRoutes>;
			case Auth?.state?.role === "coach" && access === "coach":
				return <CoachRoute path={path}>{element}</CoachRoute>;

			default:
				return <PublicRoute path={"*"} element={<NotFound />} />;
		}
	}
	if (!Auth?.state?.isAuthenticated) {
		return <PublicRoute path={"*"} element={<NotFound />} />;
	}
};

export default React.memo(PrivateRoute);
