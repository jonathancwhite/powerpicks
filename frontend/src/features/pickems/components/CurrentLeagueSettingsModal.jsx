import { useState } from "react";
import { toast } from "react-toastify";

const CurrentLeagueSettingsModal = ({ isAdmin, closeHandler, league }) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleModalContentClick = (e) => {
		e.stopPropagation();
	};

	const copyLeagueInviteURL = () => {
		const currentLeague = league;

		// console.log(currentLeague.inviteLinks[0].code);
		const code = currentLeague.inviteLinks[0].code;

		const inviteUrl = `http://jcwdev.local:5137/invite/${code}`;

		try {
			closeHandler();
			navigator.clipboard.writeText(inviteUrl);
			setIsCopied(true);
			toast.success("Invite code copied");
		} catch (err) {
			closeHandler();
			toast.error("Failed to copy invite code");
			console.log(inviteUrl);
		}
	};

	return (
		<div className='modal small'>
			<div className='modal-backdrop' onClick={closeHandler}>
				<div className='modal-item' onClick={handleModalContentClick}>
					<div className='current-league-modal'>
						<div className='modal-content'>
							<div
								className='current-league-modal-settings-item leagueInvite'
								onClick={copyLeagueInviteURL}>
								{isCopied ? (
									<>
										<h4>Invite Code Copied</h4>
										<p>Share with your friends</p>
									</>
								) : (
									<>
										<h4>Copy Invite Code</h4>
										<p>Invite league members</p>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentLeagueSettingsModal;
