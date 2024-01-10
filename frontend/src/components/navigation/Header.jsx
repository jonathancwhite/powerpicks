import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../assets/images/powerpicks_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/userSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
	const userInfo = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const handleLogout = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			toast.success("User logged out successfully");
			navigate("/login");
		} catch (error) {
			console.log(error);
			toast.error(
				"User could not be logged out at this time, please refresh the page and try again.",
			);
		}
	};

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
					{userInfo ? (
						<>
							<li className='siteNavigation__list--actions'>
								<LinkContainer to={""}>
									<button className='btn btn--cta'>
										Dashboard
									</button>
								</LinkContainer>
								<LinkContainer to={""}>
									<button
										className='btn btn--secondary'
										onClick={handleLogout}>
										Log Out
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
