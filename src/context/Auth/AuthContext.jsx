/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useReducer } from "react";
// import SDK from "Utils/SDK";
const initialState = {
	isAuthenticated: false,
	user: null,
	userDetails: {
		firstName: null,
		lastName: null,
		photo: null,
	},
	token: null,
	role: null,
	sessionExpired: null,
};
export const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("user", Number(action.payload?.user));
			localStorage.setItem("id", Number(action.payload?.user?.id));
			localStorage.setItem("token", action.payload?.token);
			localStorage.setItem("role", action.payload?.user?.role);
			return {
				...state,
				isAuthenticated: true,
				user: Number(localStorage.getItem("user")),
				token: localStorage.getItem("token"),
				role: localStorage.getItem("role"),
				userDetails: {
					firstName: action.payload?.first_name,
					lastName: action.payload?.last_name,
					photo: action.payload?.photo,
				},
			};
		case "UPDATE_PROFILE":
			return {
				...state,
				role: localStorage.getItem("role"),
				userDetails: {
					firstName: action.payload?.first_name,
					lastName: action.payload?.last_name,
					photo: action.payload?.photo,
				},
			};
		case "LOGOUT":
			localStorage.removeItem("user");
			localStorage.removeItem("token");
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		case "SESSION_EXPIRED":
			return {
				...state,
				sessionExpired: true,
			};
		default:
			return state;
	}
};

export const tokenExpireError = (dispatch, errorMessage) => {
	/**
	 * either this or we pass the role as a parameter
	 */
	const role = localStorage.getItem("role");
	if (errorMessage === "TOKEN_EXPIRED") {
		dispatch({ type: "SESSION_EXPIRED" });
		// dispatch({
		//   type: "LOGOUT",
		// });

		// location.href = "/" + role + "/login";
	}
};

const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	React.useEffect(() => {
		const id = localStorage.getItem("id");
		const token = localStorage.getItem("token");
		const role = localStorage.getItem("role");

		if (token) {
			(async function () {
				try {
					// const result = await sdk.check(role);
					dispatch({
						type: "LOGIN",
						payload: {
							user: {
								id: id,
								role: role,
							},
							token,
							// role: role,
						},
					});
				} catch (error) {
					if (role) {
						dispatch({
							type: "LOGOUT",
						});
						window.location.href = "/" + role + "/login";
					} else {
						dispatch({
							type: "LOGOUT",
						});
						window.location.href = "/";
					}
				}
			})();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
