import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import ImageWithFallback from "../../../components/common/ImageWithFallback";
import cfbGenericLogo from "../../../assets/images/cfbGenericLogo.png";
import { getMatchupsByWeek } from "../slices/matchupSlice";
import { toast } from "react-toastify";

const PickSelection = ({ league, isOwner, user }) => {
	const dispatch = useDispatch();
	const { matchups, isLoading, isError, message } = useSelector(
		(state) => state.matchups,
	);

	const [showAdminView, setShowAdminView] = useState(false);
	const [week, setWeek] = useState("1");
	const [startPaginationNum, setStartPaginationNum] = useState(1);
	const [numOfResults, setNumOfResults] = useState(10);
	const [startNumOfResults, setStartNumOfResults] = useState(0);
	const [endNumOfResults, setEndNumOfResults] = useState(10);
	const [checkedMatchupIds, setCheckedMatchupIds] = useState([]);

	const handleSwapViews = () => {
		setShowAdminView(!showAdminView);
	};

	const handleCheckboxChange = (matchup_id) => {
		if (checkedMatchupIds.includes(matchup_id)) {
			setCheckedMatchupIds(
				checkedMatchupIds.filter((id) => id !== matchup_id),
			);
		} else {
			setCheckedMatchupIds([...checkedMatchupIds, matchup_id]);
		}
	};

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const fetchAllPossibleMatchups = async () => {
		toast.info("Fetching matchups");
		let sport = league.sport;
		try {
			const response = await dispatch(getMatchupsByWeek({ week, sport }));

			if (response.meta.requestStatus === "fulfilled") {
				if (matchups.length) {
					console.log("Request not fulfilled");
				} else {
					// toast.success("Data loaded");
				}
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isOwner) {
			setShowAdminView(true);
		}

		if (showAdminView && matchups.length === 0) {
			fetchAllPossibleMatchups();
		}
	}, [week]);

	return (
		<div className='apiTesting'>
			{isLoading ? (
				<div className='spinner'></div>
			) : (
				<>
					<div className='apiTesting__controlbar'>
						{isOwner ? (
							<>
								<div className='formGroup'>
									{showAdminView ? (
										<button className='btn btn--cta'>
											Select Matchups
										</button>
									) : (
										<button className='btn btn--cta'>
											Make Picks
										</button>
									)}

									<button
										className='btn btn--cta'
										onClick={handleSwapViews}>
										{showAdminView
											? "Swap To User View"
											: "Swap To Admin View"}
									</button>
								</div>
								<div className='formGroup'>
									<label htmlFor='week'>Week: </label>
									<select
										name='week'
										id='week'
										onChange={(e) => handleChangeSelect(e)}
										defaultValue={week}>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
										<option value='6'>6</option>
										<option value='7'>7</option>
										<option value='8'>8</option>
										<option value='9'>9</option>
										<option value='10'>10</option>
										<option value='11'>11</option>
										<option value='12'>12</option>
									</select>
								</div>
							</>
						) : (
							<button className='btn btn--cta'>Make Picks</button>
						)}
					</div>
					{showAdminView ? (
						<>
							{matchups && matchups.length !== 0 ? (
								<div className='games'>
									{matchups.map((game, index) =>
										index <=
											numOfResults * startPaginationNum &&
										index >= startNumOfResults ? (
											<div
												className='games__item'
												key={game._id}>
												<div className='h3'>
													{formatDate(
														game.matchupDate,
													)}
												</div>
												<div className='games__details'>
													<ImageWithFallback
														src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.teams[0].id}.png`}
														fallbackSrc={
															cfbGenericLogo
														}
														alt={`${game.teams[0].name} logo`}
													/>
													<span>vs</span>
													<ImageWithFallback
														src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${game.teams[1].id}.png`}
														fallbackSrc={
															cfbGenericLogo
														}
														alt={`${game.teams[1].name} logo`}
													/>
												</div>
												<div className='games__selection'>
													<input
														type='checkbox'
														name='selectGame'
														id='selectGame'
														data-matchup-id={
															game._id
														}
														onChange={() =>
															handleCheckboxChange(
																game._id,
															)
														}
													/>
												</div>
											</div>
										) : null,
									)}
								</div>
							) : null}
						</>
					) : (
						<></>
					)}
				</>
			)}
		</div>
	);
};

PickSelection.propTypes = {
	league: PropTypes.object.isRequired,
	isOwner: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
};

export default PickSelection;
