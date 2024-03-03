import React, { Suspense, memo } from "react";
import { PublicHeader } from "Components/PublicHeader";
import { Spinner } from "Assets/svgs";

const PublicWrapper = ({ children }) => {
	return (
		<div className={`flex w-full flex-col`}>
			<PublicHeader />
			<div className={`min-h-screen grow`}>
				<Suspense
					fallback={
						<div
							className={`flex h-screen w-full items-center justify-center`}
						>
							<Spinner size={100} color="#2CC9D5" />
						</div>
					}
				>
					{children}
				</Suspense>
			</div>
			{/* <Footer /> */}
		</div>
	);
};

export default memo(PublicWrapper);
