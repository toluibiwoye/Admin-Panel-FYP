import React, { useReducer } from "react";

/**
 * @typedef {Object} GlobalState
 * @property {string} globalMessage - Toast Message.
 * @property {"success"| "error" | "warning"} toastStatus - Toast State - "success" | "error" | "warning".
 * @property {boolean} isOpen
 * @property {string} path
 * @property {any} projectRow
 */

/**
 * The Value of the Global State .
 * @param {GlobalState} initialState
 */

const initialState = {
	globalMessage: "",
	toastStatus: "success",
	isOpen: true,
	showBackButton: false,
	path: "",
	projectRow: null,
	leftPanel: [],
	middlePanel: [],
	rightPanel: {},
	selectedComponent: 0,
	rightComponentId: "",
	selectedPageComponent: 0,
	rooms: [],
};

export const GlobalContext = React.createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case "SNACKBAR":
			return {
				...state,
				globalMessage: action.payload.message,
				toastStatus: action.payload.toastStatus,
			};
		case "SETPATH":
			return {
				...state,
				path: action.payload.path,
			};
		case "OPEN_SIDEBAR":
			return {
				...state,
				isOpen: action.payload.isOpen,
			};
		case "SHOW_BACKBUTTON":
			return {
				...state,
				showBackButton: action.payload.showBackButton,
			};
		case "SET_PROJECT_ROW":
			return {
				...state,
				projectRow: action.payload,
			};
		case "SET_LEFT_PANEL":
			return {
				...state,
				leftPanel: action.payload,
			};
		case "SET_MIDDLE_PANEL":
			return {
				...state,
				middlePanel: action.payload,
			};
		case "SET_RIGHT_PANEL":
			return {
				...state,
				rightPanel: action.payload,
				rightComponentId: action.rightComponentId,
			};
		case "SET_SELECTED_COMPONENT":
			return {
				...state,
				selectedComponent: action.payload,
			};
		case "SET_SELECTED_PAGE_COMPONENT":
			return {
				...state,
				selectedPageComponent: action.payload,
			};
		case "SETROOM":
			const existingRoom = state.rooms.find(
				(rooms) => rooms.position === action.payload.position
			);
			if (existingRoom) {
				// Update the item in the array
				const updatedItems = [...state?.rooms];
				updatedItems[action.payload.position] = {
					position: action.payload.position,
					value: action.payload.value,
				};
				return {
					...state,

					rooms: updatedItems,
				};
			} else {
				return {
					...state,
					rooms: [...state?.rooms, action.payload],
				};
			}
		case "SET_GLOBAL_PROPERTY":
			if (action.property.includes(".")) {
				const [prop, field] = action.property.split(".");
				return {
					...state,
					[prop]: { ...state[prop], [field]: action?.payload },
				};
			} else {
				return {
					...state,
					[action.property]: action?.payload,
				};
			}
		case "REQUEST_LOADING":
			return {
				...state,
				[action.item]: {
					...state[action?.item],
					loading: action?.payload,
				},
			};
		case "REQUEST_SUCCESS":
			return {
				...state,
				[action.item]: {
					...state[action?.item],
					...action?.payload,
					data: {
						...state[action?.item]?.data,
						...action?.payload?.data,
					},
					error: false,
					success: true,
					loading: false,
				},
			};
		case "REQUEST_FAILED":
			return {
				...state,
				[action.item]: {
					...state[action?.item],
					...action?.payload,
					error: true,
					success: false,
					loading: false,
				},
			};
		default:
			return state;
	}
};

/**
 * @param {"success"| "error" | "warning"} toastStatus
 * @param {any} dispatch
 * @param {string} message
 * @param {number} timeout
 */

export const showToast = (
	dispatch,
	message,
	timeout = 3000,
	toastStatus = "success"
) => {
	dispatch({
		type: "SNACKBAR",
		payload: {
			message,
			toastStatus,
		},
	});

	setTimeout(() => {
		dispatch({
			type: "SNACKBAR",
			payload: {
				message: "",
			},
		});
	}, timeout);
};

export const setGlobalProjectRow = (dispatch, data) => {
	dispatch({
		type: "SET_PROJECT_ROW",
		payload: data,
	});
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	// React.useEffect(() => {

	// }, []);

	return (
		<GlobalContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
