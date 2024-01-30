import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllJoinableLeagues } from "../../redux/slices/leaguesAvailableSlice";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import LeagueDisplayItem from "./LeagueDisplayItem";

const LeagueDisplay = () => {
	const filterSport = useSelector((state) => state.leaguesAvailable.filter);
	const { leaguesAvailable, isLoading, isError, message } = useSelector(
		(state) => state.leaguesAvailable,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (leaguesAvailable === null) {
			dispatch(getAllJoinableLeagues());
		}
	}, [isError, message, dispatch, leaguesAvailable]);

	const getFilteredLeagues = () => {
		if (!leaguesAvailable) {
			return [];
		}

		return leaguesAvailable.filter(
			(league) =>
				filterSport === "ALL" ||
				(league.isActive &&
					league.isPublic &&
					league.members.length < league.maxPlayers &&
					league.sport === filterSport),
		);
	};

	const filteredLeagues = getFilteredLeagues();

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
