import express from "express";
const router = express.Router();

import {
	registerUser,
	authUser,
	getUserProfile,
	logoutUser,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
