import * as Yup from 'yup';

// TODO: Solve type error with YupResolver in react-hook-form resolver opt

export const registerSchema = Yup.object().shape({
	username: Yup.string().min(6, 'Username must be at least 6 characters long.').required(),
	email: Yup.string().min(3, 'Email must be at least 3 characters long.').email('Invalid email address.').required('Email address is required.'),
	password: Yup.string().min(6, 'Password must be at least 6 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/\d/, 'Password must contain at least one number')
		.matches(/[!@#$%^&*:]/, 'Password must contain at least one special character')
		.required('Password is required'),
	passwordCopy: Yup.string().oneOf([Yup.ref("password")], "Passwords must match.")
})


export const loginSchema = Yup.object().shape({
	username: Yup.string().min(6, "Incorrect username or password. Please try again.").required('Username is required'),
	password: Yup.string().min(6, 'Incorrect username or password. Please try again.').matches(/[A-Z]/, 'Incorrect username or password. Please try again.')
		.matches(/[a-z]/, 'Incorrect username or password. Please try again.')
		.matches(/\d/, 'Incorrect username or password. Please try again.')
		.matches(/[!@#$%^&*:]/, 'Incorrect username or password. Please try again.')
		.required('Password is required'),
})
