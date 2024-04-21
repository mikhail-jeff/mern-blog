import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";

const FooterComponent = () => {
	return (
		<Footer
			container
			className="border border-t border-gray-200 shadow-md rounded-none">
			<div className="w-full max-w-7xl mx-auto">
				<div className="grid w-full justify-between sm:flex md:grid-cols-1">
					<div className="mt-5">
						<Link
							to="/"
							className="self-center whitespace-nowrap md:text-3xl font-bold text-xl dark:text-white">
							BLOGHub
						</Link>
					</div>

					<div className="grid grid-cols-3 gap-8 mt-4 sm:gap-6">
						<div>
							<Footer.Title title="Resources" />
							<Footer.LinkGroup col>
								<Footer.Link
									href="https://vitejs.dev/"
									target="_blank"
									rel="noopener noreferrer">
									Vite
								</Footer.Link>
								<Footer.Link
									href="https://tailwindcss.com/"
									target="_blank"
									rel="noopener noreferrer">
									Tailwind CSS
								</Footer.Link>
								<Footer.Link
									href="https://flowbite-react.com/"
									target="_blank"
									rel="noopener noreferrer">
									Flowbite React
								</Footer.Link>
								<Footer.Link
									href="https://firebase.google.com/"
									target="_blank"
									rel="noopener noreferrer">
									Firebase
								</Footer.Link>
								<Footer.Link
									href="https://redux.js.org/"
									target="_blank"
									rel="noopener noreferrer">
									Redux
								</Footer.Link>
							</Footer.LinkGroup>
						</div>

						<div>
							<Footer.Title title="Follow Us" />
							<Footer.LinkGroup col>
								<Footer.Link
									href="https://github.com/"
									target="_blank"
									rel="noopener noreferrer">
									Github
								</Footer.Link>
								<Footer.Link
									href="https://discord.com/"
									target="_blank"
									rel="noopener noreferrer">
									Discord
								</Footer.Link>
							</Footer.LinkGroup>
						</div>

						<div>
							<Footer.Title title="Legal" />
							<Footer.LinkGroup col>
								<Footer.Link href="#">Privacy Policy</Footer.Link>
								<Footer.Link href="#">Terms of Service</Footer.Link>
								<Footer.Link href="#">Licensing</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />

				<div className="w-full sm:flex sm:justify-between">
					<Footer.Copyright
						href="#"
						by="jeffmikhail"
						year={new Date().getFullYear()}
					/>
					<div className="flex gap-6 sm:mt-2 mt-4 sm:justify-center">
						<Footer.Icon
							href="https://www.facebook.com/"
							target="_blank"
							icon={BsFacebook}
							className="text-[#3b5998]"
						/>
						<Footer.Icon
							href="https://www.instagram.com/"
							target="_blank"
							icon={BsInstagram}
							className="text-[#C13584]"
						/>
						<Footer.Icon
							href="https://twitter.com/"
							target="_blank"
							icon={BsTwitter}
							className="text-[#1DA1F2]"
						/>
						<Footer.Icon
							href="https://github.com/"
							target="_blank"
							icon={BsGithub}
							className="text-[#24292e]"
						/>
						<Footer.Icon
							href="https://dribbble.com/"
							target="_blank"
							icon={BsDribbble}
							className="text-[#ea4c89]"
						/>
					</div>
				</div>
			</div>
		</Footer>
	);
};

export default FooterComponent;
