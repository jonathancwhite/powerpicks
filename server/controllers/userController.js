import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
// import generateToken from "../utils/generateToken.js";
import Token from "../models/tokenModel.js";

/**
 * Adds a new user to the database with the given name, email, password, and avatar.
 *
 * @description If the email domain of the user's email is "mod.socialecho.com", the user will be
 * assigned the role of "moderator" by default, but not necessarily as a moderator of any community.
 * Otherwise, the user will be assigned the role of "general" user.
 *
 * @param {Object} req.files - The files attached to the request object (for avatar).
 * @param {string} req.body.isConsentGiven - Indicates whether the user has given consent to enable context based auth.
 * @param {Function} next - The next middleware function to call if consent is given by the user to enable context based auth.
 */
const addUser = async (req, res, next) => {
	let newUser;
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	let referralRegistered = null;

	let profilePicture = generateRandomProfilePicture();

	if (phoneNumber === null || phoneNumber === undefined) {
		phoneNumber = "";
	}

	newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: hashedPassword,
		role: req.body.role,
		profilePicture: profilePicture,
		phoneNumber: req.body.phoneNumber,
	});

	if (referral) {
		referralRegistered = await registerReferralCodeUse(referral, user);
	}

	try {
		await newUser.save();
		if (newUser.isNew) {
			throw new Error("Failed to add user");
		}

		let token = await generateToken(res, newUser._id);

		if (referralRegistered !== null) {
			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				name: newUser.firstName + " " + newUser.lastName,
				email: newUser.email,
				profilePicture: newUser.profilePicture,
				phoneNumber: newUser.phoneNumber,
				referralUsed: referralRegistered,
				token: token,
			});
		}

		res.status(201).json({
			_id: newUser._id,
			username: newUser.username,
			name: newUser.firstName + " " + newUser.lastName,
			email: newUser.email,
			profilePicture: newUser.profilePicture,
			phoneNumber: newUser.phoneNumber,
			token: token,
		});
	} catch (err) {
		res.status(400).json({
			message: "Failed to add user",
		});
	}
};

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
 * Authorizes user when logging in
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to call.
 * @returns {Object} res - The response object.
 */
const authUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!existingUser) {
		return res.status(404).json({
			message: "Invalid credentials",
		});
	}

	if (user && (await user.matchPassword(password))) {
		const payload = {
			id: existingUser._id,
			email: existingUser.email,
		};

		const accessToken = jwt.sign(payload, process.env.SECRET, {
			expiresIn: "6h",
		});

		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
			expiresIn: "7d",
		});

		const newRefreshToken = new Token({
			user: existingUser._id,
			refreshToken,
			accessToken,
		});

		await newRefreshToken.save();

		res.status(200).json({
			accessToken,
			refreshToken,
			accessTokenUpdatedAt: new Date().toLocaleString(),
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				avatar: user.avatar,
			},
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

		const decoded = jwt.verify(token, process.env.SECRET);

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
	addUser,
	authUser,
	getUserProfile,
	logoutUser,
	validateUser,
	updateUser,
};
