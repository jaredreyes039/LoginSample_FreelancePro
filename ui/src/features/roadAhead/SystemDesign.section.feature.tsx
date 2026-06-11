import { LockIcon, type LucideIcon } from "lucide-react"
import architectureDiagram from "/ClientStack_FiverrSample_MicroserviceArch_Diagram.drawio.png";

function DesignFeatures(){
	interface Feature {
		icon: LucideIcon,
		title: string,
		desc: string
	}

	const FEATURES: Feature[] = [
		{
			icon: LockIcon,
			title: "OpenID Standards, Secure Proxy w/ Caddy, and JWT",
			desc: "Unlock data-driven decisions with comprehensive analytics, revealing key opportunities for strategic regional growth."
		},
		{
			icon: LockIcon,
			title: "Scalable and Integration Ready",
			desc: "Manage and track satellite offices, ensuring consistent performance and streamlined operations everywhere."
		},
		{
			icon: LockIcon,
			title: "User-Notification Pipeline in AWS",
			desc: "Adapt to diverse markets with built-in localization for clear communication and enhanced user experience."
		},
		{
			icon: LockIcon,
			title: "Observability & Monitoring",
			desc: "Generate precise, visually compelling reports that illustrate your growth trajectories across all regions."
		},
	]

	return (
		<div className="grid grid-rows-4 sm:grid-rows-2 lg:grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full">
			{FEATURES.map((feature: Feature)=>{
				return (
					<div className="w-full px-[24px] flex flex-col items-start justify-start border-t-2 border-gray-200/50 py-8 gap-[24px]">
						<feature.icon className="w-8 h-8"/>
						<div className="flex flex-col gap-2">
							<h1 className="text-md text-green-100">
								{feature.title}
							</h1>
							<p className="text-sm text-gray-200/75">
								{feature.desc}
							</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default function SystemDesignSection(){
	return (
		<div className="flex flex-col mx-[24px] md:mx-[40px] gap-[50px]">
			<h1 className="text-title text-center">About this Demo</h1>
			<section id="systemDesign" className="flex flex-col items-start gap-[24px] md:gap-[50px]">
				<label className="text-label text-green-100">System Design</label>
				<h1 className="text-xl w-full md:w-2/3">How is the ClientStack Sign In and Registration System Designed?</h1>
				<p className="text-md text-gray-200/75 w-full md:w-1/2">A system designed to be scalable, maintainable, and available; ClientStack Auth leverages the latest in cloud technologies to guarantee availability, implementing OpenID standards to ensure user security, and orchestrated with a user notification event pipeline to assist in account recovery and other future service needs.</p>
				<img src={architectureDiagram} alt="" className="mb-[40px] w-full max-w-[1220px]" />
				<DesignFeatures />
			</section>
		</div>
	)
}
