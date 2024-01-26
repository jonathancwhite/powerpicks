import mongoose from "mongoose";

const matchupSchema = mongoose.Schema(
	{
		sport: { type: String, required: true },
		teams: [{ type: mongoose.Schema.Types.Mixed, required: true }],
		matchupDate: { type: Date, required: true },
		matchupTime: { type: String, required: true },
		gameId: { type: String, required: true }, // from API
		week: { type: Number, required: true },
		leagueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "League",
		},
	},
	{
		timestamps: true,
	},
);

const Matchup = mongoose.model("Matchup", matchupSchema);

export default Matchup;
