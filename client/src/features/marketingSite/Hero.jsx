import heroImg from "../../assets/images/sportsPickemsYourWay.png";

// add progressive image loading or lazy loading
const Hero = () => {
	return (
		<div className='hero'>
			<img src={heroImg} alt='sports pickems your way image' />
		</div>
	);
};

export default Hero;
