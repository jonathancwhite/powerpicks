import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CurrentLeagueSettingsModal = ({ isAdmin, closeHandler, league }) => {
	const navigate = useNavigate();

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

	const handleTransfer = async () => {
		if (isAdmin) {
			closeHandler();
			// will need to select a new owner
			toast.info(`You have transfered ownership of ${league.name} to: `);
		} else {
			// leave league logic (await)
			closeHandler();
			console.log("leave team");
			toast.info(`You have left ${league.name}`);
			navigate("/");
		}
	};

	const handleDeleteLeague = async () => {
		if (isAdmin) {
			// delete league logic
			console.log("delete league");
			toast.info(`${league.name} would have been deleted`);
			navigate("/");
		}
	};

	return (
		<div className='modal settings small'>
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
							<div
								className='current-league-modal-settings-item transfer'
								onClick={handleTransfer}>
								{isAdmin ? (
									<>
										<h4>Transfer Ownership</h4>
										<p>
											Transfer ownership of this league to
											another member
										</p>
									</>
								) : (
									<>
										<h4>Leave League</h4>
										<p>Leave this league</p>
									</>
								)}
							</div>
							<div
								className='current-league-modal-settings-item delete'
								onClick={handleDeleteLeague}>
								{isAdmin ? (
									<>
										<h4>Close League</h4>
										<p>
											This will permanently delete the
											league.
										</p>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentLeagueSettingsModal;
