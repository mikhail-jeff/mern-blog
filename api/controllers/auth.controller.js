import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		if (!username || !email || !password || username.trim() === "" || email.trim() === "" || password.trim() === "") {
			return next(errorHandler(400, "All fields are required"));
		}

		const hashedPassword = bcryptjs.hashSync(password, 10);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json(`Signup successful`);
	} catch (error) {
		next(error);
	}
};
