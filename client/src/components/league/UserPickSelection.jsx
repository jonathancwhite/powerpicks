import ImageWithFallback from "../common/ImageWithFallback";
import cfbGenericLogo from "../../assets/images/cfbGenericLogo.png";

const UserPickSelection = ({ league, filterState, dateFormatter }) => {
	let { numOfResults, startNumOfResults, startPaginationNum, week } =
		filterState;

	return (
		<>
			{league.season.matchups && league.season.matchups.length !== 0 && (
				<div className='games'>
					{league.season?.matchups.map((game, index) =>
						index <= numOfResults * startPaginationNum &&
						index >= startNumOfResults &&
						game.week.toString() === week ? (
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
								<div className='games__selection'></div>
							</div>
						) : null,
					)}
				</div>
			)}
		</>
	);
};

export default UserPickSelection;
