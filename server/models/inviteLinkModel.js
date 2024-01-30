import mongoose from "mongoose";

const inviteLinkSchema = mongoose.Schema(
	{
		leagueId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "League",
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		code: {
			type: String,
			required: true,
			unique: true,
		},
		expiresAt: {
			type: Date,
		},
		passwordBypass: {
			type: Boolean,
			default: false,
		},
		numOfUses: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

const InviteLink = mongoose.model("InviteLink", inviteLinkSchema);

export default InviteLink;
