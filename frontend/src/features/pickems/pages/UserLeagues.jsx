import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueByIdWithDetails, reset } from "../slices/leagueSlice";
import { IoMdCog } from "react-icons/io";
import { toast } from "react-toastify";
import MembersList from "../components/MembersList";
import CurrentLeagueSettingsModal from "../components/CurrentLeagueSettingsModal";

const UserLeagues = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const [hasDispatchedBeenCalled, setHasDispatchedBeenCalled] =
		useState(false);

	const [showLeagueSettingsModal, setShowLeagueSettingsModal] =
		useState(false);

	const fetchLeagueData = async (id, token) => {
		if (id.length === 0 || token.length === 0) {
			toast.error("Invalid league data");
			return;
		}

		if (hasDispatchedBeenCalled) {
			return;
		}

		try {
			console.log(`Fetching league data for ${id}`);
			let leagueData = await dispatch(
				getLeagueByIdWithDetails({ id, token }),
			);
			setHasDispatchedBeenCalled(true);
			if (leagueData.error) {
				toast.error(leagueData.error);
			}
		} catch (error) {
			console.log(error);
			toast.error(error);
		}
	};

	useEffect(() => {
		// if league has been loaded but it is not the correct league, reset the state
		console.log("GET THE ID BRO");
		console.log(`ID: ${id}`);
		console.log(league);

		if (league.length > 0 && league._id !== id) {
			fetchLeagueData(id, userInfo.token);
		} else if (league.length > 0 && league._id === id) {
			console.log("League data already loaded and correct");
		}

		// if no league has been loaded and the ID is valid, fetch the league data
		if (league.length === 0 && id.length > 1) {
			if (hasDispatchedBeenCalled) {
				toast.info("League data already requested");
				return;
			}
			fetchLeagueData(id, userInfo.token);
		}
	}, [id]);

	const handleSettingsClick = () => {
		setShowLeagueSettingsModal(!showLeagueSettingsModal);
	};

	const isOwner = league && league.createdBy === userInfo._id;

	return (
		<>
			{isLoading ? (
				<div className='centeredContainer'>
					<div className='spinner'></div>
				</div>
			) : league && league.members ? (
				<>
					<div className='currentLeague'>
						<div className='currentLeague__controlBar'>
							<div className='currentLeague__header'>
								<h2>{league.name}</h2>
								<span> {league.sport}</span>
							</div>
							<div className='currentLeague__settings'>
								<button
									className='btn btn--inline'
									onClick={handleSettingsClick}>
									<IoMdCog />
								</button>
								{showLeagueSettingsModal ? (
									<CurrentLeagueSettingsModal
										isAdmin={isOwner}
										closeHandler={handleSettingsClick}
										league={league}
									/>
								) : null}
							</div>
						</div>
						<div className='currentLeague__main'>
							<div className='currentLeague__paper xl'>
								<div className='centeredContainer'>
									<h3>Main Panel</h3>
								</div>
							</div>
							<div className='currentLeague__paper sm'>
								<div className='currentLeague__members'>
									<MembersList
										membersList={league.members}
										isAdmin={isOwner}
										leagueId={league._id}
										userId={userInfo._id}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='centeredContainer'>
					<p>League data is not available.</p>
				</div>
			)}
		</>
	);
};

export default UserLeagues;
