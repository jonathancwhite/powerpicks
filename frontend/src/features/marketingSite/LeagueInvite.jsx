import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinLeagueByCode } from "../pickems/slices/leaguesJoinedSlice";
import { validateUser } from "../../services/authService";
import { setCredentials, logout } from "../../slices/authSlice";
import { getLeagueByCode } from "../pickems/slices/leagueSlice";

const LeagueInvite = () => {
	const { code } = useParams();
	const dispatch = useDispatch();
	const [isJoinLoading, setIsJoinLoading] = useState(false);

	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			console.log(message);
			toast.error(message);
		}

		dispatch(getLeagueByCode(code));
	}, [code]);

	const handleJoinLeague = async () => {
		try {
			const token = userInfo.token;

			setIsJoinLoading(true);

			const league = await dispatch(joinLeagueByCode({ code, token }));

			if (league.payload.name) {
				toast.success(`Joined ${league.payload.name} Successfully`);

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

	const handleLogin = async () => {};

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
										className='btn btn--cta'
										onClick={handleJoinLeague}>
										{isJoinLoading ? (
											<div className='spinner'></div>
										) : (
											<span>Join {league.name}</span>
										)}
									</button>
								) : (
									<button
										className='btn btn--secondary'
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
		</>
	);
};

export default LeagueInvite;
