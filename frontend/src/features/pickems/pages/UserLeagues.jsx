import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLeagueById } from "../slices/leagueSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserLeagues = () => {
	// const { id } = useParams();
	// const dispatch = useDispatch();
	// const { userInfo } = useSelector((state) => state.auth);
	// const navigate = useNavigate();

	const token = Cookies.get("jwt");

	// useEffect(() => {
	// 	if (!userInfo) {
	// 		navigate("/login");
	// 	} else {
	// 		dispatch(getLeagueById({ id, token }));
	// 	}
	// }, [dispatch, id, token, userInfo, navigate]);

	return (
		<>
			<h1>League Page</h1>
		</>
	);
};

export default UserLeagues;
