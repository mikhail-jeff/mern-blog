import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(chalk.cyanBright.bold.underline("Connected to DB"));
	})
	.catch((error) => {
		console.log(chalk.redBright.bold.underline(error));
	});

app.listen(PORT, () => {
	console.log(chalk.cyanBright.bold.underline(`Server running on http://localhost:${PORT}`));
});
