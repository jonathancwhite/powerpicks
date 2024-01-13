import asyncHandler from "express-async-handler";
import InviteLink from "../models/inviteLinkModel.js";
import { customRandom } from "nanoid";

/**
 * @desc  Creates a new invite link for a league
 * @route POST /api/leagues/:id/invite
 * @param {string} leagueId - id of the league to create an invite link for
 * @param {boolean} passwordBypass - whether or not the invite link should bypass the league's password
 * @param {number} expiresIn - number of milliseconds until the invite link expires
 * @returns {object} - the invite link object
 */
export const createInviteLink = asyncHandler(async (req, res) => {
	const { leagueId, passwordBypass, expiresIn } = req.body;
	const createdBy = req.user._id;

	// Generate a unique code for the invite
	const code = generateUniqueInviteCode(); // Implement this function

	/**
	 * Check InviteLink to see if unique code already exists
	 * If it does, generate a new code and check again
	 */
	const codeCheck = InviteLink.find({ code });
	while (codeCheck) {
		code = generateUniqueInviteCode();
	}

	const expiresAt = expiresIn ? new Date(Date.now() + expiresIn) : undefined;

	// Create invite link object
	const inviteLink = new InviteLink({
		leagueId,
		createdBy,
		code,
		expiresAt,
		passwordBypass,
		numOfUses: 0,
	});

	await inviteLink.save();

	res.status(201).json(inviteLink);
});

/**
 * @desc  generates a unique invite code that is 8 characters long and not already in use
 * @returns {string} - unique invite code (InviteLink.code)
 * @private - Should only used during createInviteLink
 */
const generateUniqueInviteCode = async () => {
	const nanoid = customRandom(
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		8,
	);

	return nanoid;
};

/**
 * @desc Gets an invite link by its code
 * @param {string} leagueId - the league's id
 * @returns {object} - the invite link object
 */
export const getInviteLinkByLeagueId = asyncHandler(async (req, res) => {
	const { leagueId } = req.params;

	const inviteLink = InviteLink.find({ leagueId });

	if (!inviteLink) {
		res.status(404);
		throw new Error("Invite link not found");
	}

	res.status(200).json(inviteLink);
});

/**
 * @desc Deletes an invite link by its code
 * @param {string} leagueId - the league's id
 * @param {string} code - the invite link's code
 * @returns {object} - the invite link object
 */
export const deleteInviteLink = asyncHandler(async (req, res) => {
	// Get leagueId and code from req.params
	const { leagueId, code } = req.params;

	// Check if inviteLink exists
	const inviteLink = InviteLink.find({ leagueId, code });

	if (!inviteLink) {
		res.status(404);
		throw new Error("Invite link not found");
	}

	await inviteLink.remove();

	res.status(200).json({ message: "Invite link deleted" });
});

/**
 * @desc creates URL for invite link
 * @param {string} inviteLinkId - the invite link's code
 * @returns {string} - the invite link URL
 */
export const createInviteLinkUrl = asyncHandler(async (req, res) => {
	let { inviteLinkId } = req.params; // route should be /:id/url

	// Check if inviteLink exists
	const inviteLink = InviteLink.find({ _id: inviteLinkId });

	// get code from inviteLink
	const code = inviteLink.code;

	const domain = process.env.DOMAIN;
	if (process.env.NODE_ENV === "development") {
		res.status(200).json({
			url: `http://${domain}:5173/invite/${code}`,
			message: "Dev server invite link created",
		});
	}
	return res.status(200).json({
		url: `http://${domain}/invite/${code}`,
		message: "Invite link created",
	});
});

/**
 * @desc gets invite link by code
 * @param {string} code - the invite link's code
 * @returns {object} - the invite link object
 */
export const getInviteLinkByCode = asyncHandler(async (req, res) => {
	const { code } = req.params;

	const inviteLink = InviteLink.find({ code });

	if (!inviteLink) {
		res.status(404);
		throw new Error("Invite link not found");
	}

	res.status(200).json(inviteLink);
});
