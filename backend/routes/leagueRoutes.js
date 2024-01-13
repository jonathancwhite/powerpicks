import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getUserLeagues,
} from "../controllers/leagueController.js";

router.post("/", protect, createLeague);
router.put("/:id", protect, updateLeague);
router.get("/", protect, getAllJoinableLeagues);
router.get("/user/:id", protect, getUserLeagues);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
