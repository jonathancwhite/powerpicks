import LeagueData from "../sampleData/leagueData";
import { IoMdAddCircleOutline } from "react-icons/io";

const FeaturedLeagueSlider = () => {
	let featuredLeagues = LeagueData;

	return (
		<>
			<div className='featuredLeagues'>
				<h2>Featured Leagues</h2>
				<div className='featuredLeagues__list'>
					{featuredLeagues.map((league, index) => (
						<div className='featuredLeagues__item' key={index}>
							<div className='featuredLeagues__add'>
								<IoMdAddCircleOutline />
							</div>
							<div className='featuredLeagues__itemDetails'>
								<h4>{league.sport}</h4>
								<h3>{league.name}</h3>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default FeaturedLeagueSlider;
