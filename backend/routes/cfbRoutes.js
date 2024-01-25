import express from "express";
import { getCfbGamesNew } from "../controllers/seasonController.js";

const router = express.Router();

// split routes into different categories
router.get("/", async (req, res) => {
	try {
		const options = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.CFB_API_KEY}`,
			},
		};
		const response = await fetch(
			"https://api.collegefootballdata.com/conferences",
			options,
		);

		const data = await response.json();

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/games", getCfbGamesNew);

export default router;
