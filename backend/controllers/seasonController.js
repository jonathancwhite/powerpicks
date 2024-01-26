import asyncHandler from "express-async-handler";
import Season from "../models/seasonModel.js";
import { createMatchupFromData } from "./matchupController.js";

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
 * 	@desc    Fetch cfb teams
 * 	@route   GET /api/cfb/teams
 *  @param   {string} year - The year of the season
 * 	@access  Public
 */
export const getCfbTeams = asyncHandler(async (req, res) => {
	const year = req.query.year || new Date().getFullYear();

	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CFB_API_KEY}`,
		},
	};

	const teams = await fetch(
		`https://api.collegefootballdata.com/teams/fbs?year=${year}`,
		options,
	);

	res.status(200).json(teams);
});

/**
 *  @desc   Fetch season games
 * 	@param {string} year - The year of the season
 * 	@route  GET /api/cfb/schedule
 * 	@access Public
 */
export const getCfbSchedule = asyncHandler(async (req, res) => {
	const year = req.query.year || new Date().getFullYear();
	const division = req.query.division || "fbs";
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CFB_API_KEY}`,
		},
	};
	const schedule = await fetch(
		`https://api.collegefootballdata.com/games?year=${year}&division=${division}`,
		options,
	);

	res.status(200).json(schedule);
});

/**
 *  @desc  Fetch season calendar
 * 	@param {string} year - The year of the season
 * 	@route  GET /api/cfb/calendar
 */
export const getCfbCalendar = asyncHandler(async (req, res) => {
	const year = req.query.year || new Date().getFullYear();
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CFB_API_KEY}`,
		},
	};

	const calendar = await fetch(
		`https://api.collegefootballdata.com/calendar?year=${year}`,
		options,
	);

	res.status(200).json(calendar);
});

/**
 * 	@desc	Fetch cfb games
 * 	@route	GET /api/cfb/games
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
