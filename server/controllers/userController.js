import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc  Default exports for user object
 */
const defaultUserExports = {
	_id: "",
	username: "",
	name: "",
	email: "",
	profilePicture: "",
	phoneNumber: "",
	token: "",
};

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
		phoneNumber,
	} = req.body;

	const userExists = await User.findOne({ email });
	let referralRegistered = null;

	if (phoneNumber === null || phoneNumber === undefined) {
		phoneNumber = "";
	}

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	let profilePicture = generateRandomProfilePicture();

	const user = await User.create({
		username,
		firstName,
		lastName,
		email,
		password,
		dateOfBirth,
		profilePicture,
		phoneNumber,
	});

	if (referral) {
		referralRegistered = await registerReferralCodeUse(referral, user);
	}

	if (user) {
		let token = await generateToken(res, user._id);

		if (referralRegistered !== null) {
			res.status(201).json({
				_id: user._id,
				username: user.username,
				name: user.firstName + " " + user.lastName,
				email: user.email,
				profilePicture: user.profilePicture,
				phoneNumber: user.phoneNumber,
				referralUsed: referralRegistered,
				token: token,
			});
		}

		res.status(201).json({
			_id: user._id,
			username: user.username,
			name: user.firstName + " " + user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
			phoneNumber: user.phoneNumber,
			token: token,
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
		let token = await generateToken(res, user._id);

		res.json({
			_id: user._id,
			username: user.username,
			name: user.firstName + " " + user.lastName,
			email: user.email,
			profilePicture: user.profilePicture,
			token: token,
		});
	} else {
		res.status(401).json({
			message: "Invalid email or password",
			auth: false,
		});
	}
});

/**
 * @desc   Get user profile
 * @route  GET /api/users/:id/profile
 * @param  {string} id - User ID
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
	const user_id = req.params.id;

	try {
		const user = await User.findById(user_id);
		if (!user) {
			res.status(404);
			throw new Error("User not found");
		}

		const userWithoutPassword = { ...user.toObject() };
		delete userWithoutPassword.password;

		res.status(200).json(userWithoutPassword);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
		// throw new Error("Server error");
	}
});

/**
 * @desc    Logout user / clear cookie
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = (req, res) => {
	let token = "";
	// create cookie with same name, but expired to clear
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: false,
		sameSite: "lax",
		expires: new Date(0),
		domain: ".jcwdev.local",
	});
	res.status(200).json({ message: "Logged out successfully" });
};

/**
 * @desc    Validate the users JWT and log them in
 * @route   POST /api/users/auth/validateUser
 * @access  Public
 */
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
			profilePicture: user.profilePicture,
			phoneNumber: user.phoneNumber,
			token: req.cookies.jwt,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Failed to authenticate token",
			errorMessage: error,
		});
	}
};

/**
 * @desc    Generate a random profile picture
 * @returns {string} profilePicture
 */
const generateRandomProfilePicture = () => {
	let animals = ["cat", "dog", "tiger", "bird", "bear", "fox", "otter"];

	// get random animal
	let animal = animals[Math.floor(Math.random() * animals.length)];

	let profilePicture = `generic-${animal}-ai.webp`;

	return profilePicture;
};

/**
 * @desc    Updates user information
 * @route   PUT /api/users/:id
 * @param   {string} id - User ID
 * @returns {object} response - User Object
 */
const updateUser = asyncHandler(async (req, res) => {
	const user_id = req.params.id;
	const user = await User.findOne({ _id: user_id });

	// Update user fields if they exist in req.body
	Object.keys(req.body).forEach((key) => {
		user[key] = req.body[key];
	});

	// Example of additional logic, like checking for existing username
	if (req.body.username) {
		// Add your logic here to check if the username is already taken
	}

	const updatedUser = await user.save();
	if (!updatedUser) {
		return res.status(400).json({ message: "User not updated" });
	}

	res.status(200).json({
		_id: updatedUser._id,
		username: updatedUser.username,
		name: updatedUser.firstName + " " + updatedUser.lastName,
		email: updatedUser.email,
		profilePicture: updatedUser.profilePicture,
		phoneNumber: updatedUser.phoneNumber,
		token: req.cookies.jwt,
	});
});

export {
	registerUser,
	authUser,
	getUserProfile,
	logoutUser,
	validateUser,
	updateUser,
};
