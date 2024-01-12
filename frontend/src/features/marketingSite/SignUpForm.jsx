import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";

const SignUpForm = () => {
	const inDevelopment = true;

	//swap to const when inDevelopment is false
	let initialFormData = {
		email: "",
		referral: "",
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		password: "",
		agreeToTerms: false,
	};

	if (inDevelopment) {
		initialFormData = {
			email: "testemail@email.com",
			referral: "",
			firstName: "Jon",
			lastName: "Test",
			dateOfBirth: "02-18-1997",
			password: "iRZygRV*BsAy",
			agreeToTerms: true,
		};
	}

	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState(initialFormData);
	const [formErrors, setFormErrors] = useState({});

	const [register] = useRegisterMutation();

	// const navigate = useNavigate();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const stepHeaders = [
		"Enter Your Email",
		"What's Your Name?",
		"When Were You Born?",
		"Set Your Password",
	];

	const stepDescriptions = [
		"You'll use this to log into your account.",
		"Tell us a little about yourself.",
		"We need this for age verification.",
		"Secure your account with a password.",
	];

	const isValidEmail = (email) => {
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		return { isValid, message: isValid ? "" : "Invalid email address" };
	};

	const isValidName = (name) => {
		const isValid = name.trim() !== "" && name.length > 3;
		return {
			isValid,
			message: isValid
				? ""
				: "Please correct your name. Name must be longer than 3 characters.",
		};
	};

	const isOlderThan18 = (dateOfBirth) => {
		const dob = new Date(dateOfBirth);
		const ageDiffMs = Date.now() - dob.getTime();
		const ageDate = new Date(ageDiffMs);
		const isValid = ageDate.getUTCFullYear() - 1970 >= 18;

		return {
			isValid,
			message: isValid ? "" : "User must be over the age of 18",
		};
	};
	const isValidPassword = (password) => {
		const isValid =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{12,})/.test(password);
		return {
			isValid,
			message: isValid
				? ""
				: "Not a valid password. Passwords must be more than 12 characters and contain at least 1 uppercase letter and 1 lowercase letter as well as 1 special character (ex: !@#).",
		};
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setFormErrors({ ...formErrors, [e.target.name]: "" });
	};

	const handleCheckboxChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.checked });
	};

	const handleContinue = async () => {
		// Validation based on current step
		let isValid = true;
		let errors = {};

		switch (currentStep) {
			case 1: {
				const emailValidation = isValidEmail(formData.email);
				if (!emailValidation.isValid) {
					errors.email = emailValidation.message;
					isValid = false;
					toast.error(errors.email);
				}
				break;
			}
			case 2: {
				const firstNameValidation = isValidName(formData.firstName);
				const lastNameValidation = isValidName(formData.lastName);

				if (!firstNameValidation.isValid) {
					errors.firstName = firstNameValidation.message;
					isValid = false;
					toast.error("Please provide a valid first name.");
				}

				if (!lastNameValidation.isValid) {
					errors.lastName = lastNameValidation.message;
					isValid = false;
					toast.error("Please provide a valid last name.");
				}
				break;
			}
			case 3:
				{
					const ageValidation = isOlderThan18(formData.dateOfBirth);
					if (!ageValidation.isValid) {
						errors.dateOfBirth = ageValidation.message;
						isValid = false;
						toast.error(errors.dateOfBirth);
					}
				}
				break;
			case 4: {
				const passwordValidation = isValidPassword(formData.password);
				if (!passwordValidation.isValid) {
					errors.password = passwordValidation.message;
					isValid = false;
					toast.error(errors.password);
				}
				break;
			}
			default:
				break;
		}

		setFormErrors(errors);

		if (isValid) {
			if (currentStep < 4) {
				setCurrentStep(currentStep + 1);
			} else if (formData.agreeToTerms) {
				try {
					const user = await register(formData).unwrap();
					dispatch(setCredentials(user));
					clearForm();
					navigate("/");
				} catch (err) {
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
							className={formErrors.email ? "error" : ""}
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
							className={formErrors.firstName ? "error" : ""}
							type='text'
							name='firstName'
							id='firstName'
							value={formData.firstName}
							onChange={handleInputChange}
							placeholder='Type here...'
							autoComplete='off'
						/>
						<label htmlFor='lastName'>Last Name</label>
						<input
							className={formErrors.lastName ? "error" : ""}
							type='text'
							name='lastName'
							id='lastName'
							value={formData.lastName}
							onChange={handleInputChange}
							placeholder='Type here...'
							autoComplete='off'
						/>
					</>
				);
			case 3:
				return (
					<>
						<label htmlFor='dateOfBirth'>Date of Birth</label>
						<input
							className={formErrors.dateOfBirth ? "error" : ""}
							type='date'
							name='dateOfBirth'
							id='dateOfBirth'
							value={formData.dateOfBirth}
							onChange={handleInputChange}
							autoComplete='off'
						/>
					</>
				);
			case 4:
				return (
					<>
						<label htmlFor='password'>Password</label>
						<input
							className={formErrors.password ? "error" : ""}
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleInputChange}
							placeholder='Type here...'
							autoComplete='new-password'
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
