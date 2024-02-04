import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../loaders/LoadingSpinner";
import { getMatchupsByWeek } from "../../redux/slices/matchupSlice";
import { toast } from "react-toastify";
import ControlBar from "../form/ButtonControlBar";
import AdminLeagueView from "../admin/AdminPickSelection";
import UserPickSelection from "./UserPickSelection";

const PickSelection = ({ league, isOwner, user }) => {
	const dispatch = useDispatch();
	const { matchups, isLoading, isError, message } = useSelector(
		(state) => state.matchups,
	);

	const [showAdminView, setShowAdminView] = useState(isOwner);
	const [week, setWeek] = useState("1");
	const [requestLoading, setRequestLoading] = useState(false);
	const [startPaginationNum, setStartPaginationNum] = useState(1);
	const [numOfResults, setNumOfResults] = useState(100);
	const [startNumOfResults, setStartNumOfResults] = useState(0);
	const [checkedMatchupIds, setCheckedMatchupIds] = useState([]);

	const filterState = {
		numOfResults,
		startNumOfResults,
		startPaginationNum,
		requestLoading,
		week,
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

	const fetchPossibleMatchupsByWeek = async () => {
		toast.info(`Fetching matchups for week: ${week}`);
		setRequestLoading(true);
		let sport = league.sport;
		try {
			const response = await dispatch(getMatchupsByWeek({ week, sport }));

			if (response.meta.requestStatus === "fulfilled") {
				setRequestLoading(false);
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeSelect = async (e) => {
		if (e.target.name === "week") {
			setWeek(e.target.value);
		} else if (e.target.name === "numberOfResults") {
			let numberOfResults = parseInt(e.target.value);
			let pagination = startPaginationNum;
			let startingNumber = numberOfResults * (pagination - 1);
			setStartNumOfResults(startingNumber);
			setNumOfResults(numberOfResults);
		} else if (e.target.name === "pagination") {
			let numberOfResults = parseInt(numOfResults);
			let pagination = parseInt(e.target.value);
			let startingNumber = numberOfResults * (pagination - 1);
			setStartNumOfResults(startingNumber);
			setStartPaginationNum(e.target.value);
		}
	};

	const makeSelections = (e) => {
		e.preventDefault();
		// console.log(e.target);
		if (e.target.dataset.type === "submit") {
			console.log("Submit Picks");
		} else if (e.target.dataset.type === "swap") {
			setShowAdminView(!showAdminView);
		} else if (e.target.dataset.type === "select") {
			console.log("Select Matchups");
		}
	};

	useEffect(() => {
		if (showAdminView) {
			fetchPossibleMatchupsByWeek();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [week]);

	return (
		<>
			{isLoading && <LoadingSpinner />}
			<div className='pickSelection'>
				<ControlBar
					name='pickSelection'
					isOwner={isOwner}
					buttons={["Select Matchups", "Submit Picks", "Swap View"]}
					onClickHandler={makeSelections}
				/>
				{showAdminView && (
					<AdminLeagueView
						matchups={matchups}
						dateFormatter={formatDate}
						filterState={filterState}
						checkboxHandler={handleCheckboxChange}
					/>
				)}
				{!showAdminView && (
					<UserPickSelection
						league={league}
						filterState={filterState}
						dateFormatter={formatDate}
					/>
				)}
			</div>
		</>
	);
};

PickSelection.propTypes = {
	league: PropTypes.object.isRequired,
	isOwner: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired,
};

export default PickSelection;
