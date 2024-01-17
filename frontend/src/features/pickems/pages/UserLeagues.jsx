import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getLeagueById } from "../slices/leagueSlice";

const UserLeagues = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { league, isLoading, isError, message } = useSelector(
		(state) => state.league,
	);

	const token = Cookies.get("jwt");

	useEffect(() => {
		if (!userInfo) {
			navigate("/login"); // early return
		}

		try {
			dispatch(getLeagueById({ id, token }));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, id, token, userInfo, navigate]);

	return (
		<>
			{isLoading ? (
				<div className='centeredContainer'>
					<div className='spinner'></div>
				</div>
			) : (
				<>
					<h1>{league.name}</h1>
					<p>{league.sport}</p>
					<p>{league.tier}</p>
				</>
			)}
		</>
	);
};

export default UserLeagues;
