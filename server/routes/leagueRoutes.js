import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	deleteLeague,
	getAllJoinableLeagues,
	getAllJoinedLeagues,
	joinLeagueByCode,
	getLeagueByCode,
	getLeagueByIdWithDetails,
	removeMemberById,
} from "../controllers/leagueController.js";

import { setMatchupsForSeason } from "../controllers/seasonController.js";

import { getMatchupsFromLeague } from "../controllers/matchupController.js";
import { getInviteLinkUrlByLeagueId } from "../controllers/inviteLinkController.js";

router.post("/", protect, createLeague);
router.post("/:id", protect, updateLeague);
router.delete("/:id", protect, deleteLeague);
router.get("/", protect, getAllJoinableLeagues);
router.get("/user/:id", protect, getAllJoinedLeagues);
router.put("/join/:code", protect, joinLeagueByCode);
router.get("/:id/invite", protect, getInviteLinkUrlByLeagueId);
router.get("/:id/details", protect, getLeagueByIdWithDetails);
router.delete("/:id/members/:memberId", protect, removeMemberById);
router.get("/code/:code", getLeagueByCode);
router.get("/:id/matchups", getMatchupsFromLeague);
router.post("/:id/matchups", protect, setMatchupsForSeason);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
