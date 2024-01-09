import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);

const __dirname = path.resolve();

// serve frontend
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")),
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
