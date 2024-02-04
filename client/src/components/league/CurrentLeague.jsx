import PropTypes from "prop-types";
import CurrentLeagueSettingsModal from "../modals/LeagueSettings";
import PickSelection from "./PickSelection";
import MembersList from "./MembersList";
import { IoMdCog, IoMdPeople } from "react-icons/io";
import { useState } from "react";

const CurrentLeague = ({ league, currentLeagueState }) => {
	const [showLeagueSettingsModal, setShowLeagueSettingsModal] =
		useState(false);
	const [showMembersList, setShowMembersList] = useState(false);

	const { userInfo, isOwner } = currentLeagueState;

	const handleSettingsClick = () => {
		setShowLeagueSettingsModal(!showLeagueSettingsModal);
	};

	const handleToggleMembersList = () => {
		setShowMembersList(!showMembersList);
	};

	return (
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
					<button
						className='btn btn--inline'
						onClick={handleToggleMembersList}>
						<IoMdPeople />
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
			{showMembersList ? (
				<div className='currentLeague__main'>
					<div className='currentLeague__paper xl'>
						<div className='centeredContainer'>
							<PickSelection
								isOwner={isOwner}
								league={league}
								user={userInfo}
							/>
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
			) : (
				<div className='currentLeague__main'>
					<div className='currentLeague__paper'>
						<div className='centeredContainer'>
							<PickSelection
								isOwner={isOwner}
								league={league}
								user={userInfo}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

CurrentLeague.propTypes = {
	league: PropTypes.object.isRequired,
	currentLeagueState: PropTypes.object.isRequired,
	handleSettingsClick: PropTypes.func.isRequired,
};

export default CurrentLeague;
