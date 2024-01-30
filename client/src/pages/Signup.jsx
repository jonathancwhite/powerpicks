import SignUpForm from "../features/marketingSite/SignUpForm";
import mobileMockup from "../assets/images/iphone-blank.png";

const Signup = () => {
	return (
		<>
			<div className='container page--signup'>
				<SignUpForm />
				<div className='mobileMock'>
					<img src={mobileMockup} alt='' />
				</div>
			</div>
		</>
	);
};

export default Signup;
