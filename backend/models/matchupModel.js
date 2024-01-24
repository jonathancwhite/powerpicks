import mongoose from "mongoose";

const matchupSchema = mongoose.Schema(
	{
		sport: { type: String, required: true },
		teams: [{ type: String, required: true }],
		matchupDate: { type: Date, required: true },
		matchupTime: { type: String, required: true },
		leagueId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "League",
			required: true,
		},
		week: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

const Matchup = mongoose.model("Matchup", matchupSchema);

export default Matchup;
