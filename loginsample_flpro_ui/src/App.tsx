import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import LoginForm from './features/LoginForm.feature';
import logo from '/logo512.png'
import AppDetailsPanel from './features/AppDetailsPanel.feature';
import RegistrationForm from './features/RegistrationForm.feature';
import { IndexFormContext } from './context/IndexFormContext';
import ForgotPasswordForm from './features/ForgotPasswordForm.feature';

function App() {

	const nav = useNavigate();
	const [form, setForm] = useState<string>("login")

	// TODO: ADD TOASTER MESSAGES
	
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

	if(form === "register") return (
		<IndexFormContext.Provider value={{form, setForm}}> 
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-screen min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-8">
							<div className="flex justify-center items-center">
								<img className="w-72 md:w-96 " src={logo} />
							</div>
							<>
								<h1 className="text-gray-900 mb-2">Welcome to Client Stack</h1>
								<p className="text-gray-600">Register today and bring a new level of efficiency to your freelance workflow!
								</p>
							</>
						</div>
						<RegistrationForm />
					</div>
				</section>
				<AppDetailsPanel />
			</div>
		</IndexFormContext.Provider>
	)

	if(form === "login") return (
		<IndexFormContext.Provider value={{form, setForm}}> 
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-screen min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-4 md:mb-8">
							<div className="flex justify-center items-center">
								<img className="w-72 md:w-96" src={logo} />
							</div>

							<>
								<h1 className="text-gray-900 mb-2">Welcome to Client Stack</h1>
								<p className="text-gray-600">Sign in to access your personal workflow dashboard</p>
							</>
						</div>
						<LoginForm />
					</div>
				</section>
				<AppDetailsPanel />
			</div>
		</IndexFormContext.Provider>
	);

	if(form === "forgotPass") return (
		<IndexFormContext.Provider value={{form, setForm}}> 
			<div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-1 min-h-screen min-w-screen">
				<section className="flex items-center justify-center p-8">
					<div className="w-full max-w-md">
						<div className="mb-8">
							<div className="flex justify-center items-center">
								<img className="w-72 md:w-96" src={logo} />
							</div>

							<>
								<h1 className="text-gray-900 mb-2">Forgot your password?</h1>
								<p className="text-gray-600">Enter the email address associated with your account and we will try to recover it for you.</p>
							</>
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
