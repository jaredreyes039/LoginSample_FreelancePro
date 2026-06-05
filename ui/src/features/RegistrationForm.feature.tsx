import { FormProvider, useForm } from "react-hook-form";
import { post } from '../utils/httpClient.util.ts'
import TextInput from "@/components/Input.component";
import { useIndexFormContext } from "@/context/IndexFormContext.ts";
import { useEffect, useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../utils/yupResolver.util.ts'
import { ButtonGoogle } from "@/components/ThirdPartyButtons.component.tsx";

export default function RegistrationForm() {

	interface FormValues {
		username: string,
		email: string,
		password: string,
		passwordCopy: string

	}

	const [errors, setErrors] = useState<string[]>([]);
	const {setForm} = useIndexFormContext()
	const methods = useForm<FormValues>({
		resolver: yupResolver(registerSchema)
	});

	function handleGoogleLogin() {
		window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL
	}

	async function onSubmit(formData: FormValues) {
		try {
			const res = post(import.meta.env.VITE_REGISTER_USER_URL, formData);
			if ((await res).status !== 201) {
				setErrors((prev: any) => [...prev, "Invalid credentials, please try again."])
			}
			else {
				setForm('login')
				return;
			}
			return;
		}
		catch(err){
			setErrors((prev)=>[...prev, "Something went wrong, plesse try again later."])
			return;
		}
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
			username: "",
			email:"",
			password: "",
			passwordCopy: ""
		})
	}, [methods.reset])


	return (
		<>
			<FormProvider {...methods}>
				<span className="form-error text-red-500">{errors.length > 0 ? errors[errors.length - 1] : ''}</span>
				<form className="flex flex-col gap-4" onSubmit={methods.handleSubmit(onSubmit)}>
					<TextInput
						type="text"
						label="Username"
						inputName="username"
						direction="column"
						placeholder="Enter username"
						className="pl-10 pr-10 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"

					/>
					<TextInput
						type="email"
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
						placeholder="Enter password"
						className="pl-10 pr-10 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"

					/>
					<TextInput
						type="password"
						label="Confirm Password"
						inputName="passwordCopy"
						direction="column"
						placeholder="Confirm password"
						className="pl-10 pr-10 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"

					/>
					{/* TODO: INSERT TOS AGREEMENT AND SUB OPTION HERE */}
					<button
						className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-11"
						type="submit">
						Register
					</button>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-white text-gray-500">Or continue with</span>
						</div>
					</div>

					<div className="flex flex-col gap-4 p-4">
					<ButtonGoogle cb={() => handleGoogleLogin()} />
				</div>
				</form >
			</FormProvider>
			<div className="mt-8 pt-8 border-t border-gray-200">
				<p className="text-sm text-gray-600 text-center">
					Already have an account?{' '}
					<a onClick={()=>setForm("login")} className="cursor-pointer text-emerald-600 hover:text-emerald-700" style={{ fontWeight: 500 }}>
						<u>Sign In</u>
					</a>
				</p>
			</div>
		</>
	);
}
