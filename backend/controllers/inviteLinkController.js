import asyncHandler from "express-async-handler";
import InviteLink from "../models/inviteLinkModel.js";
import { customAlphabet } from "nanoid";

/**
 * @desc  Creates a new invite link for a league
 * @param {string} leagueId - id of the league to create an invite link for
 * @param {boolean} passwordBypass - whether or not the invite link should bypass the league's password
 * @param {number} expiresIn - number of milliseconds until the invite link expires
 * @returns {object} - the invite link object
 */
export const createInviteLink = async (
	leagueId,
	passwordBypass,
	expiresIn,
	user,
) => {
	let code = await generateUniqueInviteCode(); // should we wrap in try catch

	const expiresAt = expiresIn ? new Date(Date.now() + expiresIn) : undefined;

	// Create invite link object
	const inviteLink = new InviteLink({
		leagueId,
		createdBy: user._id,
		code,
		expiresAt,
		passwordBypass,
		numOfUses: 0,
	});

	const savedInviteLink = await inviteLink.save();
	return savedInviteLink;
};

/**
 * @desc  generates a unique invite code that is 8 characters long and not already in use
 * @returns {string} - unique invite code (InviteLink.code)
 * @private - Should only used during createInviteLink
 */
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const size = 8;
const generateUniqueInviteCode = async () => {
	const nanoid = customAlphabet(alphabet, size);
	let code;
	let codeExists = true;

	while (codeExists) {
		code = nanoid();
		const codeCheck = await InviteLink.findOne({ code });
		if (!codeCheck) {
			codeExists = false;
		}
	}

	return code;
};

/**
 * @desc Gets an invite link by league id
 * @param {Mongoose.ObjectID} leagueId - the league's id
 * @returns {Array} - result of InviteLink.find()
 * TODO: this should be getInviteLinksByLeagueId since it returns an array with .find()
 */
export const getInviteLinkByLeagueId = async (id, user) => {
	// Await the find operation to get the actual result
	let inviteLink = await InviteLink.find({ leagueId: id });

	// Check if inviteLink array is empty
	if (inviteLink.length === 0) {
		// await the creation of the new invite link
		inviteLink = [await createInviteLink(id, false, 604800000, user)];
	}

	return inviteLink;
};

/**
 * @desc Gets an invite link URL by league id
 * @param {Mongoose.ObjectId} leagueId - the league's id
 * @return {string} - the invite link URL
 */
export const getInviteLinkUrlByLeagueId = async (id) => {
	const inviteLink = await getInviteLinkByLeagueId(id);

	return createInviteLinkUrl(inviteLink._id);
};

/**
 * @desc Deletes an invite link by its code
 * @param {string} leagueId - the league's id
 * @param {string} code - the invite link's code
 * @returns {object} - the invite link object
 * @throws {Error} - if invite link not found
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
 * @param {string} id - the invite link's id
 * @returns {string} - the invite link URL
 */
export const createInviteLinkUrl = async (id) => {
	const inviteLink = InviteLink.find({ _id: id });
	let code = inviteLink.code;
	const domain = process.env.DOMAIN;

	if (process.env.NODE_ENV === "development") {
		return `http://${domain}:5173/invite/${code}`;
	}
	return `http://${domain}/invite/${code}`;
};

/**
 * @desc gets invite link by code
 * @param {string} code - the invite link's code
 * @returns {object} - the invite link object
 * @throws {Error} - if invite link not found
 */
export const getInviteLinkByCode = (code) => {
	const inviteLink = InviteLink.find({ code });

	if (!inviteLink) {
		throw new Error("Invite link not found");
	}

	return inviteLink;
};
