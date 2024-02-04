import PropTypes from "prop-types";
import ImageWithFallback from "../common/ImageWithFallback";
import cfbGenericLogo from "../../assets/images/cfbGenericLogo.png";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { useEffect } from "react";

const AdminLeagueView = ({
	matchups,
	dateFormatter,
	filterState,
	checkboxHandler,
}) => {
	let {
		numOfResults,
		startNumOfResults,
		startPaginationNum,
		requestLoading,
	} = filterState;

	useEffect(() => {}, []);

	return (
		<>
			{matchups && matchups.length !== 0 ? (
				<div className='games'>
					{requestLoading && <LoadingSpinner />}
					{matchups.map((game, index) =>
						index <= numOfResults * startPaginationNum &&
						index >= startNumOfResults ? (
							<div className='games__item' key={game._id}>
								<div className='h3'>
									{dateFormatter(game.matchupDate)}
								</div>
								<div className='games__details'>
									<ImageWithFallback
										src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.teams[0].id}.png`}
										fallbackSrc={cfbGenericLogo}
										alt={`${game.teams[0].name} logo`}
									/>
									<span>vs</span>
									<ImageWithFallback
										src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.teams[1].id}.png`}
										fallbackSrc={cfbGenericLogo}
										alt={`${game.teams[1].name} logo`}
									/>
								</div>
								<div className='games__selection'>
									<input
										type='checkbox'
										name='selectGame'
										id='selectGame'
										data-matchup-id={game._id}
										onChange={() =>
											checkboxHandler(game._id)
										}
									/>
								</div>
							</div>
						) : null,
					)}
				</div>
			) : null}
		</>
	);
};

PropTypes.AdminLeagueView = {
	league: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

export default AdminLeagueView;
