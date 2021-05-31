

export const lsSetItem = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch (e) {
    console.error("---localStorage.setItem---");
	}
};

export const lsGetItem = (key: string): string | null => {
	let data: string | null = null;
	try {
		data = localStorage.getItem(key);
	} catch (e) {
    console.error("---localStorage.getItem---");
	}
	return data;
};

export const lsRemoveItem = (key: string) => {
	try {
		localStorage.removeItem(key);
	} catch (e) {
    console.error("---localStorage.removeItem---");
	}
};

export const cookieGetItem = (key: string): string | null => {
	let data: string | null = null;
	try {
    const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    }
	  return null;
	} catch (err) {
		console.log("---cookieGetItem---", err);
	}
	return data;
};

export const setCookie = (key: string, value: string) => {
  document.cookie = key + "=" + escape(value) + "; path=/";
}
