import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinLeagueByCode } from "../pickems/slices/leaguesJoinedSlice";
import { getLeagueByCode } from "../pickems/slices/leagueSlice";
import LoginModal from "./LoginModal";

const LeagueInvite = () => {
	const { code } = useParams();
	const dispatch = useDispatch();
	const [isJoinLoading, setIsJoinLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [displayedMessages, setDisplayedMessages] = useState([]);

	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);
	const { userInfo } = useSelector((state) => state.auth);
	const [isUserInLeague, setIsUserInLeague] = useState(false);

	const checkIfUserIsInLeague = () => {
		if (league && league.members) {
			if (league.members.some((member) => member._id === userInfo._id)) {
				setIsUserInLeague(true);
				showToastError("You are already in this league");
			}
		}
	};

	const showToast = (message) => {
		if (!displayedMessages.includes(message)) {
			toast.success(message);
			// Add the message to the tracking list
			setDisplayedMessages([...displayedMessages, message]);
		}
	};

	const showToastError = (message) => {
		if (!displayedMessages.includes(message)) {
			toast.error(message);
			// Add the message to the tracking list
			setDisplayedMessages([...displayedMessages, message]);
		}
	};

	const fetchLeagueDetails = async () => {
		try {
			let leagueDetails = await dispatch(getLeagueByCode(code));

			console.log(leagueDetails);

			if (leagueDetails.payload) {
				// toast.info("DONE");
			}
		} catch (error) {
			toast.info("Error");
		}
	}

	useEffect(() => {
		// console.log(userInfo);
		if (isError) {
			console.log(message);
			showToastError(message);
		}

		if (userInfo) {
			setIsModalOpen(false);
			if (league && league.members) {
				console.log("League and members are loaded");
				checkIfUserIsInLeague();
			}
		}

		if (league === null) {
			fetchLeagueDetails();
		}
	}, [code, dispatch, userInfo, isError, message, league]);

	const handleJoinLeague = async () => {
		if (isUserInLeague) {
			toast.info("You are already in this league");
			return;
		}

		try {
			const token = userInfo.token;

			setIsJoinLoading(true);

			const league = await dispatch(joinLeagueByCode({ code, token }));

			if (league.payload.name) {
				showToast(`Joined ${league.payload.name} Successfully`);

				const currentHost = window.location.host;

				// Redirect to the login page on the main domain
				const protocol = window.location.protocol;
				const dashboardUrl = `${protocol}//app.${currentHost}/`;
				window.location.href = dashboardUrl;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogin = async () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			{league && league.members ? (
				<div className='leagueInvite'>
					<div className='leagueInvite__container'>
						<div className='leagueInvite__details'>
							<div className='leagueInvite__header'>
								<p>You have been invited to</p>
								<h2>{league.name}</h2>
								<p>
									{league.sport} Pickems - {league.tier} Tier
								</p>
							</div>
							<div className='leagueInvite__activeMembers'>
								<p>
									{league.members.length}/{league.maxPlayers}{" "}
									Players
								</p>
							</div>
							<div className='leagueInvite__user'>
								{userInfo && userInfo.profilePicture ? (
									<>
										<img
											src={`/pfp/${userInfo.profilePicture}`}
											alt=''
										/>
										<h4>@{userInfo.username}</h4>
									</>
								) : (
									<>
										<h4>Please Log In To Join</h4>
									</>
								)}
							</div>
							<div className='leagueInvite__actions'>
								{userInfo ? (
									<button
										className={
											isUserInLeague
												? "btn btn--cta btn--disabled"
												: `btn btn--cta`
										}
										onClick={handleJoinLeague}
										disabled={isUserInLeague}>
										{isJoinLoading ? (
											<div className='spinner'></div>
										) : (
											<span>Join {league.name}</span>
										)}
									</button>
								) : (
									<button
										className='btn btn--cta'
										onClick={handleLogin}>
										Login
									</button>
								)}
							</div>
						</div>

						<div className='leagueInvite__members'>
							<div className='leagueInvite__members--title'>
								<h2>Current Members:</h2>
							</div>
							<div className='leagueInvite__currentMembers'>
								{league.members.map((member) => (
									<h4 key={member._id}>@{member.username}</h4>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{isLoading ? (
						<div className='leagueInvite'>
							<div className='centeredContainer'>
								<div className='spinner'></div>
							</div>
						</div>
					) : (
						<h4>
							Oops. Looks like this invite is either invalid or
							expired.
						</h4>
					)}
				</>
			)}
			{isModalOpen ? <LoginModal closeModal={handleLogin} /> : null}
		</>
	);
};

export default LeagueInvite;
