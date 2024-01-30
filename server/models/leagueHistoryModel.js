import mongoose from "mongoose";

const leagueHistorySchema = mongoose.Schema({
	leagueId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "League",
	},
	seasonId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Season",
	},
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	picks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pick" }],
	leaderboard: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
	},
});

const LeagueHistory = mongoose.model("LeagueHistory", leagueHistorySchema);

export default LeagueHistory;
