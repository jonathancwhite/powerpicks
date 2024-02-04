import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLeagueByIdWithDetails, reset } from "../redux/slices/leagueSlice";
import { toast } from "react-toastify";
import LoadingLeaguePlaceholder from "../components/loaders/LoadingLeaguePlaceholder";
import CurrentLeague from "../components/league/CurrentLeague";

const UserLeagues = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const isOwner = league && league.createdBy === userInfo._id;

	const fetchLeagueData = async (id, token) => {
		if (id.length === 0 || token.length === 0) {
			toast.error("Oops! We made a mistake, please refresh the page.");
			return;
		}

		try {
			let leagueData = await dispatch(
				getLeagueByIdWithDetails({ id, token }),
			);
			if (leagueData.error) {
				console.error(leagueData.error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (league === null) {
			fetchLeagueData(id, userInfo.token);
			return;
		}

		if (league._id) {
			if (league._id !== id) {
				fetchLeagueData(id, userInfo.token);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [league, id, userInfo.token]);

	const leagueState = {
		isOwner,
		userInfo,
	};

	return (
		<>
			{isLoading && <LoadingLeaguePlaceholder />}

			{league !== null && league.members && (
				<CurrentLeague
					league={league}
					currentLeagueState={leagueState}
				/>
			)}
		</>
	);
};

export default UserLeagues;
