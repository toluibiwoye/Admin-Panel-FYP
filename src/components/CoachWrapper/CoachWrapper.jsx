/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Suspense, memo } from "react";

import { CoachHeader } from "Components/CoachHeader";
import { TopHeader } from "Components/TopHeader";
import { Spinner } from "Assets/svgs";

const CoachWrapper = ({ children }) => {
	return (
		<div
			id="startup_wrapper"
			className={`flex w-full max-w-full flex-col bg-white`}
		>
			<div className={`flex min-h-screen w-full max-w-full `}>
				<CoachHeader />
				<div className={`mb-20 w-full overflow-hidden`}>
					<TopHeader />
					<Suspense
						fallback={
							<div
								className={`flex h-screen w-full items-center justify-center`}
							>
								<Spinner size={100} color="#2CC9D5" />
							</div>
						}
					>
						<div className="w-full overflow-y-auto overflow-x-hidden">
							{children}
						</div>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default memo(CoachWrapper);
