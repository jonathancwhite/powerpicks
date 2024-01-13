import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getUserLeagues,
} from "../controllers/leagueController.js";

router.post("/", authMiddleware, createLeague);
router.put("/:id", authMiddleware, updateLeague);
router.get("/", authMiddleware, getAllJoinableLeagues);
router.get("/user/:id", authMiddleware, getUserLeagues);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
