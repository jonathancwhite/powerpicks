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

export const createMatchupFromData = async (scoreboard) => {
	for (const item of scoreboard.events) {
		const matchupDateObj = new Date(item.date);
		const june2024 = new Date("2024-06-01");

		if (matchupDateObj > june2024) {
			const gameId = item.id;

			// Check if the matchup with this gameId already exists
			const existingMatchup = await Matchup.findOne({ gameId: gameId });

			if (!existingMatchup) {
				console.log(
					`Creating matchup for: ${item.id} for week: ${item.week.number}`,
				);
				const matchupDate = matchupDateObj.toLocaleDateString();
				const matchupTime = matchupDateObj.toLocaleTimeString();
				const week = item.week.number;

				let homeTeam = {};
				let awayTeam = {};

				item.competitions[0].competitors.forEach((competitor) => {
					const team = {
						id: competitor.team.id,
						name: competitor.team.displayName,
					};

					if (competitor.homeAway === "home") {
						homeTeam = team;
					} else if (competitor.homeAway === "away") {
						awayTeam = team;
					}
				});

				const matchup = {
					sport: "NCAAF",
					teams: [homeTeam, awayTeam],
					matchupDate: matchupDate,
					matchupTime: matchupTime,
					gameId: gameId,
					week: week,
					// leagueID will be assigned once matchup is assigned to league
				};

				// Create the matchup
				await Matchup.create(matchup);
			}
		}
	}

	console.log(`Done creating matchups from data`);

	return;
};
