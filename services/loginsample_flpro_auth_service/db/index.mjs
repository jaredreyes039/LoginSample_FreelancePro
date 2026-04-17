import { Pool } from "pg";

export const pool = new Pool();

export const query = async (text, params) => {
	const start = performance.now()
	const res = await pool.query(text, params)
	const duration = (performance.now() - start).toPrecision(5);
	console.log('Query call exec', { text, duration, rows: res.rowCount })
	return res
}

export const getClient = async () => {
	const client = await pool.connect()
	const query = client.query
	const release = client.release
	const timeout = setTimeout(() => {
		console.error('A client has been checked out for more than 5 seconds!')
		console.error(`The last executed query on this client was: ${client.lastQuery}`)
	}, 5000)
	client.query = (...args) => {
		client.lastQuery = args
		return query.apply(client, args)
	}
	client.release = () => {
		clearTimeout(timeout)
		client.query = query
		client.release = release
		return release.apply(client)
	}
	return client
}
