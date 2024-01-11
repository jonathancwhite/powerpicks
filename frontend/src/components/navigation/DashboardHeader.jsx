import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../assets/images/powerpicks_logo.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";

const DashboardHeader = () => {
	const auth = useSelector((state) => state.auth);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((word) => word[0].toUpperCase())
			.join("");
	};

	const profileIdentifier = getInitials(auth.userInfo.name);

	const navigate = useNavigate();

	useEffect(() => {
		if (!auth.userInfo) {
			navigate("/login");
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
	}, [auth.userInfo, navigate]);

	const handleUserDropdown = () => {
		setDropdownOpen(!dropdownOpen);
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
						<li className='siteNavigation__item'>My Leagues</li>
					</LinkContainer>
					<LinkContainer to={"/leagues"}>
						<li className='siteNavigation__item'>Find Leagues</li>
					</LinkContainer>
					<LinkContainer to={"/create-a-league"}>
						<li className='siteNavigation__item'>
							Create A League
						</li>
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
							<LinkContainer to='/logout'>
								<li>Log Out</li>
							</LinkContainer>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardHeader;
