import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { post } from '../services/httpClient.service.ts';
import TextInput from '@/components/Input.component.tsx';

type FormValues = {
	username: string,
	password: string
}

export default function LoginForm() {
	const methods = useForm<FormValues>();


	function onSubmit(formData: FormValues) {
		post('http://localhost:5000/auth/login', formData);
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
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<TextInput
					type="text"
					label="Username"
					inputName="username"
					direction="column"
					placeholder="Enter username"
				/>
				<TextInput
					type="password"
					label="Password"
					inputName="password"
					direction="column"
					placeholder="Enter password"
				/>
				<button
					className="btn btn-submit"
					type="submit">
					Login
				</button>
			</form >
		</FormProvider>
	)
}
