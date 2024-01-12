import React from "react";
import LeagueFilter from "../components/navigation/LeagueFilter";
import LeagueDisplay from "../components/LeagueDisplay";
import { useSelector } from "react-redux";

const ActiveLeagues = () => {
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

export default ActiveLeagues;
