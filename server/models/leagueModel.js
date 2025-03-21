import mongoose from "mongoose";

const leagueSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		sport: { type: String, required: true },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		isPublic: { type: Boolean, default: false },
		password: { type: String },
		maxPlayers: { type: Number },
		isActive: { type: Boolean, default: true },
		tier: {
			type: String,
			required: true,
			enum: ["Free", "Basic", "Premium"],
			default: "Free",
		},
		seasonId: { type: mongoose.Schema.Types.ObjectId, ref: "Season" },
	},
	{
		timestamps: true,
	},
);

const League = mongoose.model("League", leagueSchema);

export default League;
