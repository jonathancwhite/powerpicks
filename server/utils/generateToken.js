import jwt from "jsonwebtoken";

const generateToken = async (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "lax",
		maxAge: 30 * 24 * 60 * 60 * 1000,
		domain: ".jcwdev.local",
	});

	return token;
};

export default generateToken;
