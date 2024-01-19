import { IoMdRemoveCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeMemberById } from "../slices/leagueSlice.js";

const MembersList = ({ membersList, isAdmin, leagueId, userId }) => {
	const dispatch = useDispatch();

	const handleRemoveMember = (e) => {
		let memberElement =
			e.target.parentElement.parentElement.parentElement.parentElement;
		let memberId = memberElement.getAttribute("data-member-id");

		if (memberId === null) {
			toast.error(
				"Count not remove member from league. Please try again.",
			);
		}

		try {
			dispatch(removeMemberById(memberId, leagueId));
		} catch (error) {
			toast.error(error.message);
		}

		toast.info(`Removing member ${memberId} from league ${leagueId}`);
	};

	return (
		<div className='membersList'>
			<div className='membersList__header'>
				<h3>Members</h3>
			</div>
			{membersList.map((member) => (
				<div
					className='membersList__member'
					data-member-id={member._id}
					key={member._id}>
					<div className='membersList__details'>
						<img
							src={`/pfp/${member.profilePicture}`}
							alt={"profile picture - generic"}
						/>
						<p key={member._id}>@{member.username}</p>
					</div>
					{isAdmin && userId !== member._id ? (
						<div className='membersList__controls'>
							<button
								onClick={(e) => handleRemoveMember(e)}
								className='btn btn--remove'>
								<IoMdRemoveCircle />
							</button>
						</div>
					) : null}
				</div>
			))}
		</div>
	);
};

export default MembersList;
