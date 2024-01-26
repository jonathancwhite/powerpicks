import axios from "axios";

const CFB_URL = "/api/cfb";

export const fetchCFBGames = async (year, week) => {
	const response = await axios.get(`${CFB_URL}/games?year=${year}`);

	return response.data;
};

const cfbService = {
	fetchCFBGames,
};

export default cfbService;
