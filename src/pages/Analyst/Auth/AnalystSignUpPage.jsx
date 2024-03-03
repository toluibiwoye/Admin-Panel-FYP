import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SDK from "Utils/SDK";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InteractiveButton } from "Components/InteractiveButton";
import { AuthContext } from "Context/Auth";
import { GlobalContext, showToast } from "Context/Global";
import { LoginBgNew } from "Assets/images";

let sdk = new SDK();

const AnalystSignUpPage = () => {
	const schema = yup
		.object({
			email: yup.string().email().required(),
			password: yup.string().required(),
		})
		.required();

	const { dispatch } = React.useContext(AuthContext);
	const { dispatch: GlobalDispatch } = React.useContext(GlobalContext);

	const [submitLoading, setSubmitLoading] = useState(false);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const redirect_uri = searchParams.get("redirect_uri");

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
		try {
			setSubmitLoading(true);
			const result = await sdk.register(
				data.email,
				data.password,
				"analyst"
			);
			if (!result.error) {
				dispatch({
					type: "LOGIN",
					payload: result,
				});
				showToast(
					GlobalDispatch,
					"Succesfully Registered",
					4000,
					"success"
				);
				navigate(redirect_uri ?? "/analyst/dashboard");
			} else {
				setSubmitLoading(false);
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
			setSubmitLoading(false);
			console.log("Error", error);
			showToast(GlobalDispatch, error?.message, 4000, "error");
			setError("email", {
				type: "manual",
				message: error?.response?.data?.message
					? error?.response?.data?.message
					: error?.message,
			});
		}
	};

	return (
		<div className="m-auto h-screen max-h-screen min-h-screen">
			<div className="flex h-full max-h-full min-h-full w-full justify-center">
				<section className="flex w-full flex-col items-center justify-center bg-white md:w-1/2">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-[9.375rem] flex w-full max-w-md flex-col px-6"
					>
						<h1 className="mb-8 text-center text-3xl font-semibold md:text-5xl md:font-bold">
							Register
						</h1>
						<div className="mb-4">
							<label
								className="mb-2 block text-sm font-bold text-gray-700"
								htmlFor="email"
							>
								Email
							</label>

							<input
								type="email"
								autoComplete="off"
								placeholder="Email"
								{...register("email")}
								className={`focus:shadow-outline mb-3 w-full resize-none appearance-none rounded border-2 bg-transparent p-2 px-4 py-2 leading-tight  text-gray-700 shadow focus:outline-none active:outline-none ${
									errors.email?.message
										? "border-red-500"
										: ""
								}`}
							/>
							<p className="text-xs italic text-red-500">
								{errors.email?.message}
							</p>
						</div>

						<div className="mb-6">
							<label
								className="mb-2 block text-sm font-bold text-gray-700"
								htmlFor="password"
							>
								Password
							</label>
							<input
								autoComplete="off"
								type="password"
								name="password"
								placeholder="Password"
								{...register("password")}
								className={`focus:shadow-outline mb-3 w-full flex-grow appearance-none rounded border-2 p-2 px-4 py-2 leading-tight text-gray-700 shadow focus:outline-none active:outline-none ${
									errors.password?.message
										? "border-red-500"
										: ""
								}`}
							/>
							<button
								type="button"
								className="absolute right-1 top-[20%]"
							>
								<img
									src="/invisible.png"
									alt=""
									className="mr-2 w-6"
								/>
							</button>
							<p className="text-xs italic text-red-500">
								{errors.password?.message}
							</p>
						</div>

						{/* <Link className={`self-end mb-6 font-semibold text-sm bg-clip-text bg-gradient-to-l from-[#33d4b7_9.11%] to-[#0d9895_69.45%] text-transparent`} to="/admin/forgot">Forgot Password</Link> */}

						<InteractiveButton
							type="submit"
							className={`flex items-center justify-center rounded bg-gradient-to-l from-[#33d4b7_9.11%] to-[#0d9895_69.45%] py-2 tracking-wide text-white outline-none  focus:outline-none`}
							loading={submitLoading}
							disabled={submitLoading}
						>
							<span>Register</span>
						</InteractiveButton>
					</form>

					{/* <div className="text-center my-6 hr">OR</div> */}
					<div className="oauth flex w-full max-w-md grow flex-col gap-4 px-6 text-[#344054]">
						<div>
							<h3 className="mt-5 text-center text-sm normal-case text-gray-800">
								Already have an account?{" "}
								<Link
									className="my-text-gradient mb-8 self-end text-sm font-semibold"
									to="/analyst/login"
								>
									Login{" "}
								</Link>{" "}
							</h3>
						</div>
					</div>
					{/* <div className={ `h-auto w-full` }></div> */}
				</section>
				<section
					className="hidden w-1/2 md:block"
					style={{
						backgroundImage: `url(${LoginBgNew})`,
						backgroundSize: "cover",
						backgroundPosition: "center center",
					}}
				></section>
			</div>
		</div>
	);
};

export default AnalystSignUpPage;
