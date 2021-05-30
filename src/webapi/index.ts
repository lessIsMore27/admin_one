

function checkStatus(response: Response): Response {
	if (!response.ok) {
		const error = new Error(response.statusText);
		switch (response.status) {
			case 401: // 没有权限，未登录
				window.location.pathname = "/login.html";
				break;
			case 404:
				window.location.pathname = "/error.html";
				break;
			case 500:
				console.log("server error");
				break;
			default:
				return response;
		}
		throw error;
	}
	return response;
}

export function doFetch(
	url: string,
	params: any,
	fetchMethod?: "POST" | "GET",
	headers?: HeadersInit
) {
	const options = {
		method: fetchMethod,
		withCredentials: true,
		credentials: "include",
		headers,
		body: JSON.stringify(params)
	} as any;
	return fetch(url, options).then(checkStatus);
}

export const headers = {
  "Content-Type": "application/json",
  Authenticate: localStorage.getItem("token") || ""
};

export function webapi<T>(requestType: "POST" | "GET", method: string, params: any): Promise<T> {
	let url = "//localhost:8080" + method;

	return doFetch(url, params, requestType, headers)
		.then(response =>
				response.json().then(json => ({ data: json, status: response.status })) as Promise<{
					data: any;
					status: number;
				}>
		)
		.then<T>(response => {
			// if (response.status === 400) {
			// 	return Promise.reject({
			// 		status: response.status,
			// 		message: response.data.msg
			// 	});
			// }
			return response.data;
		});
}