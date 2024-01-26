import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCFBGames } from "../../features/pickems/slices/cfbSlice";
import { toast } from "react-toastify";
import ImageWithFallback from "../common/ImageWithFallback";
import cfbGenericLogo from "../../assets/images/cfbGenericLogo.png";

const CollegeFootballTest = () => {
	const dispatch = useDispatch();
	const { games, isCFBLoading, year } = useSelector((state) => state.cfb);
	const [noGamesAvailable, setNoGamesAvailable] = useState(false);
	const [queryYear, setQueryYear] = useState("2024");
	const [week, setWeek] = useState("1");
	const [startPaginationNum, setStartPaginationNum] = useState(1);
	const [numOfResults, setNumOfResults] = useState(10);
	const [startNumOfResults, setStartNumOfResults] = useState(0);
	const [endNumOfResults, setEndNumOfResults] = useState(10);

	const fetchCollegeFootballGames = async () => {
		let year = "2023";
		try {
			const response = await dispatch(fetchCFBGames({ year, week }));

			if (response.meta.requestStatus === "fulfilled") {
				if (games.length) {
					setNoGamesAvailable(true);
					toast.error("No games available");
				} else {
					toast.success("Data loaded");
				}
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const handleButtonClick = async () => {
		// dispatch fetchCFBGames
		let response = await fetchCollegeFootballGames();

		if (response) {
			console.log(response);
		}
	};

	const handleChangeSelect = (e) => {
		if (e.target.name === "year") {
			setQueryYear(e.target.value);
		} else if (e.target.name === "week") {
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

	return (
		<div className='apiTesting'>
			<div className='apiTesting__controlbar'>
				{/* <div className='formGroup'>
					<label htmlFor='year'>Year: </label>
					<select
						name='year'
						id='year'
						onChange={(e) => handleChangeSelect(e)}
						defaultValue={queryYear}>
						<option value='2000'>2000</option>
						<option value='2001'>2001</option>
						<option value='2002'>2002</option>
						<option value='2003'>2003</option>
						<option value='2004'>2004</option>
						<option value='2005'>2005</option>
						<option value='2006'>2006</option>
						<option value='2007'>2007</option>
						<option value='2008'>2008</option>
						<option value='2009'>2009</option>
						<option value='2010'>2010</option>
						<option value='2011'>2011</option>
						<option value='2012'>2012</option>
						<option value='2013'>2013</option>
						<option value='2014'>2014</option>
						<option value='2015'>2015</option>
						<option value='2016'>2016</option>
						<option value='2017'>2017</option>
						<option value='2018'>2018</option>
						<option value='2019'>2019</option>
						<option value='2020'>2020</option>
						<option value='2021'>2021</option>
						<option value='2022'>2022</option>
						<option value='2023'>2023</option>
						<option value='2024'>2024</option>
					</select>
				</div> */}

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

			{games.length === 0 ? (
				<>
					<h1>College Football Test</h1>
					<button
						className='btn btn--cta'
						onClick={handleButtonClick}>
						{isCFBLoading ? (
							<div className='spinner'></div>
						) : (
							<span>Create Matchups from CFB Data</span>
						)}
					</button>
				</>
			) : null}

			{games && games.events && games.length !== 0 ? (
				<div className='games'>
					{games.events.map((game, index) =>
						index <= numOfResults * startPaginationNum &&
						index >= startNumOfResults ? (
							<div className='games__item' key={game.id}>
								<h3>Week: {game.week.number}</h3>
								<div className='games__details'>
									<ImageWithFallback
										src={
											game.competitions[0].competitors[0]
												.team.logo
										}
										fallbackSrc={cfbGenericLogo}
										alt={`${game.competitions[0].competitors[0].team.displayName} logo`}
									/>
									<span>vs</span>
									<ImageWithFallback
										src={
											game.competitions[0].competitors[1]
												.team.logo
										}
										fallbackSrc={cfbGenericLogo}
										alt={`${game.competitions[0].competitors[0].team.displayName} logo`}
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
