import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footerNavigation'>
				<div className='footerNavigation__navs'>
					<div className='productNav'>
						<ul className='productNav__list'>
							<li className='productNav__item'>
								<h3>PRODUCT</h3>
							</li>
							<LinkContainer to={"/leagues"}>
								<li className='productNav__item'>Esports</li>
							</LinkContainer>
							<LinkContainer to={"/leagues"}>
								<li className='productNav__item'>NCAAFB</li>
							</LinkContainer>
							<LinkContainer to={"/leagues"}>
								<li className='productNav__item'>NFL</li>
							</LinkContainer>
							<LinkContainer to={"/leagues"}>
								<li className='productNav__item'>NBA</li>
							</LinkContainer>
						</ul>
					</div>
					<div className='resourcesNav'>
						<ul className='resourcesNav__list'>
							<li className='resourcesNav__item'>
								<h3>RESOURCES</h3>
							</li>
							<LinkContainer to={"/terms-of-service"}>
								<li className='resourcesNav__item'>
									Terms of Service
								</li>
							</LinkContainer>
							<LinkContainer to={"/privacy-policy"}>
								<li className='resourcesNav__item'>
									Privacy Policy
								</li>
							</LinkContainer>
							<LinkContainer to={"/responsible-gambling"}>
								<li className='resourcesNav__item'>
									Responsible Gambling
								</li>
							</LinkContainer>
						</ul>
					</div>
					<div className='supportNav'>
						<ul className='supportNav__list'>
							<li className='supportNav__item'>
								<h3>SUPPORT</h3>
							</li>
							<LinkContainer to={"/help"}>
								<li className='supportNav__item'>
									Help Center
								</li>
							</LinkContainer>
							<LinkContainer to={"/deposits"}>
								<li className='supportNav__item'>Deposits</li>
							</LinkContainer>
							<LinkContainer to={"/withdrawals"}>
								<li className='supportNav__item'>
									Withdrawals
								</li>
							</LinkContainer>
							<LinkContainer to={"/sitemap"}>
								<li className='supportNav__item'>Sitemap</li>
							</LinkContainer>
						</ul>
					</div>
					<div className='socialNav'>
						<ul className='socialNav__list'>
							<li className='socialNav__item'>
								<h3>SOCIALS</h3>
							</li>
							<li className='socialNav__item'>
								<a href='https://twitter.com/'>Twitter</a>
							</li>
							<li className='socialNav__item'>
								<a href='https://facebook.com'>Facebook</a>
							</li>
							<li className='socialNav__item'>
								<a href='https://instagram.com/'>Instagram</a>
							</li>
							<li className='socialNav__item'>
								<a href='https://discord.com'>Discord</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
