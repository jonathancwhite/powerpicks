import axios from "axios";

const LEAGUES_URL = "/api/leagues";

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

export const getLeagueByIdWithDetails = async (id, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.get(`${LEAGUES_URL}/${id}/details`, config);
	return response.data;
};

export const removeMemberById = async (memberId, leagueId, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.delete(
		`${LEAGUES_URL}/${leagueId}/members/${memberId}`,
		config,
	);
	return response.data;
};

export const getInviteLinkUrlByLeagueId = async (leagueId, token) => {
	let user = localStorage.getItem("userInfo");
	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};
	const response = await axios.get(
		`${LEAGUES_URL}/${leagueId}/invite`,
		config,
	);
	return response.data;
};

const leagueService = {
	updateLeague,
	getLeagueById,
	getLeagueByIdWithDetails,
	getInviteLinkUrlByLeagueId,
};

export default leagueService;
