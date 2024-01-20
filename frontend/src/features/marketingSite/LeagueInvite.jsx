import { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinLeagueByCode } from "../pickems/slices/leaguesJoinedSlice";
import Cookies from "js-cookie";
import { validateUser } from "../../services/authService";
import { setCredentials, logout } from "../../slices/authSlice";

const LeagueInvite = () => {
	const { code } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	let token = "";
	let userInfo = "";
	const [isLoading, setIsLoading] = useState(true);

	const handleJoinLeague = async () => {
		try {
			setIsLoading(true);
			userInfo = await validateUser();
			if (userInfo) {
				let response = dispatch(setCredentials(userInfo));
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				if (response.payload) {
					token = response.payload;
					console.log(token);

					const league = await dispatch(
						joinLeagueByCode({ code, token }),
					);

					if (league.payload.name) {
						toast.success(
							`Joined ${league.payload.name} Successfully`,
						);

						const currentHost = window.location.host;

						// Redirect to the login page on the main domain
						const protocol = window.location.protocol;
						const dashboardUrl = `${protocol}//app.${currentHost}/`;
						window.location.href = dashboardUrl;
					}
				}
			} else {
				dispatch(logout());
			}
		} catch (error) {
			dispatch(logout());
		}
	};

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
					<div className='col-12'>
						<button
							className='btn btn--cta'
							onClick={handleJoinLeague}>
							Join
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeagueInvite;
