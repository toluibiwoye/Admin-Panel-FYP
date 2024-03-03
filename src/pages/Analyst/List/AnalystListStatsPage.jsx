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
		header: "User",
		accessor: "user_id",
	},
	{
		header: "Physicals",
		accessor: "physicals",
	},
	{
		header: "Stamina",
		accessor: "stamina",
	},
	{
		header: "Speed",
		accessor: "speed",
	},
	{
		header: "Strength",
		accessor: "strength",
	},
	{
		header: "Create at",
		accessor: "createdAt",
	},
	{
		header: "Update at",
		accessor: "updatedAt",
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

const AnalystListStatsPage = () => {
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
				"/api/v1/users/stats",
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

	React.useEffect(() => {
		globalDispatch({
			type: "SETPATH",
			payload: {
				path: "stats",
			},
		});

		(async function () {
			setLoadingData(true);
			await getData(0, 50);
			setLoadingData(false);
		})();
	}, []);

	async function deleteItem(id) {
		sdk.setTable("photo");
		const result = await sdk.callRestAPI({ id }, "DELETE");
		showToast(globalDispatch, "Deleted");
		await getData(0, 50);
	}

	console.log("data", data);

	return (
		<div className="px-8">
			<div className="flex">
				<button
					className="text-md my-5 rounded bg-purple-600 px-6 py-2 font-bold text-white"
					onClick={() => {
						navigate("/analyst/add-stats/");
					}}
				>
					Add
				</button>
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
										{loadingData && (
											<Skeleton circle={true} count={4} />
										)}
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
															className="mx-2 text-xs text-green-400"
															onClick={() => {
																navigate(
																	"/analyst/edit-stats/" +
																		row.user_id,
																	{
																		state: row,
																	}
																);
															}}
														>
															Edit
														</button>
														<button
															className="text-xs text-red-400"
															onClick={() => {
																deleteItem(
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

export default AnalystListStatsPage;
