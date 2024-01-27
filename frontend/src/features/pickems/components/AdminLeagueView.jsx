import { useDispatch } from "react-redux";
import { getMatchupsFromLeague } from "../slices/matchupSlice";
import PropTypes from "prop-types";

const AdminLeagueView = ({ league }) => {
	const dispatch = useDispatch();

	const getMatchups = () => {
		dispatch(getMatchupsFromLeague(league._id));
	};

	return (
		<div className='admin'>
			<h2>User is Admin</h2>
		</div>
	);
};

AdminLeagueView.propTypes = {
	league: PropTypes.object,
};

export default AdminLeagueView;
