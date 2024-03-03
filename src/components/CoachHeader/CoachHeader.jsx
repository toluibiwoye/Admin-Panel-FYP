/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PiUsersThreeFill } from "react-icons/pi";
import SDK from "Utils/SDK";
import { MdDashboard } from "react-icons/md";
import { BiStats } from "react-icons/bi";
import { FaRunning } from "react-icons/fa";
import { GlobalContext } from "Context/Global";
import { AuthContext, tokenExpireError } from "Context/Auth";
let sdk = new SDK();

const NAV_ITEMS = [
	{
		to: "/coach/dashboard",
		text: "Dashboard",
		icon: <MdDashboard className="text-xl text-[#A8A8A8]" />,
		value: "coach",
	},
	{
		to: "/coach/athletes",
		text: "Athletes",
		icon: <FaRunning className="text-xl text-[#A8A8A8]" />,
		value: "athletes",
	},
	{
		to: "/coach/stats",
		text: "Stats",
		icon: <BiStats className="text-xl text-[#A8A8A8]" />,
		value: "stats",
	},
];

export const CoachHeader = () => {
	const {
		state: { isOpen, path },
		dispatch: gobalDispatch,
	} = React.useContext(GlobalContext);
	const { state: authState, dispatch } = React.useContext(AuthContext);
	const [openDropdown, setOpenDropdown] = React.useState(false);
	const [isHovering, setIsHovering] = React.useState(false);

	// const handleMouseOver = () => {
	//   setIsHovering(true);
	// };

	// const handleMouseOut = () => {
	//   setIsHovering(false);
	// };
	let toggleOpen = (open) => {
		gobalDispatch({
			type: "OPEN_SIDEBAR",
			payload: { isOpen: open },
		});
	};

	React.useEffect(() => {
		async function fetchData() {
			try {
				const result = await sdk.getProfile();
				dispatch({
					type: "UPDATE_PROFILE",
					payload: result,
				});
			} catch (error) {
				console.log("Error", error);
				tokenExpireError(
					dispatch,
					error.response.data.message
						? error.response.data.message
						: error.message
				);
			}
		}

		fetchData();
	}, []);
	// sidebar-holder
	return (
		<>
			<div
				className={`z-50 flex max-h-screen flex-1 flex-col border border-[#E0E0E0] bg-white py-4 text-[#A8A8A8] transition-all ${
					isOpen
						? "fixed h-screen w-[15rem] min-w-[15rem] max-w-[15rem] md:relative"
						: "relative min-h-screen w-[4.2rem] min-w-[4.2rem] max-w-[4.2rem] bg-black text-white"
				} `}
			>
				<div
					className={`text-[#393939] ${
						isOpen
							? "flex w-full"
							: "flex items-center justify-center"
					} `}
				>
					<div></div>
					{isOpen && (
						<div className="text-2xl font-bold">
							<Link to="/">
								<h4 className="flex cursor-pointer items-center px-4 pb-4 font-sans font-bold">
									Sport Analysis
								</h4>
							</Link>
						</div>
					)}
				</div>

				<div className="h-fit w-auto flex-1">
					<div className="sidebar-list w-auto">
						<ul className="flex flex-wrap gap-4 px-4 text-sm">
							{NAV_ITEMS.map((item) => (
								<li
									className="block w-full list-none"
									key={item.value}
								>
									<NavLink
										to={item.to}
										className={`${
											path == item.value
												? "active-nav"
												: ""
										}`}
									>
										<div className="flex items-center gap-3">
											{item.icon}
											{isOpen && <span>{item.text}</span>}
										</div>
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="flex justify-end">
					<div className="mr-3 cursor-pointer rounded-lg border border-[#E0E0E0] bg-white p-2 text-2xl text-gray-400">
						<span onClick={() => toggleOpen(!isOpen)}>
							<svg
								className={`transition-transform ${
									!isOpen ? "rotate-180" : ""
								}`}
								xmlns="http:www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM10.4142 11L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.82322 10.7626C7.13981 11.446 7.13981 12.554 7.82322 13.2374L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H10.4142Z"
									fill="#A8A8A8"
								/>
							</svg>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default CoachHeader;
