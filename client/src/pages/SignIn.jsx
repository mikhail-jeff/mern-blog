import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

const SignIn = () => {
	const [formData, setFormData] = useState({});

	const { loading, error: errorMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			return dispatch(signInFailure("Please fill all the fields"));
		}

		try {
			dispatch(signInStart());
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (data.success === false) {
				dispatch(signInFailure(data.message));
			}

			if (response.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
			}
		} catch (error) {
			dispatch(signInFailure(error.message));
		}
	};

	return (
		<div className="min-h-screen mt-20">
			<div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
				{/* LEFT */}
				<div className="flex-1">
					<Link
						to="/"
						className="text-4xl font-bold dark:text-white">
						BLOGHub
					</Link>
					<p className="text-sm mt-5">This is a demo project. You can sign-in with your email and password or with Google.</p>
				</div>
				{/* RIGHT */}
				<div className="flex-1">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4">
						<div className="">
							<Label value="Email"></Label>
							<TextInput
								type="email"
								placeholder="email@gmail.com"
								id="email"
								onChange={handleChange}
							/>
						</div>
						<div className="">
							<Label value="Password"></Label>
							<TextInput
								type="password"
								id="password"
								placeholder="**********"
								onChange={handleChange}
							/>
						</div>
						<Button
							type="submit"
							gradientDuoTone="purpleToPink"
							disabled={loading}
							className="mt-1">
							{loading ? (
								<span className="flex items-center gap-2">
									<Spinner size="md" />
									<span className="">Loading...</span>
								</span>
							) : (
								"Sign In"
							)}
						</Button>
						<OAuth />
					</form>

					<div className="flex gap-1 mt-1">
						<span className="text-sm">Don&apos;t have an account?</span>
						<Link
							to={"/sign-up"}
							className="text-blue-500 text-sm">
							Sign-up
						</Link>
					</div>

					{errorMessage && (
						<Alert
							className="mt-5"
							color="failure">
							{errorMessage}
						</Alert>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignIn;
