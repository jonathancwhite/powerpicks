import asyncHandler from "express-async-handler";
import Season from "../models/seasonModel.js";
import { createMatchupFromData } from "./matchupController.js";
import { getLeagueById } from "./leagueController.js";

/**
 * 	@desc   Create Season for league
 * 	@access Private
 */
export const createSeason = async (sport) => {
	console.group("createSeason");
	console.log(`Create season for ${sport}`);

	const year = new Date().getFullYear();
	const startDate = new Date();
	const oneYearFromToday = new Date(startDate);
	oneYearFromToday.setFullYear(startDate.getFullYear() + 1);
	const endDate = new Date(oneYearFromToday);

	const season = new Season({
		year,
		sport,
		startDate,
		endDate,
	});

	const createdSeason = await season.save();

	console.log(createdSeason);
	console.groupEnd();

	return createdSeason;
};

/**
 * 	@desc	Fetch ncaaf games
 * 	@route	GET /api/ncaaf/games
 *  @param  {string} year - The year of the season
 */
export const getCfbGamesNew = asyncHandler(async (req, res) => {
	const options = {
		method: "GET",
	};

	try {
		const response = await fetch(
			"http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?groups=80&dates=2024&limit=500",
			options,
		);

		const cfbGames = await response.json();

		const matchups = await createMatchupFromData(cfbGames);

		if (matchups) {
			res.status(200).json(matchups);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

/**
 *  @desc 	Get season by id
 *  @access Private
 */
export const getSeasonById = async (id) => {
	const season = await Season.findById(id);

	if (!season) {
		throw new Error("Season not found");
	}

	return season;
};

export const setMatchupsForSeason = asyncHandler(async (req, res) => {
	console.group(`setMatchupsForSeason`);
	console.log(`req.body: `, req.body);
	console.log(`req.params: `, req.params);
	console.groupEnd();
	const matchups = req.body.matchups;

	const league_id = req.params.id;

	const league = await getLeagueById(league_id);

	const season_id = league.seasonId;

	const season = await getSeasonById(season_id);

	if (!matchups) {
		res.status(400);
		throw new Error("No matchups");
	}

	// check if any ids in matchups are already in season.matchups
	matchups.forEach((matchup) => {
		const matchup_id = matchup._id;

		const matchupExists = season.matchups.find(
			(matchup) => matchup._id === matchup_id,
		);

		if (!matchupExists) {
			season.matchups.push(matchup);
		}
	});

	const updatedSeason = await season.save();

	return updatedSeason.matchups;
});
