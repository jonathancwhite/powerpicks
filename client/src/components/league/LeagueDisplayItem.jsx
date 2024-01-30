import PropTypes from "prop-types";

const LeagueDisplayItem = ({ leagues, handler }) => {
	if (!leagues) return null;
	return (
		<>
			{leagues.map((league, index) => (
				<div
					className={`leagues__item leagues__item--${index}`}
					key={league._id}>
					<div className='league'>
						<div className='league__info'>
							<h6>{league.sport}</h6>
							<h5>{league.name}</h5>
							<p>{league.createdBy}</p>
						</div>
						<div className='league__actions'>
							<button
								className='btn btn--tertiary'
								onClick={() => handler(league._id)}>
								Play
							</button>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

LeagueDisplayItem.propTypes = {
	leagues: PropTypes.arrayOf(PropTypes.object).isRequired,
	handler: PropTypes.func.isRequired,
};

export default LeagueDisplayItem;
