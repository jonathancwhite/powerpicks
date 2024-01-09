import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/userSlice";
import { toast } from "react-toastify";

const SignUpForm = () => {
	const initialFormData = {
		email: "",
		referral: "",
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		password: "",
		agreeToTerms: false,
	};

	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState(initialFormData);

	// const navigate = useNavigate();
	const dispatch = useDispatch();

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
		"Secure your account with a password.",
	];

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCheckboxChange = (e) => {
		console.log("Checkbox changed:", e.target.checked);
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const handleContinue = () => {
		if (currentStep < 4) {
			setCurrentStep(currentStep + 1);
		} else {
			if (formData.agreeToTerms && currentStep === 4) {
				try {
					dispatch(
						registerUser({
							firstName: formData.firstName,
							lastName: formData.lastName,
							email: formData.email,
							password: formData.password,
							dateOfBirth: formData.dateOfBirth,
						}),
					);
					// clearForm();
				} catch (err) {
					console.log(err);
					toast.error(err?.data?.message || err.error);
				}
			} else {
				toast.error("Please agree to our terms");
			}
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
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleInputChange}
							placeholder='Type here...'
						/>
						<div className='terms'>
							<input
								type='checkbox'
								name='agreeToTerms'
								checked={formData.agreeToTerms}
								onChange={handleCheckboxChange}
								key={formData.agreeToTerms}
							/>
							<label htmlFor='agreeToTerms'>
								I agree to the terms of service
							</label>
						</div>
					</>
				);
			default:
				return null;
		}
	};

	const clearForm = () => {
		setFormData(initialFormData);
	};

	return (
		<div className='signup'>
			<div className='progress'>
				<span>Step {currentStep} of 4</span>
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
							{currentStep < 4 ? "Continue" : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
