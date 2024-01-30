import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../assets/images/powerpicks_logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../slices/authMutations";
import { logout } from "../../slices/authSlice";

const DashboardHeader = () => {
	const auth = useSelector((state) => state.auth);
	const [logoutApiCall] = useLogoutMutation();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((word) => word[0].toUpperCase())
			.join("");
	};

	const profileIdentifier = getInitials(auth.userInfo.name);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.userInfo) {
			toast.error("User info not found");
			return redirect("/");
		}

		// Event listener to close dropdown when clicked outside
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [auth.userInfo]);

	const handleUserDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleLogout = async () => {
		try {
			await logoutApiCall().unwrap();

			dispatch(logout());
		} catch (error) {
			toast.error(
				"User could not be logged out at this time, please refresh the page and try again.",
			);
		}
	};

	return (
		<div className='header header--app'>
			<div className='brand'>
				<LinkContainer to={"/"}>
					<img src={brandLogo} alt='PowerPicks logo' />
				</LinkContainer>
			</div>
			<div className='siteNavigation siteNavigation--app'>
				<ul className='siteNavigation__list'>
					<LinkContainer to={"/leagues"}>
						<li className='siteNavigation__item'>Find Leagues</li>
					</LinkContainer>
					<LinkContainer to={"/create-a-league"}>
						<li className='siteNavigation__item'>
							Create A League
						</li>
					</LinkContainer>
					<LinkContainer to={"/invite"}>
						<li className='siteNavigation__item'>Invite Friends</li>
					</LinkContainer>
				</ul>
			</div>
			<div className='userNavigation' onClick={handleUserDropdown}>
				<div className='userNavigation__identifier'>
					<span className='userInitials'>{profileIdentifier}</span>
				</div>
				<div className='userNavigation__dropdownIcon'>
					<GoChevronDown />
				</div>
				{dropdownOpen && (
					<div className='userNavigation__dropdown'>
						<ul>
							<LinkContainer to='/league-history'>
								<li>League History</li>
							</LinkContainer>
							<LinkContainer to='/support'>
								<li>Support</li>
							</LinkContainer>
							<LinkContainer to='/settings'>
								<li>Settings</li>
							</LinkContainer>
							<li onClick={handleLogout}>Log Out</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardHeader;
