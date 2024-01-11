import express from "express";
const router = express.Router();

import {
	registerUser,
	authUser,
	logoutUser,
	validateUser,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/auth/validateUser", validateUser);
router.post("/logout", logoutUser);
router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
