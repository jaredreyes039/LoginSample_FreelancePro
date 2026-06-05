import { FormProvider, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../utils/yupResolver.util.ts'
import TextInput from '@/components/Input.component.tsx';
import {  ButtonGoogle } from '@/components/ThirdPartyButtons.component';
import { useIndexFormContext } from '@/context/IndexFormContext.ts';

export default function LoginForm() {

	interface FormValues {
		email: string,
		password: string
	}

	const methods = useForm<FormValues>({
		resolver: yupResolver(loginSchema)
	});

	const nav = useNavigate();
	const {setForm} = useIndexFormContext();

	const [errors, setErrors] = useState<string[]>([]);

	// Redirects to /dashboard if user is auth
	async function onSubmit(formData: FormValues) {
		const loginStatus = await axios.post(import.meta.env.VITE_LOCAL_LOGIN_URL, formData, { validateStatus: (status) => { return status <= 500 }, withCredentials: true });
		if (loginStatus.status !== 200) {
			setErrors((prev: any) => [...prev, "Invalid credentials, please try again."])
		}
		else {
			nav({ to: "/dashboard" })
		}
	}

	// Finish login handling for Google and Github
	function handleGoogleLogin() {
		window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL
	}

	// Handle form error message display
	useEffect(() => {
		if (methods.formState.errors.email) {
			setErrors((prev: any) => [...prev, methods.formState.errors.email?.message])
		}
		if (methods.formState.errors.password) {
			setErrors((prev: any) => [...prev, methods.formState.errors.password?.message])
		}
	}, [methods.formState.errors.email, methods.formState.errors.password])

	// Reset form vals
	useEffect(() => {
		methods.reset({
			email: "",
			password: ""
		})
	}, [methods.reset])

	return (
		<>
			<FormProvider {...methods}>
				<span className="form-error text-red-500">{errors.length > 0 ? errors[errors.length - 1] : ''}</span>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<TextInput
						type="text"
						label="Email Address"
						inputName="email"
						direction="column"
						placeholder="Enter email address"
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
							className="cursor-pointer w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-11"
							type="submit"
						>
							Sign In
						</button>
						<button
							onClick={(e)=>{e.preventDefault; setForm("forgotPass")}}
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
				<div className="flex flex-col gap-4 p-4">
					<ButtonGoogle cb={() => handleGoogleLogin()} />
				</div>
			</FormProvider>
			<div className="mt-8 pt-8 border-t border-gray-200">
				<p className="text-sm text-gray-600 text-center">
					Don't have an account?{' '}
					<a onClick={()=>setForm("register")} className="cursor-pointer text-emerald-600 hover:text-emerald-700" style={{ fontWeight: 500 }}>
						<u>Sign up for free</u>
					</a>
				</p>
			</div>
		</>
	)
}
