import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../assets/images/powerpicks_logo.svg";

const Header = () => {
	return (
		<div className='header'>
			<div className='brand'>
				<LinkContainer to={"/"}>
					<img src={brandLogo} alt='PowerPicks logo' />
				</LinkContainer>
			</div>
			<div className='siteNavigation'>
				<ul className='siteNavigation__list'>
					<LinkContainer to={"/leagues"}>
						<li className='siteNavigation__item'>Leagues</li>
					</LinkContainer>
					<LinkContainer to={"/how-to-play"}>
						<li className='siteNavigation__item'>How To Play</li>
					</LinkContainer>
					<LinkContainer to={"/support"}>
						<li className='siteNavigation__item'>Support</li>
					</LinkContainer>
					<li className='siteNavigation__list--actions'>
						<LinkContainer to={"/sign-up"}>
							<button className='btn btn--cta'>Sign Up</button>
						</LinkContainer>
						<LinkContainer to={"/login"}>
							<button className='btn btn--secondary'>
								Log In
							</button>
						</LinkContainer>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
