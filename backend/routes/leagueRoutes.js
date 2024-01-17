import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getAllJoinedLeagues,
	joinLeagueByCode,
	getLeagueById,
} from "../controllers/leagueController.js";

router.post("/", protect, createLeague);
router.put("/:id", protect, updateLeague);
router.get("/", protect, getAllJoinableLeagues);
router.get("/user/:id", protect, getAllJoinedLeagues);
router.put("/join/:code", protect, joinLeagueByCode);
router.get("/:id", protect, getLeagueById);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
