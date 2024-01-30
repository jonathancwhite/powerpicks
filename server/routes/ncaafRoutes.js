import express from "express";
import { getMatchupsByWeek } from "../controllers/matchupController.js";

const router = express.Router();

router.get("/games", getMatchupsByWeek);

export default router;
