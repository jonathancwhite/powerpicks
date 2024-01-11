import LeagueData from "../sampleData/leagueData";
import { useSelector } from "react-redux";

const LeagueDisplay = () => {
	const filterSport = useSelector((state) => state.league.filter);

	const filteredLeagues = LeagueData.filter(
		(league) =>
			filterSport === "ALL" ||
			(league.active &&
				league.visibility === "public" &&
				league.members.length < league.totalMembersAllowed &&
				league.sport === filterSport),
	);

	const handleJoinLeague = (league_id) => {
		console.log(league_id);
	};

	return (
		<div className='leagues'>
			{filteredLeagues.map((league, index) => (
				<div
					className={`leagues__item leagues__item--${index}`}
					key={league.id}>
					<div className='league'>
						<div className='league__info'>
							<h6>{league.sport}</h6>
							<h5>{league.name}</h5>
							<p>{league.owner}</p>
						</div>
						<div className='league__actions'>
							<button
								className='btn btn--tertiary'
								onClick={() => handleJoinLeague(league.id)}>
								Play
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default LeagueDisplay;
