import asyncHandler from "express-async-handler";
import League from "../models/leagueModel.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

const validate = (validations) => {
	return async (req, res, next) => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		next();
	};
};

/**
 * @desc   Creates a new league from user data
 * @route  POST /api/leagues
 * @access PRIVATE
 */
export const createLeague = [
	// Validations and sanitization
	body("name").trim().isLength({ min: 3 }).escape(),
	body("sport").trim().isLength({ min: 3 }).escape(),
	body("tier").isIn(["Free", "Basic", "Premium"]),
	body("password").optional().isLength({ min: 6 }),
	validate,
	asyncHandler(async (req, res) => {
		const {
			name,
			sport,
			createdBy,
			members,
			isPublic,
			password,
			inviteCode,
			maxPlayers,
			tier,
		} = req.body;

		// If a password is provided, hash it
		const hashedPassword = password
			? await bcrypt.hash(password, 10)
			: undefined;

		const league = new League({
			name,
			sport,
			createdBy,
			members,
			isPublic,
			password: hashedPassword,
			inviteCode,
			maxPlayers,
			tier,
		});

		const createdLeague = await league.save();
		res.status(201).json(createdLeague);
	}),
];

/**
 * @desc   Updated current league from user data
 * @route  PUT /api/leagues/:id
 * @params id - league._id
 * @access PRIVATE
 */
export const updateLeague = [
	body("name").optional().trim().isLength({ min: 3 }).escape(),
	body("isPublic").optional().isBoolean(),
	body("password").optional().isLength({ min: 6 }),
	validate,
	asyncHandler(async (req, res) => {
		const leagueId = req.params.id;
		const updateData = req.body;

		if (updateData.password) {
			updateData.password = await bcrypt.hash(updateData.password, 10);
		}

		const league = await League.findById(leagueId);
		if (!league) {
			res.status(404);
			throw new Error("League not found");
		}

		// Update the league with the provided data
		Object.assign(league, updateData);

		const updatedLeague = await league.save();
		res.status(200).json(updatedLeague);
	}),
];

/**
 * @desc   Get ALL active and joinable leagues
 * @route  GET /api/leagues
 * @access PRIVATE
 */
export const getAllJoinableLeagues = asyncHandler(async (req, res) => {
	const leagues = await League.aggregate([
		// Match initial criteria
		{
			$match: {
				isPublic: true,
				isActive: true,
			},
		},
		// Redact documents based on condition
		{
			$redact: {
				$cond: {
					if: { $lt: [{ $size: "$members" }, "$maxPlayers"] },
					then: "$$KEEP",
					else: "$$PRUNE",
				},
			},
		},
	]);

	if (!leagues) {
		res.status(400);
		throw new Error("Unable to get leagues");
	}

	res.status(200).json(leagues);
});

/**
 * @desc   Get ALL leagues that the user is a member of
 * @params id - user._id
 * @route  GET /api/leagues/user/:id
 * @access PRIVATE
 */
export const getUserLeagues = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		res.status(400);
		throw new Error("Invalid user ID");
	}

	const leagues = await League.find({
		members: { $in: [mongoose.Types.ObjectId(userId)] },
	});

	if (!leagues) {
		res.status(404);
		throw new Error("Leagues not found");
	}

	res.status(200).json(leagues);
});
