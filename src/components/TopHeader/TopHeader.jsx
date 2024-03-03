import React, { useEffect, useState } from "react";
import { GlobalContext } from "Context/Global";
import { Link, useLocation } from "react-router-dom";
import { BackButton } from "Components/BackButton";
import { AuthContext } from "Context/Auth";
import { StringCaser } from "Utils/utils";

const TopHeader = () => {
	const { state: globalState, dispatch: globalDispatch } =
		React.useContext(GlobalContext);
	const { state, dispatch } = React.useContext(AuthContext);
	const [currentPath, setCurrentPath] = useState("");
	const { isOpen, showBackButton } = globalState;
	const location = useLocation();

	let toggleOpen = (open) => {
		dispatch({
			type: "OPEN_SIDEBAR",
			payload: { isOpen: open },
		});
	};

	useEffect(() => {
		const pathArr = location.pathname.split("/");
		if (pathArr[1] !== "user" && pathArr[1] !== "admin") {
			setCurrentPath(pathArr[1]);
		} else {
			setCurrentPath(pathArr[2]);
		}
	}, [location]);
	return (
		// <div className="cursor-pointer bg-white p-2 text-2xl text-gray-400 rounded-lg border border-[#E0E0E0] mr-3">
		//   <span onClick={() => toggleOpen(!isOpen)}>
		//     <svg className={`transition-transform ${ !isOpen ? "rotate-180" : "" } `} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		//       <path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM10.4142 11L11.7071 9.70711C12.0976 9.31658 12.0976 8.68342 11.7071 8.29289C11.3166 7.90237 10.6834 7.90237 10.2929 8.29289L7.82322 10.7626C7.13981 11.446 7.13981 12.554 7.82322 13.2374L10.2929 15.7071C10.6834 16.0976 11.3166 16.0976 11.7071 15.7071C12.0976 15.3166 12.0976 14.6834 11.7071 14.2929L10.4142 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H10.4142Z" fill="#A8A8A8" />
		//     </svg>

		//   </span>
		// </div>

		<div className="sticky right-0 top-0 z-20 flex h-14 max-h-14 w-full items-center justify-between bg-white px-6 py-4 shadow-sm">
			<div className="flex items-center gap-3">
				{showBackButton && <BackButton />}
				<h1 className="text-xl capitalize">
					{StringCaser(currentPath, {
						casetype: "capitalize",
						separator: " ",
					})}
				</h1>
			</div>
			<div className="flex items-center gap-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M5.04457 8.67345C5.5952 5.2596 8.542 2.75 12 2.75C15.4579 2.75 18.4047 5.2596 18.9554 8.67345L20.313 17.0908C20.4111 17.6987 19.9416 18.25 19.3258 18.25H4.67418C4.05836 18.25 3.58888 17.6987 3.68694 17.0908L5.04457 8.67345Z"
						fill="#F4F4F4"
					/>
					<path
						d="M16 18.25C15.3267 20.0159 13.7891 21.25 12 21.25C10.2108 21.25 8.67324 20.0159 7.99997 18.25M4.67418 18.25H19.3258C19.9416 18.25 20.4111 17.6987 20.313 17.0908L18.9554 8.67345C18.4047 5.2596 15.4579 2.75 12 2.75C8.542 2.75 5.5952 5.2596 5.04457 8.67345L3.68694 17.0908C3.58888 17.6987 4.05836 18.25 4.67418 18.25Z"
						stroke="#8D8D8D"
						strokeWidth="1.5"
					/>
				</svg>
				<div>
					<button className="peer">
						<img
							className="h-[40px] w-[40px] rounded-lg object-cover"
							src={state.userDetails?.photo}
							alt={`${state.userDetails?.firstName} ${state.userDetails?.lastName}`}
						/>
					</button>
					<ul className="absolute right-5 top-[80%] z-20 hidden rounded-lg border border-[#a8a8a8] bg-white p-2 text-sm text-[#525252] shadow-md hover:block focus:block peer-focus:block peer-focus-visible:block">
						<li>
							<Link
								className="hover:text[#262626] flex cursor-pointer items-center rounded-md px-4 py-3 hover:bg-[#F4F4F4]"
								to={`/${state.role}/profile`}
							>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
									>
										<path
											d="M13.3333 5.41666C13.3333 7.25761 11.8409 8.74999 9.99997 8.74999C8.15902 8.74999 6.66664 7.25761 6.66664 5.41666C6.66664 3.57571 8.15902 2.08332 9.99997 2.08332C11.8409 2.08332 13.3333 3.57571 13.3333 5.41666Z"
											fill="#A8A8A8"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M9.99997 2.49999C8.38914 2.49999 7.08331 3.80583 7.08331 5.41666C7.08331 7.02749 8.38914 8.33332 9.99997 8.33332C11.6108 8.33332 12.9166 7.02749 12.9166 5.41666C12.9166 3.80583 11.6108 2.49999 9.99997 2.49999ZM6.24997 5.41666C6.24997 3.34559 7.9289 1.66666 9.99997 1.66666C12.071 1.66666 13.75 3.34559 13.75 5.41666C13.75 7.48772 12.071 9.16666 9.99997 9.16666C7.9289 9.16666 6.24997 7.48772 6.24997 5.41666Z"
											fill="#A8A8A8"
										/>
										<path
											d="M9.99997 10.4167C6.27535 10.4167 3.66126 13.3457 3.33331 17.0833H16.6666C16.3387 13.3457 13.7246 10.4167 9.99997 10.4167Z"
											fill="#A8A8A8"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M3.80032 16.6667H16.1996C15.725 13.323 13.3164 10.8333 9.99997 10.8333C6.68352 10.8333 4.27494 13.323 3.80032 16.6667ZM2.91823 17.0469C3.26095 13.1409 6.01533 9.99999 9.99997 9.99999C13.9846 9.99999 16.739 13.1409 17.0817 17.0469L17.1215 17.5H2.87848L2.91823 17.0469Z"
											fill="#A8A8A8"
										/>
									</svg>
								</span>
								<span>Account</span>
							</Link>
						</li>
						<li>
							<Link
								className="hover:text[#262626] group flex cursor-pointer items-center rounded-md px-4 py-3 hover:bg-[#F4F4F4] hover:text-red-500"
								to={`/${state.role}/login`}
								onClick={() =>
									dispatch({
										type: "LOGOUT",
									})
								}
							>
								<span className="mr-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
									>
										<path
											className="group-hover:fill-[#ef4444] group-hover:stroke-[#ef4444]"
											fillRule="evenodd"
											clipRule="evenodd"
											d="M3.75 3.33333C3.51988 3.33333 3.33333 3.51988 3.33333 3.75L3.33333 16.25C3.33333 16.4801 3.51988 16.6667 3.75 16.6667H9.58333C9.81345 16.6667 10 16.8532 10 17.0833C10 17.3135 9.81345 17.5 9.58333 17.5H3.75C3.05964 17.5 2.5 16.9404 2.5 16.25L2.5 3.75C2.5 3.05964 3.05964 2.5 3.75 2.5L9.58333 2.5C9.81345 2.5 10 2.68655 10 2.91667C10 3.14679 9.81345 3.33333 9.58333 3.33333L3.75 3.33333ZM13.0387 5.95537C13.2014 5.79265 13.4652 5.79265 13.628 5.95537L17.378 9.70536C17.5407 9.86808 17.5407 10.1319 17.378 10.2946L13.628 14.0446C13.4652 14.2073 13.2014 14.2073 13.0387 14.0446C12.876 13.8819 12.876 13.6181 13.0387 13.4554L16.0774 10.4167L7.91667 10.4167C7.68655 10.4167 7.5 10.2301 7.5 9.99999C7.5 9.76987 7.68655 9.58332 7.91667 9.58332L16.0774 9.58332L13.0387 6.54463C12.876 6.38191 12.876 6.11809 13.0387 5.95537Z"
											fill="#A8A8A8"
											stroke="#A8A8A8"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</span>
								<span>Logout</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TopHeader;
