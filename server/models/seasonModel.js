import mongoose from "mongoose";

const seasonSchema = mongoose.Schema(
	{
		year: { type: Number, required: true },
		sport: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		matchups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Matchup" }],
	},
	{
		timestamps: true,
	},
);

const Season = mongoose.model("Season", seasonSchema);

export default Season;
