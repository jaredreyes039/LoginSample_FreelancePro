import axios from "axios"


export const get = (URL: string) => {
	axios({ url: URL, method: "GET", validateStatus: function(status) { return status < 500 } })
}

export const post = async (URL: string, data: any) => {
	const res = await axios({ url: URL, method: "POST", data: data })
	return res;
}

