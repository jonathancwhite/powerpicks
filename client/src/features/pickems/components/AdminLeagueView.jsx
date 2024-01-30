import PropTypes from "prop-types";

const AdminLeagueView = ({ league, user }) => {
	return (
		<>
			<h1>Admin View</h1>
			<p>Work In Progress</p>
		</>
	);
};

PropTypes.AdminLeagueView = {
	league: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

export default AdminLeagueView;
