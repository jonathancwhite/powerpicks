import LeagueFilter from "../components/league/LeagueFilter";
import LeagueDisplay from "../components/league/LeagueDisplay";
import { useSelector } from "react-redux";

const Leagues = () => {
	const filter = useSelector((state) => state.sport);

	return (
		<div className='activeLeagues'>
			<div className='activeLeagues__header'>
				<h2>Active Leagues</h2>
			</div>
			<LeagueFilter />
			<LeagueDisplay filterSport={filter} />
		</div>
	);
};

export default Leagues;
