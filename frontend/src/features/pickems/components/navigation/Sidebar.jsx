import { LinkContainer } from "react-router-bootstrap";
import brandLogo from "../../../../assets/images/powerpicks_logo.svg";
import { IoIosTrophy, IoIosAddCircleOutline } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { IoCogSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import CreateLeagueModal from "../CreateLeagueModal";
import { getAllJoinedLeagues } from "../../slices/leaguesJoinedSlice";

const Sidebar = () => {
	const auth = useSelector((state) => state.auth);
	const { leaguesJoined, isLoading, isError, message } = useSelector(
		(state) => state.leaguesJoined,
	);

	const dispatch = useDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getAllJoinedLeagues(auth.userInfo._id));
	}, [isError, message, dispatch, auth.userInfo._id]);

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
					{/* Add Loading spinner while dispatch isLoading */}

					{isLoading ? (
						<div className='centeredContainer'>
							<div className='spinner'></div>
						</div>
					) : (
						leaguesJoined.map((league) => (
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
						))
					)}
				</div>
				<div className='sideBar__footer'>
					<div className='sideBar__profile'>
						<div className='profile__item'>
							<div className='profile__item--identifier'>
								<img
									src={`/pfp/${auth.userInfo.profilePicture}`}
									alt='profile picture'
								/>
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
			{isModalOpen && (
				<CreateLeagueModal
					closeModal={toggleModal}
					user={auth.userInfo}
				/>
			)}
		</div>
	);
};

export default Sidebar;
