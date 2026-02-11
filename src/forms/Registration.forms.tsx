import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { post } from '../services/httpClient.service.ts'
import TextInput from "@/components/Input.component";
import { registerSchema } from "@/services/yupResolver.service.ts";

export default function RegistrationForm() {

	interface FormValues {
		username: string,
		email: `${string}@${string}`,
		password: string,
		passwordCopy: string

	}

	const methods = useForm<FormValues>({})

	function onSubmit(formData: FormValues) {
		post('http://localhost:5000/auth/register', formData);
	}

	return (
		<>
			<FormProvider {...methods}>
				<span className="form-error">{methods.formState.errors.username?.message}</span>
				<span className="form-error">{methods.formState.errors.email?.message}</span>
				<span className="form-error">{methods.formState.errors.password?.message}</span>
				<span className="form-error">{methods.formState.errors.passwordCopy?.message}</span>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<TextInput
						type="text"
						label="Username"
						inputName="username"
						direction="column"
						placeholder="Enter username"
					/>
					<TextInput
						type="email"
						label="Email Address"
						inputName="email"
						direction="column"
						placeholder="Enter email address"
					/>
					<TextInput
						type="password"
						label="Password"
						inputName="password"
						direction="column"
						placeholder="Enter password"
					/>
					<TextInput
						type="password"
						label="Confirm Password"
						inputName="passwordCopy"
						direction="column"
						placeholder="Confirm password"
					/>
					{/* TODO: INSERT TOS AGREEMENT AND SUB OPTION HERE */}
					<button
						className="btn btn-submit"
						type="submit">
						Register
					</button>
				</form >
			</FormProvider>
		</>
	);
}
