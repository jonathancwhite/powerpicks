import express from "express";
const router = express.Router();
import {
	createInviteLink,
	deleteInviteLink,
	getInviteLinkByLeagueId,
	createInviteLinkUrl,
} from "../controllers/inviteLinkController";

// Route to handle creation of invite link
router.post("/", createInviteLink);
router.delete("/:id", deleteInviteLink);
router.get("/:id", getInviteLinkByLeagueId);
router.get("/:id/url", createInviteLinkUrl);

module.exports = router;
