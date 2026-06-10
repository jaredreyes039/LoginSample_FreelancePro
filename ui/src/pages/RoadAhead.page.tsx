import { useEffect } from "react"
import { useNavigate } from '@tanstack/react-router'
import axios from "axios"
import NavBar from "@/features/Nav.feature";

export default function RoadAheadPage() {

	const nav = useNavigate();

	// TODO: MOVE ERRORS INTO A TOAST CONTAINER
	// Check if User already logged in within session age
	// TODO: Move to authorized route with tanstack-router
	useEffect(() => {
		async function fetchUserSessionStatus() {
			const userStatus = await axios.get(import.meta.env.VITE_AUTH_STATUS_URL, { validateStatus: (status) => { return status < 500 }, withCredentials: true }).then((res: any) => { return res })
			if (userStatus.status !== 200) {
				nav({ to: "/" })
			}
			else {
				return;
			}
		}
		fetchUserSessionStatus();
	}, [])


	return (
		<div className="min-w-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8">
			<NavBar />
		</div>)
}
