
/**
 * 接口返回状态码说明：
 * 200 成功
 * 400 失败
 * 401 重新登录
 * 204 数据为空
 * 500 服务器错误
 */


export interface RegularConfigValue {
	msg: string;
	preg: string;
	required: boolean;
}
export interface RegularConfig {
	[key: string]: RegularConfigValue;
}

export const headers = {
  "Content-Type": "application/json",
  Authenticate: localStorage.getItem("token") || ""
};

function checkStatus(response: Response): Response {
	if (!response.ok) {
		const error = new Error(response.statusText);
		switch (response.status) {
			case 400:
				console.log("request fail");
				break;
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
		body: fetchMethod === "POST" ? JSON.stringify(params) : undefined
	} as any;
	return fetch(url, options).then(checkStatus);
}

export function webapi(requestType: "POST" | "GET", method: string, params: any): Promise<any> {
	let url = "//localhost:8080" + method;
	return doFetch(url, params, requestType, headers)
		.then(response =>
				response.json().then(json => ({ data: json, status: response.status })) as Promise<{
					data: any;
					status: number;
				}>
		)
		.then(response => {
			return response.data;
		});
}