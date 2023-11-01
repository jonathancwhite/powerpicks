import { LinkContainer } from "react-router-bootstrap";

const Login = () => {
	return (
		<>
			<h3>Login</h3>
			<form action=''>
				<div className='loginForm'>
					<label htmlFor='email'>EMAIL</label>
					<input
						type='text'
						name='email'
						id='email'
						placeholder='Type here...'
					/>
					<label htmlFor='password'>PASSWORD</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Type here...'
					/>
				</div>
				<div className='loginActions'>
					<div className='loginActions__forgot'>
						<LinkContainer to={"/forgot-password"}>
							<h5>FORGOT PASSWORD?</h5>
						</LinkContainer>
					</div>
					<button className='btn btn--cta btn--fullwidth'>
						Log In
					</button>
				</div>
			</form>
		</>
	);
};

export default Login;
