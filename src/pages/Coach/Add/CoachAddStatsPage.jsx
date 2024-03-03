/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SDK from "Utils/SDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "Context/Global";
import { tokenExpireError } from "Context/Auth";
const CoachAddStatsPage = () => {
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [athletes, setAthletes] = React.useState([]);

	const schema = yup
		.object({
			user_id: yup.string().required(),
			physicals: yup.string().required(),
			strength: yup.string().required(),
			speed: yup.string().required(),
			stamina: yup.string().required(),
		})
		.required();

	const { dispatch } = React.useContext(GlobalContext);
	const { dispatch: globalDispatch } = React.useContext(GlobalContext);

	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		let sdk = new SDK();
		setIsUpdating(true);
		try {
			const result = await sdk.callRawAPI(
				"/api/v1/users/stats",
				{
					user_id: data.user_id,
					physicals: data.physicals,
					strength: data.strength,
					speed: data.speed,
					stamina: data.stamina,
				},
				"POST"
			);
			if (!result.error) {
				navigate("/coach/stats");
				showToast(globalDispatch, "Added");
			} else {
				if (result.validation) {
					const keys = Object.keys(result.validation);
					for (let i = 0; i < keys.length; i++) {
						const field = keys[i];
						setError(field, {
							type: "manual",
							message: result.validation[field],
						});
					}
				}
			}
		} catch (error) {
			console.log("Error", error);
			setError("subject", {
				type: "manual",
				message: error.message,
			});
			tokenExpireError(dispatch, error.message);
		}
		setIsUpdating(false);
	};

	React.useEffect(() => {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "email",
			},
		});
		(async () => {
			let sdk = new SDK();
			const athletesResult = await sdk.callRawAPI(
				"/api/v1/users/athletes",
				{},
				"GET"
			);

			const statsResult = await sdk.callRawAPI(
				"/api/v1/users/stats",
				{},
				"GET"
			);

			const { list: athletes } = athletesResult;
			const { statsList } = statsResult;

			// Filter out athletes whose IDs exist in statsList
			const filteredAthletes = athletes.filter(
				(athlete) =>
					!statsList.some((stat) => stat.user_id === athlete.id)
			);

			setAthletes(filteredAthletes);
		})();
	}, []);

	return (
		<div className="mx-auto  rounded">
			<div
				className={`flex items-center justify-between gap-4 border-b border-b-[#E0E0E0] p-3`}
			>
				<div className="flex items-center gap-3">
					<svg
						// onClick={() => setSidebar(false)}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
					>
						<path
							d="M14.3322 5.83203L19.8751 11.3749C20.2656 11.7654 20.2656 12.3986 19.8751 12.7891L14.3322 18.332M19.3322 12.082H3.83218"
							stroke="#A8A8A8"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-lg font-semibold">Add Stats</span>
				</div>
				<div className="flex items-center gap-4">
					{/* <button
						className="flex items-center rounded-md border border-[#C6C6C6] px-3 py-2 shadow-sm hover:bg-[#F4F4F4]"
						// onClick={() => setSidebar(false)}
					>
						Cancel
					</button> */}
					<button
						className="flex items-center rounded-md bg-[#4F46E5] px-3 py-2 text-white shadow-sm"
						onClick={async () => {
							await handleSubmit(onSubmit)();
							// setSidebar(false);
						}}
						disabled={isUpdating}
					>
						{isUpdating ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
			{/* <h4 className="text-2xl font-medium">Add Email</h4> */}
			<form
				className=" w-full max-w-lg p-4 text-left"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="mb-4">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="athletes"
					>
						Athlete
					</label>
					{/* <input
						type="text"
						placeholder="Physical"
						{...register("physicals")}
						className={`focus:shadow-outline } w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow
focus:outline-none`}
					/> */}
					<select {...register("user_id")} id="athletes">
						<option value="">Select Athlete</option>
						{athletes.map((athlete) => {
							return (
								<option key={athlete.id} value={athlete.id}>
									{athlete.email}
								</option>
							);
						})}
					</select>
				</div>

				<div className="mb-4">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="physical"
					>
						Physicals
					</label>
					<input
						type="text"
						placeholder="Physical"
						{...register("physicals")}
						className={`focus:shadow-outline } w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow
focus:outline-none`}
					/>
				</div>
				<div className="mb-4">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="stamina"
					>
						Stamina
					</label>
					<input
						type="text"
						placeholder="stamina"
						{...register("stamina")}
						className={`focus: shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
							errors.stamina?.message ? "border-red-500" : ""
						} `}
					/>
					<p className="text-xs italic text-red-500">
						{errors.stamina?.message}
					</p>
				</div>
				<div className="mb-4">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="speed"
					>
						Speed
					</label>
					<input
						type="text"
						placeholder="speed"
						{...register("speed")}
						className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
							errors.speed?.message ? "border-red-500" : ""
						} `}
					/>
					<p className="text-xs italic text-red-500">
						{errors.speed?.message}
					</p>
				</div>
				<div className="mb-4">
					<label
						className="mb-2 block text-sm font-bold text-gray-700"
						htmlFor="strength"
					>
						Strength
					</label>
					<input
						placeholder="Strength"
						className={`focus:shadow-outline mb-3 w-full  appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
							errors.strength?.message ? "border-red-500" : ""
						}`}
						{...register("strength")}
						rows={15}
					/>
					<p className="text-xs italic text-red-500">
						{errors.strength?.message}
					</p>
				</div>
				{/* <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button> */}
			</form>
		</div>
	);
};

export default CoachAddStatsPage;
