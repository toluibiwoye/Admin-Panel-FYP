/* eslint-disable react-refresh/only-export-components */
import React from "react";
import metadataJSON from "Utils/metadata.json";

function PublicRoute({ element, path }) {
	React.useEffect(() => {
		const metadata = metadataJSON[path ?? "/"];
		if (!(metadata == null)) {
			document.title = metadata.title;
		} else {
			document.title = "Sport Analyst";
		}
	}, [path]);

	return <>{element}</>;
}

export default React.memo(PublicRoute);
