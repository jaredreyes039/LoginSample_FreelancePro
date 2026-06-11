import { useEffect } from "react"
import { useNavigate } from '@tanstack/react-router'
import axios from "axios"
import NavBar from "../features/roadAhead/Nav.feature";
import SystemDesignSection from "@/features/roadAhead/SystemDesign.section.feature";
import ChallengesSection from "@/features/roadAhead/Challenges.section.feature";
import WhatsNextSection from "@/features/roadAhead/WhatsNext.section.feature";

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
		<div className="w-full max-w-[1550px] bg-white sm:py-[20px] m-0 md:m-auto">
			<NavBar />
			<div className="flex flex-col gap-[50px]">
			<SystemDesignSection />			
			<ChallengesSection />
			<WhatsNextSection />
			</div>
		</div>)
}
