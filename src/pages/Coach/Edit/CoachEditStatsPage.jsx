/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SDK from "Utils/SDK";
import { GlobalContext, showToast } from "Context/Global";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, tokenExpireError } from "Context/Auth";

let sdk = new SDK();

const CoachEditStatsPage = () => {
	const schema = yup
		.object({
			// user_id: yup.string().required(),
			physicals: yup.string().required(),
			strength: yup.string().required(),
			speed: yup.string().required(),
			stamina: yup.string().required(),
		})
		.required();
	const { dispatch } = React.useContext(AuthContext);
	const { dispatch: globalDispatch } = React.useContext(GlobalContext);
	const navigate = useNavigate();
	const [id, setId] = useState(0);
	// const [slug, setSlug] = useState("");
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const params = useParams();

	useEffect(function () {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "stats",
			},
		});

		(async function () {
			try {
				const result = await sdk.callRawAPI(
					`/api/v1/users/stats/${Number(params?.id)}`,
					{},
					"GET"
				);
				if (!result.error) {
					setValue("physicals", result.model.physicals);
					setValue("strength", result.model.strength);
					setValue("stamina", result.model.stamina);
					setValue("speed", result.model.speed);
					setId(result.model.id);
				}
			} catch (error) {
				console.log("error", error);
				tokenExpireError(dispatch, error.message);
			}
		})();
	}, []);

	const onSubmit = async (data) => {
		try {
			const result = await sdk.callRawAPI(
				`/api/v1/users/stats/${Number(params?.id)}`,
				{
					statId: id,
					user_id: Number(params?.id),
					physicals: data.physicals,
					strength: data.strength,
					speed: data.speed,
					stamina: data.stamina,
				},
				"PUT"
			);

			if (!result.error) {
				showToast(globalDispatch, "Updated");
				navigate("/coach/stats");
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
			setError("physicals", {
				type: "manual",
				message: error.message,
			});
			tokenExpireError(dispatch, error.message);
		}
	};

	return (
		<div className=" mx-auto rounded   p-5 shadow-md">
			<h4 className="text-2xl font-medium">Edit Stats</h4>
			<form
				className=" w-full max-w-lg"
				onSubmit={handleSubmit(onSubmit)}
			>
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
				<button
					type="submit"
					className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CoachEditStatsPage;
