import { Shield, TrendingUp, Users } from 'lucide-react';

function FeaturesPanel(){
	return (
	<div className="space-y-6">
			<div className="flex items-start gap-4">
				<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
					<Users aria-label="Icon displaying the outline of users/people" className="w-6 h-6" />
				</div>
				<div>
					<h3 className="mb-1">Client Management</h3>
					<p className="text-emerald-100">
						Keep track of all your clients and their projects in one organized dashboard.
					</p>
				</div>
			</div>

			<div className="flex items-start gap-4">
				<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
					<TrendingUp aria-label="Icon displaying an upward trend arrow" className="w-6 h-6" />
				</div>
				<div>
					<h3 className="mb-1">Financial Insights</h3>
					<p className="text-emerald-100">
						Get real-time analytics on your earnings, expenses, and business growth.
					</p>
				</div>
			</div>

			<div className="flex items-start gap-4">
				<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
					<Shield aria-label="Icon displaying a shield" className="w-6 h-6" />
				</div>
				<div>
					<h3 className="mb-1">Secure & Reliable</h3>
					<p className="text-emerald-100">
						Your data is protected with enterprise-grade security and encryption.
					</p>
				</div>
			</div>
		</div>
	)
}

function StatisticsPanel(){
	return (
		<div className="mt-12 pt-12 border-t border-white/20">
			<div className="grid grid-cols-3 gap-8">
				<div>
					<div className="text-3xl mb-1" style={{ fontWeight: 600 }}>10k+</div>
						<div className="text-emerald-100 text-sm">Freelancers</div>
						</div>
					<div>
					<div className="text-3xl mb-1" style={{ fontWeight: 600 }}>$2M+</div>
						<div className="text-emerald-100 text-sm">Invoiced</div>
						</div>
					<div>
					<div className="text-3xl mb-1" style={{ fontWeight: 600 }}>98%</div>
						<div className="text-emerald-100 text-sm">Satisfaction</div>
						</div>
					</div>
				</div>
	)
}

function BrandFooter(){
	return(
		<footer className="absolute bottom-4 right-4">
			<div className="flex items-center justify-center">
				<h1 className="text-white text-2xl">Client Stack</h1> 	
			</div>
		</footer>
	)
}

export default function AppDetailsPanel(){
	return (
		<section className="hidden sm:block">
			<div className="lg:flex flex-col justify-center min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-white">
				<div className="max-w-lg">
					<h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>Grow Your Freelance Business</h2>
					<p className="text-emerald-100 mb-12 text-lg">
						Join thousands of freelancers managing projects, clients, and invoices all in one place.
					</p>
					<FeaturesPanel />	
					<StatisticsPanel />							
				</div>
			</div>
			<BrandFooter />
		</section >

)
}
