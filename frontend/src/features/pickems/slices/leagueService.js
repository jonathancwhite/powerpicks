import axios from "axios";

const LEAGUES_URL = "/api/leagues";

export const createLeague = async (leagueData, token) => {
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(LEAGUES_URL, leagueData, config);
	return response.data;
};

export const updateLeague = async (id, leagueData, token) => {
	let user = localStorage.getItem("userInfo");

	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};

	const response = await axios.post(
		`${LEAGUES_URL}/${id}`,
		leagueData,
		config,
	);
	return response.data;
};

export const getUserLeagues = async (id, token) => {
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

export const getLeagueById = async (id, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.get(`${LEAGUES_URL}/${id}`, config);
	return response.data;
};

const leagueService = {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getUserLeagues,
	joinLeagueByCode,
	getLeagueById,
};

export default leagueService;
