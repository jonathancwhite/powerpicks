import asyncHandler from "express-async-handler";
import League from "../models/leagueModel.js";
import InviteLink from "../models/inviteLinkModel.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import {
	createInviteLink,
	getInviteLinkByCode,
	getInviteLinkByLeagueId,
} from "./inviteLinkController.js";
import { createSeason } from "./seasonController.js";

/**
 * @desc   Creates a new league from user data
 * @route  POST /api/leagues
 * @param	{object} req - the request object
 * @returns {object} - the league object
 * @returns {array} - the invite links
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

	const user = req.user;

	const hashedPassword = password
		? await bcrypt.hash(password, 10)
		: undefined;

	const season = await createSeason(sport);

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
		seasonId: season._id,
	});

	const savedLeague = await league.save();

	if (!savedLeague) {
		res.status(400);
		throw new Error("Unable to create league");
	}

	// slightly counterintuitive, but we will try to getInviteLinkByLeagueId
	// if no inviteLink is found, we will create one with default values
	let inviteLink;

	try {
		inviteLink = await getInviteLinkByLeagueId(savedLeague._id, user);
	} catch (error) {
		console.error(error);
	}

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

export const deleteLeague = asyncHandler(async (req, res) => {
	const league_id = req.params.id;
	const user = req.user;

	if (!user) {
		res.status(400);
		throw new Error("No user provided");
	}

	// find the league to check the owner
	const league = await League.findById(league_id);

	if (!league) {
		res.status(404);
		throw new Error("League not found");
	}

	if (league.createdBy !== user._id) {
		res.status(403);
		throw new Error("Unauthorized to delete league");
	}

	// delete league or set inactive?

	// if we are keeping history, probably inactive?
});

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
export const getAllJoinedLeagues = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	if (userId === "undefined" || userId === undefined) {
		res.status(400);
		throw new Error("No user id provided");
	}

	const leagues = await League.find({
		members: { $in: [userId] },
		isActive: true,
	});

	if (!leagues || leagues.length === 0) {
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
 * @route  PUT /api/leagues/join/:code
 * @access PRIVATE - user must be logged in
 * @param {string} code - the invite link code
 * @param {string} userId - logged in user's id
 * @throws {Error} - if user not found
 */
export const joinLeagueByCode = asyncHandler(async (req, res) => {
	const { code } = req.params;
	const userId = req.user._id;

	if (!userId) {
		res.status(400);
		throw new Error("User not found");
	}

	// find invite link by code
	const inviteLink = await getInviteLinkByCode(code);
	// console.log(inviteLink);

	if (!inviteLink || inviteLink.expiresAt < new Date()) {
		res.status(400);
		throw new Error("Invalid or expired invite link");
	}

	const league = await League.findById(inviteLink.leagueId);

	if (league.members.includes(userId)) {
		res.status(400);
		throw new Error("User is already a member of this league");
	}

	league.members.push(userId);
	const didJoin = await league.save();

	if (didJoin) {
		// Increment the number of uses for the invite link
		await InviteLink.updateOne(
			{ _id: inviteLink._id },
			{ $inc: { numOfUses: 1 } },
		);

		res.status(200).json(league);
	} else {
		res.status(400);
		throw new Error("Unable to join league");
	}

	res.status(400);
	throw new Error("Unable to join league");
});

/**
 * @desc   Get league by code
 * @route  GET /api/leagues/code/:code
 * @access PUBLIC
 * @param {string} code - the invite link code
 */
export const getLeagueByCode = asyncHandler(async (req, res) => {
	const { code } = req.params;

	const inviteLink = await getInviteLinkByCode(code);

	if (!inviteLink) {
		res.status(400);
		throw new Error("Invalid invite link");
	}

	const league = await League.findById(inviteLink.leagueId).populate(
		"members",
	);

	if (!league) {
		res.status(400);
		throw new Error("No league found");
	}

	res.status(200).json(league);
});

/**
 * @desc  Get league by id
 * @route GET /api/leagues/:id
 * @access PRIVATE
 * @param {string} id - the league id
 * @throws {Error} - if league not found
 */
export const getLeagueById = asyncHandler(async (req, res) => {
	const leagueId = req.params.id;

	const league = await League.findById(leagueId);

	if (!league) {
		res.status(404);
		throw new Error("League not found");
	}

	res.status(200).json(league);
});

/**
 * @desc   Get league by id with members populated
 * @route  GET/api/leagues/:id/members
 * @access PRIVATE
 * @param {string} leagueId - league._id
 * @deprecated - use getLeagueByIdWithDetails instead
 */
export const getLeagueByIdWithMembers = asyncHandler(async (req, res) => {
	const leagueId = req.params.id;

	const league = await League.findById(leagueId).populate("members");

	if (!league) {
		res.status(404);
		throw new Error("League not found");
	}

	res.status(200).json(league);
});

/**
 * @desc    Get league by ID with members and invite links
 * @route   GET /api/leagues/:id
 * @access  Private
 * @returns {object} - the league object
 */
export const getLeagueByIdWithDetails = async (req, res) => {
	try {
		const leagueId = req.params.id;
		const user = req.user;

		// Fetch the league and populate members details
		const league = await League.findById(leagueId).populate(
			"members",
			"profilePicture _id username",
		);

		if (!league) {
			return res.status(404).json({ message: "League not found" });
		}

		// Fetch invite links associated with the league
		const inviteLinks = await InviteLink.find({ leagueId: leagueId });

		// Check if inviteLink array is empty
		if (inviteLinks === null || inviteLinks.length === 0) {
			inviteLinks = [
				await createInviteLink(leagueId, false, 604800000, user),
			];
		}

		// remove any expired invite links
		for (let i = 0; i < inviteLinks.length; i++) {
			if (inviteLinks[i].expiresAt < new Date()) {
				// remove expired invite link from array
				inviteLinks.splice(i, 1);
			}
		}

		// Combine league and invite links into one object
		const leagueWithInviteLinks = {
			...league.toObject(),
			inviteLinks,
		};

		res.json(leagueWithInviteLinks);
	} catch (error) {
		console.error(`Error in getLeagueByIdWithDetails: ${error}`);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * @desc   Remove member from league
 * @route  DELETE /api/leagues/:id/members/:memberId
 * @access PRIVATE
 * @param  {string} leagueId - league._id
 * @param  {string} memberId - member._id
 */
export const removeMemberById = asyncHandler(async (req, res) => {
	const { leagueId, memberId } = req.params;

	const league = await League.findById(leagueId);

	if (!league) {
		res.status(404);
		throw new Error("League not found");
	}

	// remove member from league
	league.members.pull(memberId);

	const updatedLeague = await league.save();

	if (!updatedLeague) {
		res.status(400);
		throw new Error("Unable to remove member from league");
	}

	res.status(200).json(updatedLeague);
});

/**
 * 	@desc   Set league to inactive
 */
export const setLeagueInactive = async (leagueId) => {
	const league = await League.findById(leagueId);

	if (!league) {
		throw new Error("League not found");
	}

	league.isActive = false;
	const updatedLeague = await league.save();
	return updatedLeague;
};
