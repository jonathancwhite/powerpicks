import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinLeague } from "../../../../backend/controllers/leagueController";
import { joinLeagueByCode } from "../pickems/slices/leagueService";
import Cookies from "js-cookie";

const LeagueInvite = () => {
	const { code } = useParams();
	// const history = useHistory();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);
	const [error, setError] = useState(null);
	// get jwt from cookies
	const token = Cookies.get("jwt");

	toast.info(code);

	// check if user is logged in
	useEffect(() => {
		if (!userInfo || !token) {
			history.push("/login");
		} else {
			const league = dispatch(joinLeagueByCode({ code, token }));
			if (league.payload) {
				const leaguePayload = league.payload;
				const leagueId = leaguePayload._id;
				toast.info(`http://jcwdev.local/leagues/${leagueId}`);
			}

			if (league.error) {
				toast.error(league.error.message);
				console.error(league.error);
			}
		}
	});

	// do we get all league info on page load so that the user knows the league name and total member number?

	return (
		<div className='centeredContainer'>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<h1>League Invite</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<p>{code}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeagueInvite;
