import axios from "axios";

const CFB_URL = "/api/cfb";

export const fetchCFBGames = async (year, week) => {
	console.group("cfbService.js");
	console.log(`year: ${year}`);
	console.log(`week: ${week}`);
	console.groupEnd();

	const response = await axios.get(`${CFB_URL}/games?year=${year}`);

	return response.data;
};

const cfbService = {
	fetchCFBGames,
};

export default cfbService;
