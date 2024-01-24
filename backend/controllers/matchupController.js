import asyncHandler from "express-async-handler";
import Matchup from "../models/matchupModel.js";

/**
 *  @desc  Fetch results of matchup
 * 	@param {string} year - The year of the season
 * 	@route  GET /api/cfb/matchup/:id/results
 * 	@access Public
 */
export const getMatchupResult = asyncHandler(async (req, res) => {
	const matchup_id = req.params.id;

	// get matchup to have relevant info and save results
	const matchup = Matchup.findOne({ _id: matchup_id });

	if (!matchup) {
		res.status(404);
		throw new Error("Matchup not found");
	}

	const game_id = matchup.gameId;

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CFB_API_KEY}`,
		},
	};

	const results = await fetch(
		`https://api.collegefootballdata.com/games?year=${year}&id=${game_id}`,
		options,
	);

	return results;
});
