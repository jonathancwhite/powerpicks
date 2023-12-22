import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../assets/images/powerpicks_logo.svg";

const HeaderCompressed = ({ newAccount = false }) => {
	return (
		<div className='header'>
			<div className='brand'>
				<LinkContainer to={"/"}>
					<img src={brandLogo} alt='PowerPicks logo' />
				</LinkContainer>
			</div>
			<div
				className={`${
					newAccount ? "siteNavigation compressed" : "vHidden"
				}`}>
				<ul className='siteNavigation__list'>
					<LinkContainer to={"/login"}>
						<li className='siteNavigation__item'>
							Have an account?
						</li>
					</LinkContainer>
				</ul>
			</div>
		</div>
	);
};

export default HeaderCompressed;
