import { IconBox, NavLink } from "@/components/common";

function Footer() {
	return (
		<footer
			className="flex flex-col gap-12 bg-school-darker-blue px-6 py-10 text-white lg:grid lg:grid-cols-3
				lg:justify-items-center lg:gap-12 lg:px-[80px] lg:py-[100px]"
		>
			<article className="flex flex-col gap-5 lg:gap-8">
				<h3 className="text-[18px] font-semibold">SCHOOL CARE</h3>

				<p className="text-base/relaxed text-gray-200">
					Get access to all academic results with ease. Whether you're eagerly anticipating your final
					exam results or need to track your performance throughout the semester,
				</p>

				<div className="flex flex-col gap-1.5">
					<p className="text-base">
						<span className="font-semibold">Phone</span>: 0903 8746 894 0814 7736 125
					</p>
					<p className="text-base">
						<span className="font-semibold">Email</span>: schoolcare.office@gmail.com
					</p>
				</div>

				<div className="flex gap-2.5">
					<IconBox
						icon="entypo-social:facebook-with-circle"
						className="size-[22px] text-school-blue-500"
					/>
					<IconBox
						icon="entypo-social:twitter-with-circle"
						className="size-[22px] text-school-blue-500"
					/>
					<IconBox
						icon="entypo-social:linkedin-with-circle"
						className="size-[22px] text-school-blue-500"
					/>
					<IconBox
						icon="entypo-social:instagram-with-circle"
						className="size-[22px] text-school-blue-500"
					/>
				</div>
			</article>

			<article className="flex flex-col gap-5 lg:gap-8">
				<h3 className="text-[18px] font-semibold">Useful Links</h3>

				<ul className="flex flex-col gap-2 text-base lg:gap-4">
					<li>
						<NavLink to="/" className="transition-colors hover:text-gray-300">
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/who-we-are" className="transition-colors hover:text-gray-300">
							About Us
						</NavLink>
					</li>
					<li>
						<NavLink to="/how-it-works" className="transition-colors hover:text-gray-300">
							How it Works
						</NavLink>
					</li>
					<li>
						<NavLink to="/faqs" className="transition-colors hover:text-gray-300">
							FAQs
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact" className="transition-colors hover:text-gray-300">
							Contact Us
						</NavLink>
					</li>
				</ul>
			</article>

			<article className="flex w-full flex-col gap-5 lg:gap-8">
				<h3 className="text-[18px] font-semibold">Leave Us a Message</h3>

				<div className="flex flex-col gap-4">
					<textarea
						className="min-h-[100px] w-full rounded-lg border border-white bg-transparent p-3
							text-base text-white placeholder-gray-400 focus:border-school-blue-500
							focus:outline-none"
						placeholder="Type your message here..."
					/>

					<button
						type="submit"
						className="w-fit rounded-lg bg-school-blue-500 px-4 py-2 text-base font-medium
							transition-colors hover:bg-blue-600 lg:w-fit"
					>
						Send Message
					</button>
				</div>
			</article>
		</footer>
	);
}

export { Footer };
