import { Shield, TrendingUp, Users, type LucideIcon } from 'lucide-react';

interface Feature {
	icon: LucideIcon,
	ariaLabel: string,
	title: string,
	desc: string
}

interface Statistic {
	value: string,
	label: string
}

const FEATURES: readonly Feature[] = [
	{
		icon: Users,
		ariaLabel: "Icon displaying the outline of users/people",
		title: "Client Management",
		desc:"Keep track of all your clients and their projects in one organized dashboard."
	},
	{
		icon: TrendingUp,
		ariaLabel: "Icon displaying an upward trend arrow",
		title: "Financial Insights",
		desc: "Get real-time analytics on your earnings, expenses, and business growth."
	},
	{
		icon: Shield,
		ariaLabel: "Icon displaying a shield",
		title: "Secure & Reliable",
		desc: "Your data is protected with enterprise-grade security and encryption."
	}
]

const STATISTICS: readonly Statistic[]  = [
	{
		value: "10k+",
		label: "Freelancers"
	},
	{
		value: "$2M+",
		label: "Invoiced"
	},
	{
		value: "98%",
		label: "Satisfaction"
	}
]

function FeaturesPanel(){
	return (
		<div className="flex flex-col gap-12">
			{
				FEATURES.map((feature: Feature) => {
					return (
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
								<feature.icon aria-label={feature.ariaLabel} className="w-6 h-6"/>
							</div>
							<div className="flex flex-col gap-2">
								<h2 className="text-md font-bold">{feature.title}</h2>
								<p>{feature.desc}</p>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}

function StatisticsPanel(){
	return (
		<div className="mt-12 pt-12 border-t border-white/20">
			<ul className="flex flex-row justify-evenly items-center">
				{
					STATISTICS.map((stat: Statistic) => {
						return (
							<li className="flex flex-col items-center">
								<span className="text-lg font-bold">
									{stat.value}
								</span>
								<span className="text-md">
									{stat.label}
								</span>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}


export default function AppDetailsPanel(){
	return (
		<section className="hidden sm:block">
			<div className="flex flex-col justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4 lg:px-40 lg:py-20 text-white">
				<div className="max-w-lg">
					<h2 className="text-4xl mb-4 font-bold">Grow Your Freelance Business</h2>
					<p className=" mb-12 text-md ">
						Join thousands of freelancers managing projects, clients, and invoices all in one place.
					</p>
					<FeaturesPanel />	
					<StatisticsPanel />							
				</div>
			</div>
		</section >

)
}
