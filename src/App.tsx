import { useState } from 'react';
import LoginForm from './forms/Login.forms';
import RegistrationForm from './forms/Registration.forms';

function App() {

	const [registrationActive, setRegistrationActive] = useState(false);

	return (
		<>
			<h1>FreelancePro</h1>
			<div>
				{!registrationActive ?
					<div>
						<LoginForm />
						<button onClick={() => setRegistrationActive(!registrationActive)} className="">
							Sign Up
						</button>
					</div>
					:
					<div>
						<RegistrationForm />
						<button onClick={() => setRegistrationActive(!registrationActive)} className="">
							Login
						</button>
					</div>
				}
			</div>
		</>
	);
}

export default App
