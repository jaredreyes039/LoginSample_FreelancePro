import { Briefcase, Shield, TrendingUp, Users } from "lucide-react";
import RegistrationForm from "@/forms/Registration.forms";


export default function RegistrationPage(props: any) {

	return (
		<>
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-screen min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-8">
							<div className="flex items-center gap-2 mb-6">
								<div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
									<Briefcase aria-label="Briefcase icon - FreelancePro" className="w-6 h-6 text-white" />
								</div>
								<span className="text-2xl text-gray-900" style={{ fontWeight: 600 }}>FreelancePro</span>
							</div>
							<h1 className="text-gray-900 mb-2">Welcome back</h1>
							<p className="text-gray-600">Sign in to access your freelance dashboard</p>
						</div>
						<RegistrationForm />
						<div className="">
							<div className="mt-8 pt-8 border-t border-gray-200">
								<p className="text-sm text-gray-600 text-center">
									Already have an account?{' '}
									<a href="/" className="text-emerald-600 hover:text-emerald-700" style={{ fontWeight: 500 }}>
										Go to <u>Sign In</u>.
									</a>
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="hidden sm:block">
					<div className="lg:flex flex-col justify-center min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 p-12 text-white">
						<div className="max-w-lg">
							<h2 className="text-4xl mb-4" style={{ fontWeight: 600 }}>Grow Your Freelance Business</h2>
							<p className="text-emerald-100 mb-12 text-lg">
								Join thousands of freelancers managing projects, clients, and invoices all in one place.
							</p>

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
						</div>
					</div>
				</section >
			</div>
		</>
	)
}
