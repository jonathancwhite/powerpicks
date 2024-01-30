import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const Settings = ({ children }) => {
	const handleLogout = () => {
		console.log("logout");
	};

	return (
		<div className='settings'>
			<div className='settings__subNav'>
				<div className='sub-nav-content'>
					<div className='nav-section'>
						<div className='nav-section-header'>ACCOUNT</div>
						<LinkContainer to={"/settings/account"}>
							<div className='nav-item'>
								<div>Account Settings</div>
							</div>
						</LinkContainer>
					</div>
					<div className='nav-section'>
						<div className='nav-section-header'>PERSONAL</div>
						<LinkContainer to={"/settings/profile"}>
							<div className='nav-item'>
								<div>Profile</div>
							</div>
						</LinkContainer>
						<LinkContainer to={"/settings/preferences"}>
							<div className='nav-item'>
								<div>Preferences</div>
							</div>
						</LinkContainer>
					</div>
					<div className='nav-section'>
						<div className='nav-section-header'>SUPPORT</div>
						<LinkContainer to={"/support"}>
							<div className='nav-item'>
								<div>Account Settings</div>
							</div>
						</LinkContainer>
					</div>
				</div>
				<div className='sub-nav-footer'>
					<div className='logout-text' onClick={handleLogout}>
						Logout
					</div>
				</div>
			</div>
			{children}
		</div>
	);
};

export default Settings;
