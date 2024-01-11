import heroImage from "../../../assets/images/ai-football-stadium.jpg";

const Hero = ({ text }) => {
	return (
		<div className='hero'>
			<img src={heroImage} alt='sports pickems your way image' />
			<h3>{text}</h3>
		</div>
	);
};

export default Hero;
