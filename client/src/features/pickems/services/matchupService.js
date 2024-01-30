import axios from "axios";

const NCAAF_URL = "/api/ncaaf";
const NBA_URL = "/api/nba";
const NFL_URL = "/api/nfl";
const MLS_URL = "/api/mls";
const NHL_URL = "/api/nhl";

export const getMatchupsByWeek = async (week, sport) => {
	// pick URL based on sport
	let url;
	switch (sport) {
		case "NCAAF":
			url = NCAAF_URL;
			break;
		case "NBA":
			url = NBA_URL;
			break;
		case "NFL":
			url = NFL_URL;
			break;
		case "MLS":
			url = MLS_URL;
			break;
		case "NHL":
			url = NHL_URL;
			break;
		default:
			url = NCAAF_URL;
	}

	const response = await axios.get(
		`${url}/games?week=${week}&sport=${sport}`,
	);

	return response.data;
};

export const getAllMatchups = async (sport) => {
	// pick URL based on sport
	let url;
	switch (sport) {
		case "NCAAF":
			url = NCAAF_URL;
			break;
		case "NBA":
			url = NBA_URL;
			break;
		case "NFL":
			url = NFL_URL;
			break;
		case "MLS":
			url = MLS_URL;
			break;
		case "NHL":
			url = NHL_URL;
			break;
		default:
			url = NCAAF_URL;
	}

	const response = await axios.get(`${url}/games?sport=${sport}`);

	return response.data;
};

export const getMatchupsFromLeague = async (leagueId) => {
	const response = await axios.get(`/api/leagues/${leagueId}/matchups`);

	return response.data;
};

export const setMatchupsForSeason = async (leagueId, matchups, token) => {
	let user = localStorage.getItem("userInfo");

	const config = {
		headers: {
			authorization: `Bearer ${token}`,
			user: user,
		},
	};

	const response = await axios.post(
		`/api/leagues/${leagueId}/matchups`,
		matchups,
		config,
	);

	return response.data;
};

const matchupService = {
	getMatchupsByWeek,
	getAllMatchups,
	setMatchupsForSeason,
};

export default matchupService;
