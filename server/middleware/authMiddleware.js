import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/**
 * @desc  Middleware to protect routes
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns {void}
 */
const protect = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select("-password");

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401).json({
			message: "Not authorized, no token",
			jwt: token,
			cookiesProvided: JSON.stringify(req.cookies),
		});
	}
});

export { protect };
