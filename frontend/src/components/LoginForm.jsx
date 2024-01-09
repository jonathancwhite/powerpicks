import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser, reset } from "../slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

	const { isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.user,
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState(initialFormData);

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = () => {
		try {
			dispatch(
				authUser({
					email: formData.email,
					password: formData.password,
				}),
			);
		} catch (err) {
			console.log(err);
			toast.error(err?.data?.message || err.error);
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success("Logged In successfully!");
			navigate("/");
		}

		return () => {
			dispatch(reset());
		};
	}, [isError, isSuccess, message, dispatch]);

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
