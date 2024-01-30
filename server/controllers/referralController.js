import asyncHandler from "express-async-handler";
import { customAlphabet } from "nanoid";
import Referral from "../models/referralModel";

/**
 * @desc  Checks if referral code is valid and increments use
 * @param {string} referral - referral code to check
 * @param {object} user - user object to add to referral.members
 * @returns {object} - referral object
 * @private - Should only used during registerUser
 */
export const registerReferralCodeUse = async (referral, user) => {
	const code = referral;
	const user_id = user._id;

	const referral = await Referral.findOne({
		code: code,
	});

	if (referral) {
		if (referral.members.includes(user_id)) {
			throw new Error("User already used referral code");
		}

		referral.referred.push(user_id);
		referral.uses += 1;
		await referral.save();
	}

	return referral;
};

/**
 * @desc  generates a unique referral code that is 10 characters long and not already in use
 * @returns {string} - unique referral code (Referral.code)
 * @private - Should only used during createReferralCode
 */
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const size = 10;
const generateRandomReferralCode = async () => {
	const nanoid = customAlphabet(alphabet, size);
	let code;
	let codeExists = true;

	while (codeExists) {
		code = nanoid();
		const codeCheck = await Referral.findOne({ code });
		if (!codeCheck) {
			codeExists = false;
		}
	}

	return code;
};

/**
 * @desc  creates a new affiliate referral code for a user
 * @param {string} referrer - id of the user who is creating referral code
 * @returns
 */
export const createReferralCode = async (referrer) => {
	let code = await generateRandomReferralCode();
	const referral = await Referral.create({
		referrer,
		code,
	});

	return referral;
};
