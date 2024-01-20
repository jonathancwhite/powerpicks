import mongoose from "mongoose";

const referralSchema = mongoose.Schema(
	{
		referrer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		referred: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		code: {
			type: String,
			required: true,
		},
		uses: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

const Referral = mongoose.model("Referral", referralSchema);

export default Referral;
