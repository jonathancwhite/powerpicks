import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLeagueByIdWithDetails } from "../slices/leagueSlice";
import { IoMdCog } from "react-icons/io";
import { toast } from "react-toastify";
import MembersList from "../components/MembersList";
import CurrentLeagueSettingsModal from "../components/CurrentLeagueSettingsModal";

const UserLeagues = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const [showLeagueSettingsModal, setShowLeagueSettingsModal] =
		useState(false);

	const token = Cookies.get("jwt");

	useEffect(() => {
		if (!userInfo) {
			navigate("/login"); // early return
		}

		try {
			dispatch(getLeagueByIdWithDetails({ id, token }));
		} catch (error) {
			console.log(error);
		}
	}, [id, userInfo, navigate]);

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
