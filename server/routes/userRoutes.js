import express from "express";
const router = express.Router();
import passport from "passport";
import useragent from "express-useragent";
import requestIp from "request-ip";

import {
	addUser,
	authUser,
	logoutUser,
	getUserProfile,
	updateUser,
} from "../controllers/userController.js";

import { signUpSignInLimiter } from "../middlewares/limiter/limiter.js";

import {
	addUserValidator,
	addUserValidatorHandler,
} from "../middlewares/users/usersValidator.js";

import { sendVerificationEmail } from "../middlewares/users/verifyEmail.js";

const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/:id/profile", requireAuth, decodeToken, getUserProfile);
router.post(
	"/signup",
	signUpSignInLimiter,
	addUserValidator,
	addUserValidatorHandler,
	addUser,
	sendVerificationEmail,
);
router.post(
	"/signin",
	signUpSignInLimiter,
	requestIp.mw(),
	useragent.express(),
	authUser,
	// sendLoginVerificationEmail,
);
router.post("/logout", logoutUser);
router.put("/:id", requireAuth, decodeToken, updateUser);
// router.put("/:id", protect, updateUser);

export default router;
