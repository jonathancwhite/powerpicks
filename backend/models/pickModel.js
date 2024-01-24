import mongoose from "mongoose";

const pickSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		matchupId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Matchup",
		},
		selectedTeam: {
			type: String,
			required: true,
		},
		leagueId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "League",
		},
		week: {
			type: Number,
			required: true,
		},
		isCorrect: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	},
);

const Pick = mongoose.model("Pick", pickSchema);
export default Pick;
