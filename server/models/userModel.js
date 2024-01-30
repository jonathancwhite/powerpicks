import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Please add an username"],
		},
		firstName: {
			type: String,
			required: [true, "Please add a first name"],
		},
		lastName: {
			type: String,
			required: [true, "Please add a last name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
		dateOfBirth: {
			type: Date,
			required: [true, "Please add your date of birth"],
		},
		profilePicture: {
			type: String,
			default: "generic-cat-ai.webp",
		},
		phoneNumber: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
