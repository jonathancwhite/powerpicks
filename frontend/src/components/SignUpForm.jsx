import React, { useState } from "react";

const SignUpForm = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		email: "",
		referral: "",
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		address: "",
		password: "",
		agreeToTerms: false,
	});

	const stepHeaders = [
		"Enter Your Email",
		"What's Your Name?",
		"When Were You Born?",
		"Where Do You Live?",
		"Set Your Password",
	];

	const stepDescriptions = [
		"You'll use this to log into your account.",
		"Tell us a little about yourself.",
		"We need this for age verification.",
		"Your address is required.",
		"Secure your account with a password.",
	];

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const handleContinue = () => {
		if (currentStep < 5) {
			setCurrentStep(currentStep + 1);
		} else {
			// Submit the form
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const renderFormFields = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
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
						<label htmlFor='referral'>
							Referral Code (OPTIONAL)
						</label>
						<input
							type='text'
							name='referral'
							id='referral'
							value={formData.referral}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
					</>
				);
			case 2:
				return (
					<>
						<label htmlFor='firstName'>First Name</label>
						<input
							type='text'
							name='firstName'
							id='firstName'
							value={formData.firstName}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
						<label htmlFor='lastName'>Last Name</label>
						<input
							type='text'
							name='lastName'
							id='lastName'
							value={formData.lastName}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
					</>
				);
			case 3:
				return (
					<>
						<label htmlFor='dateOfBirth'>Date of Birth</label>
						<input
							type='date'
							name='dateOfBirth'
							id='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleInputChange}
						/>
					</>
				);
			case 4:
				return (
					<>
						<label htmlFor='address'>Address</label>
						<input
							type='text'
							name='address'
							id='address'
							value={formData.address}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
					</>
				);
			case 5:
				return (
					<>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
						<label>
							<input
								type='checkbox'
								name='agreeToTerms'
								checked={formData.agreeToTerms}
								onChange={handleCheckboxChange}
							/>
							I agree to the terms of service
						</label>
					</>
				);
			default:
				return null;
		}
	};

	return (
		<div className='signup'>
			<div className='progress'>
				<span>Step {currentStep} of 5</span>
				<div className='progress__bar'>
					<div className={`progress__bar--${currentStep}`}></div>
				</div>
			</div>
			<div className='signupForm'>
				<div className='stepHeader'>
					<h2>{stepHeaders[currentStep - 1]}</h2>
					<p>{stepDescriptions[currentStep - 1]}</p>
				</div>
				<form onSubmit={(e) => e.preventDefault()}>
					{renderFormFields()}
					<div className='signupForm__actions'>
						{currentStep > 1 && (
							<button
								className='btn btn--secondary'
								onClick={handleBack}>
								Back
							</button>
						)}
						<button
							className='btn btn--cta'
							onClick={handleContinue}>
							{currentStep < 5 ? "Continue" : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
