import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import TextInput from '@/components/Input.component.tsx';
import { ButtonGithub, ButtonGoogle } from '@/components/ThirdPartyButtons.component';

type FormValues = {
	username: string,
	password: string
}



export default function LoginForm() {
	const methods = useForm<FormValues>();
	const nav = useNavigate();

	const GOOGLE_SIGNIN_API_ROUTE = "http://localhost:5000/auth/login/federation/google"

	// Redirect to dashboard END SAMPLE page
	async function onSubmit(formData: FormValues) {
		const loginStatus = await axios.post('http://localhost:5000/auth/login/local', formData, { validateStatus: (status) => { return status < 500 }, withCredentials: true });
		if (loginStatus.status !== 200) {
			console.log('failure')
		}
		else {
			console.log(loginStatus)
			nav({ to: "/dashboard" })
		}
	}

	// Finish login handling for Google and Github
	function handleGoogleLogin() {
		// 1. Get sign in
		// 2. Sign in redirects to dashboard if successful
		window.location.href = GOOGLE_SIGNIN_API_ROUTE
	}

	useEffect(() => {
		methods.reset({
			username: "",
			password: ""
		})
	}, [methods.reset])

	return (
		<FormProvider {...methods}>
			<span className="form-error">{methods.formState.errors.username?.message}</span>
			<span className="form-error">{methods.formState.errors.password?.message}</span>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<TextInput
					type="text"
					label="Username"
					inputName="username"
					direction="column"
					placeholder="Enter username"
					className="pl-10 pr-10 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
				/>
				<TextInput
					type="password"
					label="Password"
					inputName="password"
					direction="column"
					className="pl-10 pr-10 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
					placeholder="Enter password"
				/>
				<div className="flex justify-between w-full">
					<button
						className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-11"
						type="submit"
					>
						Sign In
					</button>
					<button
						className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline hover:cursor-pointer"
						style={{ fontWeight: 500 }}>
						Forgot your password?
					</button>
				</div>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-4 bg-white text-gray-500">Or continue with</span>
					</div>
				</div>
			</form >
			<ButtonGoogle cb={() => handleGoogleLogin()} />
			<ButtonGithub cb={() => { }} />

		</FormProvider>
	)
}
