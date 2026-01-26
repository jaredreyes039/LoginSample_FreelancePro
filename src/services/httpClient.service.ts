import axios from "axios"


export const get = (URL: string) => {
	axios({ url: URL, method: "GET" })
		.then()
		.catch()
}

export const post = (URL: string, data: any) => {
	axios({ url: URL, method: "POST", data: data })
		.then()
		.catch()
}

