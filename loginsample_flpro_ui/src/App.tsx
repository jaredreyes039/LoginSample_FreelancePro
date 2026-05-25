import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import LoginForm from './features/LoginForm.feature';
import logo from '/logo48.png'
import AppDetailsPanel from './features/AppDetailsPanel.feature';
import RegistrationForm from './features/RegistrationForm.feature';
import { IndexFormContext } from './context/IndexFormContext';
import ForgotPasswordForm from './features/ForgotPasswordForm.feature';

function BrandHeader(){
	return(
		<footer className="absolute top-4 left-4">
			<div className="flex items-center justify-center">
				<img src={logo} />
				<h1 className="text-emerald-600 text-xl">ClientStack</h1> 	
			</div>
		</footer>
	)
}

function App() {

	const nav = useNavigate();
	const [form, setForm] = useState<string>("login")

	// TODO: ADD ERROR MESSAGES
	
	useEffect(() => {
		async function fetchUserSessionStatus() {
			const userStatus = await axios.get(import.meta.env.VITE_AUTH_STATUS_URL, { validateStatus: (status) => { return status < 500 }, withCredentials: true }).then((res: any) => { return res })
			if (userStatus.status !== 200) {
				return;
			}
			else {
				nav({ to: "/dashboard" })
			}
		}
		fetchUserSessionStatus();
	}, [])

	// TODO: Refactor into DRY format
	if(form === "register") return (
		<IndexFormContext.Provider value={{form, setForm}}> 
			<BrandHeader />
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-dvh min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<RegistrationForm />
					</div>
				</section>
				<AppDetailsPanel />
			</div>
		</IndexFormContext.Provider>
	)

	if(form === "login") return (
		<IndexFormContext.Provider value={{form, setForm}}>
			<BrandHeader />
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-dvh min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-4 md:mb-8">
								<h1 className="text-gray-900 mb-2">Welcome to <span className="text-emerald-600">ClientStack</span></h1>
								<p className="text-gray-600">Sign in to access your personal workflow dashboard</p>
						</div>
						<LoginForm />
					</div>
				</section>
				<AppDetailsPanel />
			</div>
		</IndexFormContext.Provider>
	);

// TODO: SendGrid or Amazon Email Service integration still needs to be done with forgotPasswordForm
	if(form === "forgotPass") return (
		<IndexFormContext.Provider value={{form, setForm}}>
			<BrandHeader />
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-dvh min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-8">
								<h1 className="text-gray-900 mb-2">Account Recovery</h1>
								<p className="text-gray-600">Enter the email address associated with your ClientStack account.</p>
						</div>
						<ForgotPasswordForm />
					</div>
				</section>
				<AppDetailsPanel />
			</div>
		</IndexFormContext.Provider>
	);
}

export default App
