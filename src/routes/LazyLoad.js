import { lazy } from "react";

/*
COACH ROUTES
*/
export const CoachLoginPage = lazy(() => {
	const __import = import("../pages/Coach/Auth/CoachLoginPage");
	__import.finally(() => {});
	return __import;
});

export const CoachSignUpPage = lazy(() => {
	const __import = import("../pages/Coach/Auth/CoachSignUpPage");
	__import.finally(() => {});
	return __import;
});

export const CoachDashboard = lazy(() => {
	const __import = import("../pages/Coach/View/CoachDashboard");
	__import.finally(() => {});
	return __import;
});

export const CoachProfilePage = lazy(() => {
	const __import = import("../pages/Coach/View/CoachProfilePage");
	__import.finally(() => {});
	return __import;
});

export const CoachListAthletesPage = lazy(() => {
	const __import = import("../pages/Coach/List/CoachListAthletesPage");
	__import.finally(() => {});
	return __import;
});

export const CoachListStatsPage = lazy(() => {
	const __import = import("../pages/Coach/List/CoachListStatsPage");
	__import.finally(() => {});
	return __import;
});

export const CoachAddStatsPage = lazy(() => {
	const __import = import("../pages/Coach/Add/CoachAddStatsPage");
	__import.finally(() => {});
	return __import;
});

export const CoachEditStatsPage = lazy(() => {
	const __import = import("../pages/Coach/Edit/CoachEditStatsPage");
	__import.finally(() => {});
	return __import;
});
/*
END COACH ROUTES
*/

/*
Analyst ROUTES
*/
export const AnalystLoginPage = lazy(() => {
	const __import = import("../pages/Analyst/Auth/AnalystLoginPage");
	__import.finally(() => {});
	return __import;
});

export const AnalystSignUpPage = lazy(() => {
	const __import = import("../pages/Analyst/Auth/AnalystSignUpPage");
	__import.finally(() => {});
	return __import;
});

export const AnalystDashboard = lazy(() => {
	const __import = import("../pages/Analyst/View/AnalystDashboard");
	__import.finally(() => {});
	return __import;
});

export const AnalystProfilePage = lazy(() => {
	const __import = import("../pages/Analyst/View/AnalystProfilePage");
	__import.finally(() => {});
	return __import;
});

export const AnalystListAthletesPage = lazy(() => {
	const __import = import("../pages/Analyst/List/AnalystListAthletesPage");
	__import.finally(() => {});
	return __import;
});

export const AnalystListStatsPage = lazy(() => {
	const __import = import("../pages/Analyst/List/AnalystListStatsPage");
	__import.finally(() => {});
	return __import;
});

export const AnalystAddStatsPage = lazy(() => {
	const __import = import("../pages/Analyst/Add/AnalystAddStatsPage");
	__import.finally(() => {});
	return __import;
});

export const AnalystEditStatsPage = lazy(() => {
	const __import = import("../pages/Analyst/Edit/AnalystEditStatsPage");
	__import.finally(() => {});
	return __import;
});
/*
END Analyst ROUTES
*/
