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
	let referralRegistered = null;

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
	});

	if (referral) {
		referralRegistered = await registerReferralCodeUse(referral, user);
	}

	if (user) {
		generateToken(res, user._id);

		if (referralRegistered !== null) {
			res.status(201).json({
				_id: user._id,
				username: user.username,
				name: user.firstName + " " + user.lastName,
				email: user.email,
				referralUsed: referralRegistered,
			});
		}

		res.status(201).json({
			_id: user._id,
			username: user.username,
			name: user.firstName + " " + user.lastName,
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
		res.status(401);
		throw new Error("Invalid email or password");
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
	// console.log(user_id);

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
const updateUser = async (req, res) => {
	const user_id = req.params.id;
	const user = await User.findOne(user_id);

	if (req.body.firstName) {
		user.firstName = req.body.firstName;
	}

	if (req.body.lastName) {
		user.lastName = req.body.lastName;
	}

	if (req.body.email) {
		user.email = req.body.email;
	}

	if (req.body.password) {
		user.password = req.body.password;
	}

	if (req.body.dateOfBirth) {
		user.dateOfBirth = req.body.dateOfBirth;
	}

	if (req.body.profilePicture) {
		user.profilePicture = req.body.profilePicture;
	}

	const updatedUser = await user.save();
	if (!updatedUser) {
		res.status(400).json({ message: "User not updated" });
	}

	res.status(200).json(updatedUser);
};

export {
	registerUser,
	authUser,
	getUserProfile,
	logoutUser,
	validateUser,
	updateUser,
};
