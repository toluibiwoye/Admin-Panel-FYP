/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SDK from "Utils/SDK";
import { GlobalContext, showToast } from "Context/Global";
import { tokenExpireError } from "Context/Auth";
import { InteractiveButton } from "Components/InteractiveButton";
// import {ProgressBar} from "Components/ProgressBar";
import ModalPrompt from "Components/Modal/ModalPrompt";

let sdk = new SDK();

const AdminProfilePage = () => {
	const schema = yup
		.object({
			email: yup.string().email().required(),
		})
		.required();

	const { dispatch } = React.useContext(GlobalContext);
	const [oldEmail, setOldEmail] = useState("");
	const [fileObj, setFileObj] = React.useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isLastNameModalOpen, setIsLastNameModalOpen] = useState(false);
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
	const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
	const [oldPhoto, setOldPhoto] = useState("");
	const [uploadedPhoto, setUploadedPhoto] = useState("");
	const [submitLoading, setSubmitLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("Profile");
	const [defaultValues, setDefaultValues] = useState({});
	const { dispatch: globalDispatch } = React.useContext(GlobalContext);
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function fetchData() {
		try {
			const result = await sdk.getProfile();
			setDefaultValues(result);
			// console.log("fetch profile result");
			// console.log(result);
			setValue("email", result?.user.email);
			setValue("first_name", result?.user.firstName);
			setValue("last_name", result?.user.lastName);
			setValue("phone_numbeer", result?.user.phoneNumber);
			setOldEmail(result?.user.email);
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

	const onSubmit = async (data) => {
		setDefaultValues(data);
		try {
			setSubmitLoading(true);

			const result = await sdk.updateProfile({
				firstName: data.first_name || defaultValues?.first_name,
				lastName: data.last_name || defaultValues?.last_name,
				phoneNumber: data.phone_number || defaultValues?.phoneNumber,
			});

			if (!result.error) {
				showToast(dispatch, "Profile Updated", 4000);
				closeModal();
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
				closeModal();
			}
			if (oldEmail !== data.email) {
				const emailresult = await sdk.updateProfile({
					email: data.email,
				});
				if (!emailresult.error) {
					showToast(dispatch, "Email Updated", 1000);
				} else {
					if (emailresult.validation) {
						const keys = Object.keys(emailresult.validation);
						for (let i = 0; i < keys.length; i++) {
							const field = keys[i];
							setError(field, {
								type: "manual",
								message: emailresult.validation[field],
							});
						}
					}
				}
				closeModal();
			}

			if (data.password.length > 0) {
				const passwordresult = await sdk.updateProfile({
					password: data.password,
				});
				if (!passwordresult.error) {
					showToast(dispatch, "Password Updated", 2000);
				} else {
					if (passwordresult.validation) {
						const keys = Object.keys(passwordresult.validation);
						for (let i = 0; i < keys.length; i++) {
							const field = keys[i];
							setError(field, {
								type: "manual",
								message: passwordresult.validation[field],
							});
						}
					}
				}
			}
			await fetchData();
			setSubmitLoading(false);
		} catch (error) {
			setSubmitLoading(false);
			console.log("Error", error);
			setError("email", {
				type: "manual",
				message: error.response.data.message
					? error.response.data.message
					: error.message,
			});
			tokenExpireError(
				dispatch,
				error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	};

	React.useEffect(() => {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "profile",
			},
		});

		fetchData();
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openModalEdit = () => {
		setIsEditModalOpen(true);
	};

	const openLastNModal = () => {
		setIsLastNameModalOpen(true);
	};

	const openEmailModal = () => {
		setIsEmailModalOpen(true);
	};
	const openPhoneModal = () => {
		setIsPhoneModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsLastNameModalOpen(false);
		setIsEmailModalOpen(false);
		setIsPhoneModalOpen(false);
	};

	const handleDelete = async () => {
		try {
			setSubmitLoading(true);

			const result = await sdk.updateProfile({
				firstName: defaultValues?.first_name,
				lastName: defaultValues?.last_name,
				phoneNumber: defaultValues?.phone_number,
			});

			if (!result.error) {
				showToast(dispatch, "Profile Picture Deleted", 1000);
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
			await fetchData();
			setSubmitLoading(false);
			closeModal();
		} catch (error) {
			setSubmitLoading(false);
			console.log("Error", error);
		}
	};

	return (
		<div className="mt-6 w-10/12 rounded-md border">
			<div className="flex items-center border-b border-b-[#E0E0E0] px-8 py-3 text-[#8D8D8D]">
				<div className="flex items-center space-x-6">
					<div
						className={`cursor-pointer rounded-lg px-3 py-1 ${
							activeTab === "Profile"
								? "bg-[#f4f4f4] text-[#525252]"
								: ""
						} `}
						onClick={() => setActiveTab("Profile")}
					>
						Profile
					</div>
					<div
						className={`cursor-pointer rounded-lg px-3 py-1 ${
							activeTab === "Security"
								? "bg-[#f4f4f4] text-[#525252]"
								: ""
						} `}
						onClick={() => setActiveTab("Security")}
					>
						Security
					</div>
				</div>
			</div>
			<main>
				{/* Profile Tab */}
				{activeTab === "Profile" && (
					<div className="rounded bg-white">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mx-10 max-w-lg">
								<p className="mb-3	text-base	font-medium text-gray-900">
									Personal Details
								</p>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center gap-x-20">
										<p className="text-base	font-medium	text-gray-600">
											First Name
										</p>
										<p className="text-base	font-medium	text-gray-900">
											{defaultValues?.user?.firstName}
										</p>
									</div>
									<p
										className="cursor-pointer	text-base	font-semibold text-indigo-600"
										onClick={openModalEdit}
									>
										Edit
									</p>
								</div>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center gap-x-20">
										<p className="text-base	font-medium	text-gray-600">
											Last Name
										</p>
										<p className="text-base	font-medium	text-gray-900">
											{defaultValues?.user?.lastName}
										</p>
									</div>
									<p
										className="cursor-pointer	text-base	font-semibold text-indigo-600"
										onClick={openLastNModal}
									>
										Edit
									</p>
								</div>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center gap-x-20">
										<p className="text-base	font-medium	text-gray-600">
											Phone Number
										</p>
										<p className="text-base	font-medium	text-gray-900">
											{defaultValues?.user?.phoneNumber}
										</p>
									</div>
									<p
										className="cursor-pointer	text-base	font-semibold text-indigo-600"
										onClick={openPhoneModal}
									>
										Edit
									</p>
								</div>
								<div className="mb-6 flex items-center justify-between text-left">
									<div className="flex items-center gap-x-2">
										<p className="mr-28	text-base	font-medium text-gray-600">
											Email
										</p>
										<p className="text-base	font-medium	text-gray-900">
											{oldEmail}
										</p>
									</div>
									<p
										className="cursor-pointer	text-base	font-semibold text-indigo-600"
										onClick={openEmailModal}
									>
										Edit
									</p>
								</div>
							</div>
						</form>
					</div>
				)}

				{/* Security tab */}
				{activeTab === "Security" && (
					<div className="rounded bg-white px-10 py-6">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="max-w-lg"
						>
							<div className="">
								<div className="mb-6">
									<label className="mb-2 block text-sm font-bold text-gray-700">
										Password
									</label>
									<input
										{...register("password")}
										name="password"
										className={
											"focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
										}
										id="password"
										type="password"
										placeholder="******************"
									/>
									<p className="text-xs italic text-red-500">
										{errors.password?.message}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<InteractiveButton
										className="focus:shadow-outline rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none disabled:cursor-not-allowed"
										type="submit"
										loading={submitLoading}
										disabled={submitLoading}
									>
										Update
									</InteractiveButton>
								</div>
							</div>
						</form>
					</div>
				)}
				{isModalOpen && (
					<ModalPrompt
						actionHandler={handleDelete}
						closeModalFunction={closeModal}
						title={`Are you sure ? `}
						message={`Are you sure you want to delete profile picture ? `}
						acceptText={`DELETE`}
						rejectText={`CANCEL`}
					/>
				)}
				{isEditModalOpen && (
					<EditInfoModal
						title="Edit information"
						label="First Name"
						buttonName="Save and close"
						isOpen={openModalEdit}
						onClose={closeModal}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						id="first_name"
						submitLoading={submitLoading}
						errors={errors}
					/>
				)}
				{isLastNameModalOpen && (
					<EditInfoModal
						title="Edit information"
						label="Last Name"
						buttonName="Save and close"
						isOpen={openLastNModal}
						onClose={closeModal}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						id="last_name"
						submitLoading={submitLoading}
						errors={errors}
					/>
				)}
				{isEmailModalOpen && (
					<EditInfoModal
						title="Change Email"
						label="Email"
						buttonName="Submit"
						isOpen={openEmailModal}
						onClose={closeModal}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						id="email"
						submitLoading={submitLoading}
						errors={errors}
						defaultValues={defaultValues}
					/>
				)}
				{isPhoneModalOpen && (
					<EditInfoModal
						title="Edit information"
						label="Phone Number"
						buttonName="Save and close"
						isOpen={openPhoneModal}
						onClose={closeModal}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						register={register}
						id="phone_number"
						submitLoading={submitLoading}
						errors={errors}
					/>
				)}
			</main>
		</div>
	);
};

export default AdminProfilePage;

export const EditInfoModal = (props) => {
	const {
		title,
		label,
		buttonName,
		isOpen,
		onClose,
		handleSubmit,
		onSubmit,
		register,
		id,
		submitLoading,
		errors,
		defaultValues,
	} = props;
	const [emailConfirm, setEmailConfirm] = useState(false);
	const [values, setValues] = useState({
		email: "",
	});

	const handleChange = (prop) => (event) => {
		if (prop === "email") {
			setValues({ ...values, [prop]: event.target.value });
		}
	};

	return (
		<div
			className="fixed inset-0 z-10 overflow-y-auto"
			// onClick={() => onClose()}
		>
			<div
				className={`fixed inset-0 z-10 overflow-y-auto ${
					isOpen ? "block" : "hidden"
				} `}
				// onClick={(e) => {
				//   if (e.target === e.currentTarget) {
				//     onClose();
				//   }
				// }}
			>
				<div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>
					<span
						className="hidden sm:inline-block sm:h-screen sm:align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
						<div className="flex items-center justify-between">
							<div className="text-lg font-semibold leading-6 text-gray-900">
								{title}
							</div>
							<button
								className="text-gray-500 hover:text-gray-700 focus:outline-none"
								onClick={onClose}
							>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M6 18L18 6M6 6l12 12"></path>
								</svg>
							</button>
						</div>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="max-w-lg"
						>
							{emailConfirm === true && (
								<div className="mt-3 flex">
									<div className="mr-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663ZM8.33366 9.16663C8.33366 8.82145 8.61348 8.54163 8.95866 8.54163H10.0003C10.3455 8.54163 10.6253 8.82145 10.6253 9.16663L10.6253 13.5416C10.6253 13.8868 10.3455 14.1666 10.0003 14.1666C9.65515 14.1666 9.37533 13.8868 9.37533 13.5416L9.37532 9.79163H8.95866C8.61348 9.79163 8.33366 9.5118 8.33366 9.16663ZM10.0003 6.04163C9.65515 6.04163 9.37533 6.32145 9.37533 6.66663C9.37533 7.0118 9.65515 7.29163 10.0003 7.29163C10.3455 7.29163 10.6253 7.0118 10.6253 6.66663C10.6253 6.32145 10.3455 6.04163 10.0003 6.04163Z"
												fill="#4F46E5"
											/>
										</svg>
									</div>
									<div>
										<p className="mb-1	text-sm	font-medium text-gray-600">
											We've changed your email to:
										</p>
										<p className="mb-2	text-sm	font-semibold text-gray-900">
											{values?.email}
										</p>
										{/* <p className="mb-2	text-sm	font-medium text-gray-600">
											In order to complete the email
											update click the confirmation link.
										</p>
										<p className="mb-2	text-sm	font-medium text-gray-600">
											(the link expires in 24 hours)
										</p> */}
									</div>
								</div>
							)}
							{emailConfirm === false &&
								(id === "first_name" ||
									id === "last_name" ||
									id === "phone_number") && (
									<div className="mt-3">
										<label
											htmlFor="firstName"
											className="mb-1 block text-sm font-medium text-gray-700"
										>
											{label}
										</label>
										<input
											className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
											id={id}
											type="text"
											placeholder={`Enter ${label} `}
											name={id}
											{...register(id)}
											// defaultValue={values[id]}
											// onChange={id === "email" && handleChange("email")}
										/>
										<p className="text-xs italic text-red-500">
											{errors?.id?.message}
										</p>
									</div>
								)}
							{emailConfirm === false && id === "email" && (
								<div className="mt-3">
									<label
										htmlFor="firstName"
										className="mb-1 block text-sm font-medium text-gray-700"
									>
										{label}
									</label>
									<input
										className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
										id={id}
										type="text"
										placeholder={`Enter ${label}`}
										name={id}
										{...register(id)}
										onChange={handleChange("email")}
									/>
									<p className="text-xs italic text-red-500">
										{errors?.id?.message}
									</p>
								</div>
							)}
							<div className="mt-4 flex justify-between">
								<button
									className="mr-2 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700	"
									onClick={onClose}
								>
									Cancel
								</button>
								{(id === "first_name" ||
									id === "last_name" ||
									id === "phone_number" ||
									emailConfirm === true) && (
									<InteractiveButton
										className="focus:shadow-outline w-full rounded-md bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none disabled:cursor-not-allowed"
										type="submit"
										loading={submitLoading}
										disabled={submitLoading}
									>
										{buttonName}
									</InteractiveButton>
								)}
								{id === "email" && !emailConfirm && (
									<InteractiveButton
										className="focus:shadow-outline w-full rounded-md bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-600 focus:outline-none disabled:cursor-not-allowed"
										type="submit"
										loading={submitLoading}
										disabled={submitLoading}
										onClick={() => setEmailConfirm(true)}
									>
										Submit
									</InteractiveButton>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
