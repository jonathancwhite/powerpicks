import express from "express";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getUserLeagues,
} from "../controllers/leagueController.js";

router.post("/", createLeague);
router.put("/:id", updateLeague);
router.get("/", getAllJoinableLeagues);
router.get("/user/:id", getUserLeagues);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
