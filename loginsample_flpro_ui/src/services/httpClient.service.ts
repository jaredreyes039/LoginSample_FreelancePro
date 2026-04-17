import axios from "axios"


export const get = (URL: string) => {
	axios({ url: URL, method: "GET", validateStatus: function(status) { return status < 500 } })
}

export const post = (URL: string, data: any) => {
	axios({ url: URL, method: "POST", data: data })
}

