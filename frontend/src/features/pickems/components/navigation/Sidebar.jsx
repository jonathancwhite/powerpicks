import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../../../assets/images/powerpicks_logo.svg";
import { IoIosTrophy, IoIosAddCircleOutline } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IoCogSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import CreateLeagueModal from "../CreateLeagueModal";
import { getUserLeagues } from "../../slices/leagueSlice";

const Sidebar = () => {
	const auth = useSelector((state) => state.auth);
	const { leagues, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((word) => word[0].toUpperCase())
			.join("");
	};

	const profileIdentifier = getInitials(auth.userInfo.name);

	useEffect(() => {
		if (isError) {
			console.log("error");
			console.log(isError);
		}

		dispatch(getUserLeagues());
	}, [isError, message, dispatch]);

	return (
		<div className='sideBar'>
			<div className='sideBar__nav' role='navigation'>
				<div className='sideBar__header'>
					<LinkContainer to={"/"}>
						<img src={brandLogo} alt='PowerPicks Logo' />
					</LinkContainer>
				</div>
				<div className='sideBar__body'>
					<LinkContainer to={"/"}>
						<a className='sideBar__nav--item'>
							<div className='active-indicator-wrapper'>
								<div className='selected-indicator'></div>
							</div>
							<div className='sideBar__nav--icon'>
								<MdHome />
							</div>
							<div className='sideBar__nav--title'>Home</div>
						</a>
					</LinkContainer>
					<LinkContainer to={"/leagues"}>
						<a className='sideBar__nav--item'>
							<div className='active-indicator-wrapper'>
								<div className='selected-indicator'></div>
							</div>
							<div className='sideBar__nav--icon'>
								<IoIosTrophy />
							</div>
							<div className='sideBar__nav--title'>Leagues</div>
						</a>
					</LinkContainer>
					<div className='sideBar__section'>
						<div className='sideBar__sectionHeader'>
							<div className='sideBar__sectionHeader--title'>
								Your Leagues
							</div>
							<div
								className='sideBar__sectionHeader--icon'
								onClick={toggleModal}>
								<IoIosAddCircleOutline />
							</div>
						</div>
					</div>
					{leagues.map((league) => (
						<LinkContainer
							to={`/leagues/${league._id}`}
							key={league._id}>
							<div className='sideBar__navLeagueItem'>
								<div className='topic-indicator'>
									<div className='indicator'></div>
								</div>
								<div className='selected-indicator-wrapper'>
									<div className='selected-indicator'></div>
								</div>

								<div className='nav-league-item'>
									<div className='nav-info-container'>
										<div className='league-name'>
											{league.name}
										</div>
										<div className='format-container'>
											<div className='sport'>
												{league.sport}
											</div>
										</div>
									</div>
								</div>
							</div>
						</LinkContainer>
					))}
				</div>
				<div className='sideBar__footer'>
					<div className='sideBar__profile'>
						<div className='profile__item'>
							<div className='profile__item--identifier'>
								<span className='userInitials'>
									{profileIdentifier}
								</span>
							</div>
							<div className='profile__item--name'>
								@{auth.userInfo.username}
							</div>
							<LinkContainer to={"/settings/account"}>
								<div className='profile__item--settings'>
									<IoCogSharp />
								</div>
							</LinkContainer>
						</div>
					</div>
				</div>
			</div>
			{isModalOpen && <CreateLeagueModal closeModal={toggleModal} />}
		</div>
	);
};

export default Sidebar;
