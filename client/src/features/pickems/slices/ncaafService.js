import axios from "axios";

const CFB_URL = "/api/ncaaf";

export const getMatchupsByWeek = async (week) => {
	const response = await axios.get(
		`${CFB_URL}/games?week=${week}&sport=NCAAF`,
	);

	return response.data;
};

const ncaafService = {
	getMatchupsByWeek,
};

export default ncaafService;
