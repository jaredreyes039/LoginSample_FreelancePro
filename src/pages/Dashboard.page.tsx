import { useEffect } from "react"
import { redirect, useNavigate } from '@tanstack/react-router'
import axios from "axios"
import { Briefcase, ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/Cards.component";

export default function DashboardSamplePage() {
	const AUTH_STATUS_LINK = "http://localhost:5000/auth/status"
	const nav = useNavigate();

	// Check if User already logged in within session age
	// TODO: Move to authorized route with tanstack-router
	useEffect(() => {
		async function fetchUserSessionStatus() {
			const userStatus = await axios.get(AUTH_STATUS_LINK, { validateStatus: (status) => { return status < 500 }, withCredentials: true }).then((res: any) => { return res })
			if (userStatus.status !== 200) {
				nav({ to: "/" })
			}
			else {
				console.log("Success");
			}
		}
		fetchUserSessionStatus();
	}, [])

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-8">
			<div className="max-w-4xl w-full">
				<div className="text-center mb-12">
					<h1 className="text-gray-900 mb-4">This is the end of the code sample.</h1>
					<p className="text-gray-600 text-lg">
						For more examples of my programming skills please visit my github or portfolio below:
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					{/* GitHub Card */}
					<Card className="p-6 hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-emerald-300">
						<div className="flex items-start justify-between mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
								<Github className="w-6 h-6 text-white" />
							</div>
							<ExternalLink className="w-5 h-5 text-gray-400" />
						</div>

						<h3 className="text-gray-900 mb-2">GitHub Profile</h3>
						<p className="text-gray-600 mb-4">
							Explore my open source projects, contributions, and code repositories showcasing various technologies and solutions.
						</p>

						<div className="space-y-2 mb-6">
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
								<span>Access to Sample Source Code</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<div className="w-3 h-3 bg-teal-500 rounded-full"></div>
								<span>Full-Stack Samples Available</span>
							</div>
						</div>

						<a
							href="https://github.com/jaredreyes039"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
							style={{ fontWeight: 500 }}
						>
							Visit GitHub
							<ExternalLink className="w-4 h-4" />
						</a>
					</Card>

					{/* Portfolio Card */}
					<Card className="p-6 hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-emerald-300">
						<div className="flex items-start justify-between mb-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
								<Briefcase className="w-6 h-6 text-white" />
							</div>
							<ExternalLink className="w-5 h-5 text-gray-400" />
						</div>

						<h3 className="text-gray-900 mb-2">Portfolio</h3>
						<p className="text-gray-600 mb-4">
							View my complete personal portfolio featuring sample code from various project types, and highlights from my experience as a software engineer.
						</p>

						<div className="space-y-2 mb-6">
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
								<span>Featured Projects and Experience</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-gray-500">
								<div className="w-3 h-3 bg-teal-500 rounded-full"></div>
								<span>More About Me</span>
							</div>
						</div>

						<a
							href="https://jaydevdesign.com"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
							style={{ fontWeight: 500 }}
						>
							Visit Portfolio
							<ExternalLink className="w-4 h-4" />
						</a>
					</Card>
				</div>
			</div>
		</div>)
}
