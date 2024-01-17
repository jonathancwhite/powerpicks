import axios from "axios";

const LEAGUES_URL = "/api/leagues";

export const getAllJoinedLeagues = async (id, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user_id: id,
			user: user,
		},
	};
	const response = await axios.get(`${LEAGUES_URL}/user/${id}`, config);
	return response.data;
};

const leaguesJoinedService = {
	getAllJoinedLeagues,
};

export default leaguesJoinedService;
