import React, { useState } from "react";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = () => {
		console.log(formData);
	};

	return (
		<div className='login'>
			<div className='loginForm'>
				<div className='stepHeader'>
					<h2>Log In</h2>
				</div>
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={formData.email}
						onChange={handleInputChange}
						placeholder='Type here...'
						autoComplete='off'
					/>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						value={formData.password}
						onChange={handleInputChange}
						placeholder='Type here...'
					/>
					<div className='loginForm__actions'>
						<button
							className='btn btn--cta'
							onClick={handleFormSubmit}>
							Log In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
