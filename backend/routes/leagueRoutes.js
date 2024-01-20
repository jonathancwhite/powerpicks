import express from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
	createLeague,
	updateLeague,
	getAllJoinableLeagues,
	getAllJoinedLeagues,
	joinLeagueByCode,
	getLeagueByCode,
	getLeagueById,
	getLeagueByIdWithDetails,
	removeMemberById,
} from "../controllers/leagueController.js";

import { getInviteLinkUrlByLeagueId } from "../controllers/inviteLinkController.js";

router.post("/", protect, createLeague);
router.put("/:id", protect, updateLeague);
router.get("/", protect, getAllJoinableLeagues);
router.get("/user/:id", protect, getAllJoinedLeagues);
router.put("/join/:code", protect, joinLeagueByCode);
router.get("/:id", protect, getLeagueById);
router.get("/:id/invite", protect, getInviteLinkUrlByLeagueId);
router.get("/:id/details", protect, getLeagueByIdWithDetails);
router.delete("/:id/members/:memberId", protect, removeMemberById);
router.get("/code/:code", getLeagueByCode);

router.get("/hello", (req, res) => {
	res.status(200).json({
		message: "hello",
	});
});

export default router;
