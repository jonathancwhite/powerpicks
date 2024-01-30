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

export const joinLeagueByCode = async (code, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.put(`${LEAGUES_URL}/join/${code}`, {}, config);
	return response.data;
};

export const createLeague = async (leagueData, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.post(`${LEAGUES_URL}`, leagueData, config);
	return response.data;
};

const leaguesJoinedService = {
	joinLeagueByCode,
	getAllJoinedLeagues,
	createLeague,
};

export default leaguesJoinedService;
