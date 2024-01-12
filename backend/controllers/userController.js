import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc   Register new user
 * @route  POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
	const {
		username,
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		referral,
	} = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		username,
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
	});

	if (referral) {
		// create new referral document
	}

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.json({
			_id: user._id,
			username: user.username,
			name: user.firstName + " " + user.lastName,
			email: user.email,
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			username: user.username,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Validate the users JWT and log them in
// @route   POST /api/users/auth/validateUser
// @access  Public
const validateUser = async (req, res) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({
				message: "No token provided",
				requestHeaders: req.headers,
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findById(decoded.userId).select("-password"); // Exclude password from the result

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json({
			_id: user._id,
			username: user.username,
			name: user.firstName + " " + user.lastName,
			email: user.email,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Failed to authenticate token",
			errorMessage: error,
		});
	}
};

export { registerUser, authUser, getUserProfile, logoutUser, validateUser };
