import { useEffect } from "react"
import { redirect } from '@tanstack/react-router'
import axios from "axios"

export default function DashboardSamplePage() {
	const AUTH_STATUS_LINK = "http://localhost:5000/auth/status"

	// Check if User already logged in within session age
	useEffect(() => {
		async function fetchUserSessionStatus() {
			const userStatus = await axios.get(AUTH_STATUS_LINK, { validateStatus: (status) => { return status < 500 } }).then((res: any) => { return res })
			if (userStatus.status !== 200) {
				return;
			}
			else {
				throw redirect({
					to: '/dashboard',
				})
			}
		}
		fetchUserSessionStatus();
	}, [])

	return (
		<span>END CODE SAMPLE, SEE <a href="https://github.com/jaredreyes039/">https://github.com/jaredreyes039</a> FOR MORE EXAMPLES OF CURRENT TECH STACK SKILLS.</span>
	)
}
