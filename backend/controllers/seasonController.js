import asyncHandler from "express-async-handler";
import Season from "../models/seasonModel.js";

/**
 * 	@desc    Fetch cfb teams
 * 	@route   GET /api/cfb/teams
 *  @param   {string} year - The year of the season
 * 	@access  Public
 */
export const getTeams = asyncHandler(async (req, res) => {
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

	return teams;
});

/**
 *  @desc   Fetch season games
 * 	@param {string} year - The year of the season
 * 	@route  GET /api/cfb/schedule
 * 	@access Public
 */
export const getSchedule = asyncHandler(async (req, res) => {
	const year = req.query.year || new Date().getFullYear();
	const seasonType = req.query.seasonType || "regular";
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.CFB_API_KEY}`,
		},
	};
	const schedule = await fetch(
		`https://api.collegefootballdata.com/games?year=${year}&seasonType=${seasonType}`,
		options,
	);

	return schedule;
});
