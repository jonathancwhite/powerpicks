import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJoinableLeagues } from "../slices/leagueSlice";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import LeagueDisplayItem from "./LeagueDisplayItem";

const LeagueDisplay = () => {
	const filterSport = useSelector((state) => state.league.filter);
	const { leagues, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			console.log(isError);
		}

		dispatch(getAllJoinableLeagues());
	}, [isError, message, dispatch, navigate]);

	const filteredLeagues = leagues.filter(
		(league) =>
			filterSport === "ALL" ||
			(league.active &&
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
