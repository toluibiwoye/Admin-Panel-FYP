export default function SDK() {
	this._baseurl = "http://localhost:9000";
	this._table = "";

	this.login = async function (email, password, role) {
		const result = await fetch(this._baseurl + "/api/v1/users/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				role,
			}),
		});
		const json = await result.json();

		if (result.status === 401) {
			throw new Error(json.message);
		}

		if (result.status === 403) {
			throw new Error(json.message);
		}
		return json;
	};

	this.getHeader = function () {
		return {
			Authorization: "Bearer " + localStorage.getItem("token"),
		};
	};

	this.baseUrl = function () {
		return this._baseurl;
	};

	this.getToken = function () {
		return window.localStorage.getItem("token");
	};

	this.logout = function () {
		window.localStorage.clear();
	};

	this.getProfile = async function () {
		const result = await fetch(this._baseurl + "/api/v1/users/profile", {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});
		const json = await result.json();

		if (result.status === 401) {
			throw new Error(json.message);
		}

		if (result.status === 403) {
			throw new Error(json.message);
		}
		return json;
	};

	this.updateProfile = async function (payload) {
		const result = await fetch(this._baseurl + "/api/v1/users/profile", {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify(payload),
		});
		const json = await result.json();

		if (result.status === 401) {
			throw new Error(json.message);
		}

		if (result.status === 403) {
			throw new Error(json.message);
		}
		return json;
	};

	this.register = async function (email, password, role) {
		const result = await fetch(this._baseurl + "/api/v1/users/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
				role,
			}),
		});
		const json = await result.json();

		if (result.status === 401) {
			throw new Error(json.message);
		}

		if (result.status === 403) {
			throw new Error(json.message);
		}
		return json;
	};

	this.callRawAPI = async function (uri, payload, method) {
		const header = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		};

		let result;

		if (method === "GET") {
			result = await fetch(this._baseurl + uri, {
				method: method,
				headers: header,
			});
		} else {
			result = await fetch(this._baseurl + uri, {
				method: method,
				headers: header,
				body: JSON.stringify(payload),
			});
		}

		const jsonResult = await result.json();

		if (result.status === 401) {
			throw new Error(jsonResult.message);
		}

		if (result.status === 403) {
			throw new Error(jsonResult.message);
		}
		return jsonResult;
	};
	return this;
}
