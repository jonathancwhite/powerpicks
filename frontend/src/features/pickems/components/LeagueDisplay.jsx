import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJoinableLeagues } from "../slices/leaguesAvailableSlice";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import LeagueDisplayItem from "./LeagueDisplayItem";

const LeagueDisplay = () => {
	const filterSport = useSelector((state) => state.leaguesAvailable.filter);
	const { leaguesAvailable, isLoading, isError, message } = useSelector(
		(state) => state.leaguesAvailable,
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		dispatch(getAllJoinableLeagues());
	}, [isError, message, dispatch, navigate]);

	const filteredLeagues = leaguesAvailable.filter(
		(league) =>
			filterSport === "ALL" ||
			(league.isActive &&
				league.isPublic &&
				league.members.length < league.maxPlayers &&
				league.sport === filterSport),
	);

	const handleJoinLeague = (league_id) => {
		console.log(league_id);
	};

	return (
		<div className='leagues'>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<LeagueDisplayItem
					leagues={filteredLeagues}
					handler={handleJoinLeague}
				/>
			)}
		</div>
	);
};

export default LeagueDisplay;
