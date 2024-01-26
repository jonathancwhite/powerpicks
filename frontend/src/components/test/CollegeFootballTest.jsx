import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatchupsByWeek } from "../../features/pickems/slices/ncaafSlice";
import { toast } from "react-toastify";
import ImageWithFallback from "../common/ImageWithFallback";
import cfbGenericLogo from "../../assets/images/cfbGenericLogo.png";

const CollegeFootballTest = () => {
	const dispatch = useDispatch();
	const { games, isCFBLoading, year } = useSelector((state) => state.ncaaf);
	const [noGamesAvailable, setNoGamesAvailable] = useState(false);
	const [week, setWeek] = useState("1");
	const [startPaginationNum, setStartPaginationNum] = useState(1);
	const [numOfResults, setNumOfResults] = useState(10);
	const [startNumOfResults, setStartNumOfResults] = useState(0);
	const [endNumOfResults, setEndNumOfResults] = useState(10);
	const [checkedMatchupIds, setCheckedMatchupIds] = useState([]);

	const fetchCollegeFootballGames = async () => {
		try {
			const response = await dispatch(getMatchupsByWeek({ week }));

			if (response.meta.requestStatus === "fulfilled") {
				if (games.length) {
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

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString("en-US", options);
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

	const assignMatchupsToLeague = (e) => {
		toast.info("Assigning checked matchups");
		console.log(checkedMatchupIds);
		e.preventDefault();
	};

	const handleChangeSelect = (e) => {
		if (e.target.name === "week") {
			setWeek(e.target.value);
		} else if (e.target.name === "numberOfResults") {
			let numberOfResults = parseInt(e.target.value);
			let pagination = startPaginationNum;
			let startingNumber = numberOfResults * (pagination - 1);
			let endingNumber = startingNumber + numberOfResults;
			setStartNumOfResults(startingNumber);
			setEndNumOfResults(endingNumber);
			setNumOfResults(numberOfResults);
		} else if (e.target.name === "pagination") {
			let numberOfResults = parseInt(numOfResults);
			let pagination = parseInt(e.target.value);
			let startingNumber = numberOfResults * (pagination - 1);
			let endingNumber = startingNumber + numberOfResults;
			setEndNumOfResults(endingNumber);
			setStartNumOfResults(startingNumber);
			setStartPaginationNum(e.target.value);
		}
	};

	useEffect(() => {
		fetchCollegeFootballGames();
		toast.dismiss();
	}, [week]);

	return (
		<div className='apiTesting'>
			<div className='apiTesting__controlbar'>
				<div className='formGroup'>
					<button
						className='btn btn--cta'
						onClick={(e) => assignMatchupsToLeague(e)}>
						Select Matchups
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
			</div>

			{games && games.length !== 0 ? (
				<div className='games'>
					{games.map((game, index) =>
						index <= numOfResults * startPaginationNum &&
						index >= startNumOfResults ? (
							<div className='games__item' key={game._id}>
								<div className='h3'>
									{formatDate(game.matchupDate)}
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
											handleCheckboxChange(game._id)
										}
									/>
								</div>
							</div>
						) : null,
					)}
				</div>
			) : noGamesAvailable ? (
				<div className='games'>
					<div className='games__item'>
						<h3>No Games Found</h3>
					</div>
				</div>
			) : (
				<div className='games'></div>
			)}
			<div className='apiTesting__footerbar'>
				<div className='formGroup'>
					<label htmlFor='numberOfResults'>Results per page: </label>
					<select
						name='numberOfResults'
						id='numberOfResults'
						onChange={(e) => handleChangeSelect(e)}
						defaultValue={numOfResults}>
						<option value='10'>10</option>
						<option value='20'>20</option>
						<option value='30'>30</option>
						<option value='40'>40</option>
						<option value='50'>50</option>
						<option value='100'>All</option>
					</select>
				</div>

				<div className='formGroup'>
					<label htmlFor='pagination'>Page: </label>
					<select
						name='pagination'
						id='pagination'
						onChange={(e) => handleChangeSelect(e)}
						defaultValue='1'>
						<option value='1'>1</option>
						<option value='2'>2</option>
						<option value='3'>3</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default CollegeFootballTest;
