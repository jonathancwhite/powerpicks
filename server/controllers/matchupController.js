import asyncHandler from "express-async-handler";
import Matchup from "../models/matchupModel.js";
import { getLeagueById } from "./leagueController.js";

/**
 * @desc  	Create matchups from ESPN API data
 * @param 	{Object} scoreboard - ESPN API scoreboard data
 */
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

/**
 * @desc  	Get matchups by week and sport
 * @route 	GET /api/matchups
 * @access 	Public
 */
export const getMatchupsByWeek = asyncHandler(async (req, res) => {
	const week = req.query.week;
	const sport = req.query.sport;

	const matchups = await Matchup.find({ sport: sport, week: week });

	if (!matchups) {
		res.status(404);
		throw new Error("No matchups found");
	}

	res.status(200).json(matchups);
});

/**
 *  @desc  	Get matchups from league
 *  @route  GET /api/leagues/:id/matchups
 *  @access Private
 */
export const getMatchupsFromLeague = asyncHandler(async (req, res) => {
	const leagueId = req.params.id;

	const league = await getLeagueById(leagueId);

	const season_id = league.seasonId;

	const season = await getSeasonById(season_id);

	if (season.matchups && season.matchups.length === 0) {
		res.status(200).json([]);
		return;
	}

	res.status(200).json(season.matchups);
});
