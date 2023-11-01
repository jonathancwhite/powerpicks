import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import colors from "colors";

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Connect to the MongoDB database using mongoose

// TODO: Set up routes

const __dirname = path.resolve();

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
