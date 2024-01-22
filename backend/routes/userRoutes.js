import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	registerUser,
	authUser,
	logoutUser,
	validateUser,
	getUserProfile,
	updateUser,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/auth", authUser);
router.get("/auth/validateUser", validateUser);
router.post("/logout", logoutUser);

/**
 * Protected routes
 * @requires {string} token - jwt token
 */
router.get("/:id/profile", protect, getUserProfile);
router.put("/:id", protect, updateUser);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
