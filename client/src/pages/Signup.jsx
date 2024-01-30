import Register from "../components/form/Register";
import mobileMockup from "../assets/images/iphone-blank.png";

const Signup = () => {
	return (
		<>
			<div className='container page--signup'>
				<Register />
				<div className='mobileMock'>
					<img src={mobileMockup} alt='' />
				</div>
			</div>
		</>
	);
};

export default Signup;
