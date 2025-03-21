import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../assets/images/powerpicks_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/slices/authMutations";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ compressed, newAccount = false }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const currentHost = window.location.host;

	// Redirect to the login page on the main domain
	const protocol = window.location.protocol;
	const dashboardUrl = `${protocol}//app.${currentHost}/`;

	const [logoutApiCall, { isLoading }] = useLogoutMutation();
	const auth = useSelector((state) => state.auth);

	const handleLogout = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			toast.success("User logged out successfully");
			navigate("/");
		} catch (error) {
			toast.error(
				"User could not be logged out at this time, please refresh the page and try again.",
			);
		}
	};

	if (compressed) {
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
		)
	}

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
					{auth.userInfo ? (
						<>
							<li className='siteNavigation__list--actions'>
								<a href={dashboardUrl}>
									<button className='btn btn--cta'>
										Dashboard
									</button>
								</a>
								<LinkContainer to={""}>
									<button
										className='btn btn--secondary'
										onClick={handleLogout}
										disabled={isLoading}>
										{isLoading ? (
											<div className='spinner'></div>
										) : (
											"Log Out"
										)}
									</button>
								</LinkContainer>
							</li>
						</>
					) : (
						<li className='siteNavigation__list--actions'>
							<LinkContainer to={"/sign-up"}>
								<button className='btn btn--cta'>
									Sign Up
								</button>
							</LinkContainer>
							<LinkContainer to={"/login"}>
								<button className='btn btn--secondary'>
									Log In
								</button>
							</LinkContainer>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Header;
