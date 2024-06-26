import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		if (!username || !email || !password || username === "" || email === "" || password === "") {
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

export const singin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		if (!email || !password || email === "" || password === "") {
			return next(errorHandler(400, "All fields are required"));
		}

		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(404, "Invalid credentials"));
		}

		const validPassword = bcryptjs.compareSync(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(404, "Invalid credentials"));
		}

		// authenticate user
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

		// remove password in response
		const { password: pswd, ...rest } = validUser._doc;

		res
			.status(200)
			.cookie("access_token", token, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			})
			.json(rest);
	} catch (error) {
		next(error);
	}
};

export const google = async (req, res, next) => {
	const { email, name, googlePhotoUrl } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user) {
			// authenticate user
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

			// remove password in response
			const { password, ...rest } = user._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		} else {
			// generate password
			const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
			const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

			const newUser = new User({
				username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
				email,
				password: hashedPassword,
				profilePicture: googlePhotoUrl,
			});

			await newUser.save();

			// authenticate user
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

			// remove password in response
			const { password, ...rest } = user._doc;

			res
				.status(200)
				.cookie("access_token", token, {
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000,
				})
				.json(rest);
		}
	} catch (error) {
		next(error);
	}
};
