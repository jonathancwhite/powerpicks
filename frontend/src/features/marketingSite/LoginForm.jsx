import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../slices/userSlice.js";
import { setCredentials } from "../../slices/authSlice.js";

const LoginForm = () => {
	const inDevelopment = true;

	let initialFormData = {
		email: "",
		password: "",
	};

	if (inDevelopment) {
		initialFormData = {
			email: "testemail@email.com",
			password: "iRZygRV*BsAy",
		};
	}

	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState(initialFormData);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async () => {
		try {
			const user = await login(formData).unwrap();
			let credentials = dispatch(setCredentials(user));

			if (credentials.payload.message === "User logged in successfully") {
				toast.success(credentials.payload.message);
			}
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
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
						autoComplete='current-password'
					/>
					<div className='loginForm__actions'>
						<button
							className='btn btn--cta'
							onClick={handleFormSubmit}
							disabled={isLoading}>
							{isLoading ? (
								<div className='spinner'></div>
							) : (
								"Log In"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
