import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

	const [showLeagueSettingsModal, setShowLeagueSettingsModal] =
		useState(false);

	const fetchLeagueData = async (id, token) => {
		if (id.length === 0 || token.length === 0) {
			toast.error("Oops! We made a mistake, please refresh the page.");
			return;
		}

		try {
			let leagueData = await dispatch(
				getLeagueByIdWithDetails({ id, token }),
			);
			if (leagueData.error) {
				console.error(leagueData.error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (league === null) {
			fetchLeagueData(id, userInfo.token);
			// early exit so no other code is executed
			return;
		}
		// league data exists
		if (league._id) {
			if (league._id !== id) {
				fetchLeagueData(id, userInfo.token);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [league, id, userInfo.token]);

	const handleSettingsClick = () => {
		setShowLeagueSettingsModal(!showLeagueSettingsModal);
	};

	const isOwner = league && league.createdBy === userInfo._id;

	return (
		<>
			{isLoading ? (
				<div className='currentLeague'>
					<div className='currentLeague__controlBar'>
						<div className='currentLeague__header'></div>
						<div className='currentLeague__settings'>
							<button className='btn btn--inline'>
								<IoMdCog />
							</button>
						</div>
					</div>
					<div className='currentLeague__main'>
						<div className='currentLeague__paper xl'>
							<div className='centeredContainer'>
								<div className='spinner'></div>
							</div>
						</div>
						<div className='currentLeague__paper sm'>
							<div className='currentLeague__members'>
								<div className='centeredContainer'>
									<div className='spinner'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : league !== null && league.members ? (
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
