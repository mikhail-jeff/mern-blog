import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(chalk.cyanBright.bold.underline("Connected to DB"));
	})
	.catch((error) => {
		console.log(chalk.redBright.bold.underline(error));
	});

// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(chalk.cyanBright.bold.underline(`Server running on http://localhost:${PORT}`));
});

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});
