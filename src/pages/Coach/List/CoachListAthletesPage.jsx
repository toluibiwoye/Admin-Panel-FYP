/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { AuthContext, tokenExpireError } from "Context/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SDK from "Utils/SDK";
import { GlobalContext, showToast } from "Context/Global";
import { getNonNullValue } from "Utils/utils";
import { PaginationBar } from "Components/PaginationBar";
import Skeleton from "react-loading-skeleton";
import { ModalSidebar } from "Components/ModalSidebar";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
// import AddAdminPhotoPage from "../Add/AddAdminPhotoPage";
import { AddButton } from "Components/AddButton";

let sdk = new SDK();

const columns = [
	{
		header: "Email",
		accessor: "email",
	},
	{
		header: "First Name",
		accessor: "firstName",
	},
	{
		header: "Last Name",
		accessor: "lastName",
	},
	{
		header: "Phone Number",
		accessor: "phoneNumber",
	},
	{
		header: "Create at",
		accessor: "createdAt",
	},
	{
		header: "Action",
		accessor: "",
	},
];

const filterColumns = [
	{
		header: "Date",
		accessor: "create_at",
	},
	{
		header: "ID",
		accessor: "id",
	},
	{
		header: "User ID",
		accessor: "user_id",
	},
	{
		header: "Action",
		accessor: "",
	},
];

const CoachListAthletesPage = () => {
	const { dispatch } = React.useContext(AuthContext);
	const { dispatch: globalDispatch } = React.useContext(GlobalContext);
	const [query, setQuery] = React.useState("");
	const [data, setCurrentTableData] = React.useState([]);
	const [pageSize, setPageSize] = React.useState(3);
	const [pageCount, setPageCount] = React.useState(0);
	const [dataTotal, setDataTotal] = React.useState(0);
	const [currentPage, setPage] = React.useState(0);
	const [canPreviousPage, setCanPreviousPage] = React.useState(false);
	const [canNextPage, setCanNextPage] = React.useState(false);
	const [loadingData, setLoadingData] = React.useState(false);
	const [showAddSidebar, setShowAddSidebar] = React.useState(false);
	const [openFilter, setOpenFilter] = React.useState(false);
	const [showFilterOptions, setShowFilterOptions] = React.useState(false);
	const [selectedOptions, setSelectedOptions] = React.useState([]);
	const [filterConditions, setFilterConditions] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [optionValue, setOptionValue] = React.useState("eq");
	const navigate = useNavigate();
	const globalContext = React.useContext(GlobalContext);

	const schema = yup.object({
		date: yup.string(),
		id: yup.string(),
		user_id: yup.string(),
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	function updatePageSize(limit) {
		(async function () {
			setPageSize(limit);
			await getData(0, limit);
		})();
	}
	function previousPage() {
		(async function () {
			await getData(currentPage - 1 > 0 ? currentPage - 1 : 0, pageSize);
		})();
	}
	function nextPage() {
		(async function () {
			await getData(
				currentPage + 1 <= pageCount ? currentPage + 1 : 0,
				pageSize
			);
		})();
	}

	async function getData(pageNum, limitNum, data) {
		try {
			const result = await sdk.callRawAPI(
				"/api/v1/users/athletes",
				{},
				"GET"
			);

			const { list, total, limit, num_pages, page } = result;

			setCurrentTableData(list);
			setPageSize(limit);
			setPageCount(num_pages);
			setPage(page);
			setDataTotal(total);
			setCanPreviousPage(page > 1);
			setCanNextPage(page + 1 <= num_pages);
		} catch (error) {
			console.log("ERROR", error);
			tokenExpireError(dispatch, error.message);
		}
	}

	const addFilterCondition = (option, selectedValue, inputValue) => {
		const input =
			selectedValue === "eq" && isNaN(inputValue)
				? `"${inputValue}"`
				: inputValue;
		const condition = `${option},${selectedValue},${input}`;
		setFilterConditions((prevConditions) => {
			const newConditions = prevConditions.filter(
				(condition) => !condition.includes(option)
			);
			return [...newConditions, condition];
		});
		setSearchValue(inputValue);
	};

	const onSubmit = (data) => {
		let create_at = getNonNullValue(data.date);
		let id = getNonNullValue(data.id);
		let user_id = getNonNullValue(data.user_id);
		let filter = { create_at, id, user_id };
		getData(0, 50, filter);
	};

	React.useEffect(() => {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "athletes",
			},
		});

		(async function () {
			setLoadingData(true);
			await getData(0, 50);
			setLoadingData(false);
		})();
	}, []);

	async function deleteImage(id) {
		sdk.setTable("photo");
		const result = await sdk.callRestAPI({ id }, "DELETE");
		showToast(globalDispatch, "Deleted");
		await getData(0, 50);
	}

	console.log("data", data);

	return (
		<div className="px-8">
			<div className="flex items-center justify-between py-3">
				{/* <form
					className="relative rounded bg-white"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex items-center gap-4 text-gray-700">
						<div
							className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 px-3 py-1"
							onClick={() => setOpenFilter(!openFilter)}
						>
							<BiFilterAlt />
							<span>Filters</span>
							{selectedOptions.length > 0 && (
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-start  text-white">
									{selectedOptions.length > 0
										? selectedOptions.length
										: null}
								</span>
							)}
						</div>
						<div className=" flex cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 px-2 py-1 focus-within:border-gray-400">
							<BiSearch className="text-xl text-gray-200" />
							<input
								type="text"
								placeholder="search..."
								className="border-none p-0 placeholder:text-left  focus:outline-none"
								style={{ boxShadow: "0 0 transparent" }}
								onInput={(e) =>
									addFilterCondition(
										"name",
										"cs",
										e.target?.value
									)
								}
							/>
							<AiOutlineClose className="text-lg text-gray-200" />
						</div>
					</div>
					{openFilter && (
						<div className="top-fill filter-form-holder absolute left-0  z-20 mt-4 min-w-[70%] rounded-md border border-gray-200 bg-white p-5 shadow-xl">
							{selectedOptions?.map((option, index) => (
								<div
									key={index}
									className="mb-2 flex w-full items-center justify-between gap-3 text-gray-600"
								>
									<div className=" mb-3  w-1/3 rounded-md border border-gray-300 px-3 py-2 leading-tight text-gray-700 outline-none">
										{option}
									</div>
									<select
										className="w-[30%] appearance-none border-none outline-0"
										onChange={(e) => {
											setOptionValue(e.target.value);
										}}
									>
										<option value="eq" selected>
											equals
										</option>
										<option value="cs">contains</option>
										<option value="sw">start with</option>
										<option value="ew">ends with</option>
										<option value="lt">lower than</option>
										<option value="le">
											lower or equal
										</option>
										<option value="ge">
											greater or equal
										</option>
										<option value="gt">greater than</option>
										<option value="bt">between</option>
										<option value="in">in</option>
										<option value="is">is null</option>
									</select>

									<input
										type="text"
										placeholder="Enter value..."
										className=" mb-3 w-1/3 rounded-md border px-3 py-2 leading-tight text-gray-700 outline-none"
										onChange={(e) =>
											addFilterCondition(
												option,
												optionValue,
												e.target.value
											)
										}
									/>

									<RiDeleteBin5Line
										className=" cursor-pointer text-2xl"
										onClick={() => {
											setSelectedOptions((prevOptions) =>
												prevOptions.filter(
													(op) => op !== option
												)
											);
											setFilterConditions(
												(prevConditions) => {
													return prevConditions.filter(
														(condition) =>
															!condition.includes(
																option
															)
													);
												}
											);
										}}
									/>
								</div>
							))}

							<div className="search-buttons relative flex items-center justify-between font-semibold">
								<div
									// type="submit"
									className="mr-2 flex w-auto cursor-pointer items-center gap-2 rounded bg-gray-100 px-4 py-2.5 font-medium leading-tight text-gray-600 transition duration-150 ease-in-out "
									onClick={() => {
										setShowFilterOptions(
											!showFilterOptions
										);
									}}
								>
									<AiOutlinePlus />
									Add filter
								</div>

								{showFilterOptions && (
									<div className="absolute top-11 z-10 bg-white px-5 py-3 text-gray-600 shadow-md">
										<ul className="flex flex-col gap-2 text-gray-500">
											{filterColumns
												.slice(0, -1)
												.map((column) => (
													<li
														key={column.header}
														className={`${
															selectedOptions.includes(
																column.header
															)
																? "cursor-not-allowed text-gray-400"
																: "cursor-pointer"
														}`}
														onClick={() => {
															if (
																!selectedOptions.includes(
																	column.header
																)
															) {
																setSelectedOptions(
																	(prev) => [
																		...prev,
																		column.header,
																	]
																);
															}
															setShowFilterOptions(
																false
															);
														}}
													>
														{column.header}
													</li>
												))}
										</ul>
									</div>
								)}
								{selectedOptions.length > 0 && (
									<div
										// type="reset"
										onClick={() => {
											setSelectedOptions([]);
											setFilterConditions([]);
										}}
										className="inline-block cursor-pointer  rounded px-6  py-2.5 font-medium leading-tight text-gray-600  transition duration-150 ease-in-out"
									>
										Clear all filter
									</div>
								)}
							</div>
						</div>
					)}
				</form>
				<h4 className="text-2xl font-medium">Photos </h4> 
				<AddButton onClick={() => setShowAddSidebar(true)} /> */}
			</div>

			<div>
				<div className="overflow-x-auto border-b border-gray-200 shadow ">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								{columns.map((column, index) => (
									<th
										key={index}
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
									>
										{column.header}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? " ▼"
													: " ▲"
												: ""}
										</span>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{data.length == 0 ? (
								<tr>
									<td colSpan={3}>
										{loadingData && <Skeleton count={4} />}
									</td>
								</tr>
							) : null}
							{data.map((row, i) => {
								return (
									<tr key={i}>
										{columns.map((cell, index) => {
											if (cell.accessor == "") {
												return (
													<td
														key={index}
														className="whitespace-nowrap px-6 py-4"
													>
														<button
															className="text-xs text-red-400"
															onClick={() => {
																deleteImage(
																	row.id
																);
															}}
														>
															{" "}
															Delete
														</button>
													</td>
												);
											}
											if (cell.mapping) {
												return (
													<td
														key={index}
														className="whitespace-nowrap px-6 py-4"
													>
														{
															cell.mapping[
																row[
																	cell
																		.accessor
																]
															]
														}
													</td>
												);
											}
											return (
												<td
													key={index}
													className="whitespace-nowrap px-6 py-4"
												>
													{cell.accessor == "url" ? (
														<img
															width={200}
															height={200}
															/* src={`https://mkdlabs.com${{row[cell.accessor]}`} */ src={
																row?.url
															}
														/>
													) : (
														row[cell.accessor]
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<PaginationBar
				currentPage={currentPage}
				pageCount={pageCount}
				pageSize={pageSize}
				canPreviousPage={canPreviousPage}
				canNextPage={canNextPage}
				updatePageSize={updatePageSize}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
			<ModalSidebar
				isModalActive={showAddSidebar}
				closeModalFn={() => setShowAddSidebar(false)}
			>
				{/* <AddAdminPhotoPage setSidebar={setShowAddSidebar} /> */}
			</ModalSidebar>
		</div>
	);
};

export default CoachListAthletesPage;
