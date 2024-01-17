import axios from "axios";

const LEAGUES_URL = "/api/leagues";

export const getAllJoinableLeagues = async (token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};

	const response = await axios.get(LEAGUES_URL, config);
	return response.data;
};

export const createAndJoinLeague = async (leagueData, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(LEAGUES_URL, leagueData, config);
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
	const response = await axios.post(`${LEAGUES_URL}/join/${code}`, config);
	return response.data;
};

const leaguesAvailableService = {
	getAllJoinableLeagues,
	createAndJoinLeague,
	joinLeagueByCode,
};

export default leaguesAvailableService;
