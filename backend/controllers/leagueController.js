import asyncHandler from "express-async-handler";
import League from "../models/leagueModel.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import {
	createInviteLink,
	getInviteLinkByCode,
} from "./inviteLinkController.js";

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
export const createLeague = asyncHandler(async (req, res) => {
	const {
		name,
		sport,
		createdBy,
		members,
		isPublic,
		password,
		maxPlayers,
		tier,
	} = req.body;

	const hashedPassword = password
		? await bcrypt.hash(password, 10)
		: undefined;

	// creates league Object to then save with league.save()
	const league = new League({
		name,
		sport,
		createdBy,
		members,
		isPublic,
		password: hashedPassword,
		maxPlayers,
		tier,
	});

	const savedLeague = await league.save();

	if (!savedLeague) {
		res.status(400);
		throw new Error("Unable to create league");
	}

	// Create initial invite link for the league
	const inviteLink = await createInviteLink({
		leagueId: savedLeague._id,
		passwordBypass: true, // by default, initial invite links should bypass password
		expiresIn: 1000 * 60 * 60 * 24 * 30, // expires in 30 days
	});

	res.status(201).json({ league: savedLeague, inviteLink });
});

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

	// find all leagues that the user is a member of
	const leagues = await League.find({
		members: { $in: [mongoose.Types.ObjectId(userId)] },
	});

	if (!leagues) {
		res.status(404);
		throw new Error("Leagues not found");
	}

	res.status(200).json(leagues);
});

/**
 * @desc   Join league
 * @params id - user._id, league_id - league._id, ?password - league.password
 * @route  PUT /api/leagues/:id
 * @access PRIVATE
 */
export const joinLeague = asyncHandler(async (req, res) => {
	const userId = req.user._id;
	const leagueId = req.params.id;
	const { password } = req.body;

	const league = await League.findById(leagueId);

	// check if user is already in league
	if (league.members.includes(userId)) {
		res.status(400);
		throw new Error("User is already a member of this league");
	}

	// check if league is full
	if (league.members.length >= league.maxPlayers) {
		res.status(400);
		throw new Error("League is full");
	}

	// check if league is private & if password is correct
	if (!league.isPublic) {
		if (!password) {
			res.status(400);
			throw new Error("League is private. Password is required");
		}

		const isMatch = await bcrypt.compare(password, league.password);

		if (!isMatch) {
			res.status(400);
			throw new Error("Password is incorrect");
		}

		// if password is correct, add user to league
		league.members.push(userId);
	}

	// add user to league if league is public
	league.members.push(userId);
});

/**
 * @desc   Join league via an invite code & increment the number of uses
 * @params id - user._id, inviteLink - inviteLink.code
 * @route  PUT /api/leagues/inviteLink
 * @access PRIVATE
 */
export const joinLeagueViaInvite = asyncHandler(async (req, res) => {
	const { inviteCode } = req.params;
	const userId = req.user._id;

	// find invite link by code
	const inviteLink = getInviteLinkByCode(inviteCode);

	if (!inviteLink || inviteLink.expiresAt < new Date()) {
		res.status(400);
		throw new Error("Invalid or expired invite link");
	}

	const league = await League.findById(inviteLink.leagueId);
	league.members.push(userId);
	const didJoin = await league.save();

	if (didJoin) {
		// Increment the number of uses for the invite link
		InviteLink.updateOne(
			{ _id: inviteLink._id },
			{ $inc: { numOfUses: 1 } },
		);

		res.status(200).json({ message: "Joined league successfully" });
	}

	if (!didJoin) {
		res.status(400);
		throw new Error("Unable to join league");
	}
});
