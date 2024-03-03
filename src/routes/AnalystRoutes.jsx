/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
import { Navigate } from "react-router";
import { AuthContext } from "Context/Auth";
import metadataJSON from "Utils/metadata.json";

const InvestorRoute = ({ path, children }) => {
	const Auth = React.useContext(AuthContext);

	const { isAuthenticated, role } = Auth?.state;
	React.useEffect(() => {
		const metadata = metadataJSON[path ?? "/"];
		if (metadata !== undefined) {
			document.title = metadata?.title
				? metadata?.title
				: "Sport Analyst";
		} else {
			document.title = "Sport Analyst";
		}
	}, [path]);

	return (
		<>
			{isAuthenticated ? (
				<>{children}</>
			) : (
				<Navigate to="/analyst/login" replace />
			)}
		</>
	);
};

export default React.memo(InvestorRoute);
