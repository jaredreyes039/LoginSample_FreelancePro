import TextInput from "@/components/Input.component";
import { useIndexFormContext } from "@/context/IndexFormContext"
import { forgotPassSchema } from "@/utils/yupResolver.util";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form"
import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm(){

	interface FormValues {
		email: string
	}

	const methods = useForm<FormValues>({
		resolver: yupResolver(forgotPassSchema)
	})
	
	const { setForm } = useIndexFormContext();

	const [errors, setErrors] = useState<string[]>([])

	async function onSubmit(formData: FormValues) {
		const res = await axios.post(import.meta.env.VITE_FORGOT_PASS_URL, formData, { validateStatus: (status) => { return status <= 500 }, withCredentials: true });
		if (res.status !== 200) {
			setErrors((prev: any) => [...prev, "We couldn't find an account associated with that email, please check your input and try again."])
		}
		else {
			setForm("login")
		}
	}
	
	return(
		<>
			<FormProvider {...methods}>
				<span className="form-error text-red-500">{errors.length > 0 ? errors[errors.length - 1] : ''}</span>
				<form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<TextInput
						type="text"
						label="Email Address"
						inputName="emailAddress"
						direction="column"
						placeholder="Enter email address"
						className="pl-10 pr-10 bg-white border-gray-300 focus:border-green-100 focus:ring-green-100"
					/>
					<div className="flex flex-col gap-4 justify-between w-full">
						<button
							className="btn"
							type="submit"
						>
							Submit
						</button>
						<button
							onClick={(e)=>{e.preventDefault();setForm("login")}}
							className="text-sm text-green-200 hover:text-emerald-700 hover:underline hover:cursor-pointer"
							style={{ fontWeight: 500 }}>
							Return to Login
						</button>
					</div>
				</form>
			</FormProvider>
		</>
	)
}
