import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
dotenv.config();
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";
import leagueRoutes from "./routes/leagueRoutes.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
	cors({
		origin: ["http://jcwdev.local:5173", "http://app.jcwdev.local:5173"],
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/leagues", leagueRoutes);

const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "/frontend/dist");

// Middleware to handle subdomain requests
app.use((req, res, next) => {
	const subdomainRegex = /^app\./;

	if (subdomainRegex.test(req.hostname)) {
		res.sendFile(path.join(frontendPath, "index.html"));
	} else {
		next();
	}
});

// Serve frontend for the main domain
if (process.env.NODE_ENV === "production") {
	app.use(express.static(frontendPath));
	app.get("*", (req, res) => {
		res.sendFile(path.join(frontendPath, "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running...");
	});
}

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
