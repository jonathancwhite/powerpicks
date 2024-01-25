import asyncHandler from "express-async-handler";
import Season from "../models/seasonModel.js";

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
	const year = req.query.year || new Date().getFullYear();
	const week = req.query.week;
	console.log(year);

	let myHeaders = new Headers();
	myHeaders.append("x-rapidapi-host", "v1.american-football.api-sports.io");
	myHeaders.append("x-rapidapi-key", process.env.API_SPORTS_API_KEY);

	const options = {
		method: "GET",
		headers: myHeaders,
	};

	try {
		const response = await fetch(
			`https://v1.american-football.api-sports.io/games?league=2&season=${year}`,
			options,
		);

		const cfbGames = await response.json();

		const filteredResults = cfbGames.response.filter(
			(event) => event.game && event.game.stage === "FBS (Division I-A)",
		);

		res.status(200).json(filteredResults);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
