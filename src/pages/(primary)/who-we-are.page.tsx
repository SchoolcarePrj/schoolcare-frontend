import { IconBox } from "@/components/common";
import Coworkers from "../../assets/images/coworkers.png";

const WhoWeAre = () => {
	return (
		<main>
			<section className="flex flex-col gap-6 text-center md:flex-row">
				<div className="md:w-[50%] md:object-cover xl:order-2">
					<img src={Coworkers} alt="" className="rounded-xl" />
				</div>

				<div className="md:w-[50%] md:text-start xl:order-1 xl:text-start xl:text-[24px]">
					<p>
						The schoolcare team is a dynamic assembly of technology experts and enthusiasts, unified
						by their passion for innovation and problem-solving. Comprising individuals with diverse
						skills and backgrounds, this team collaborates synergistically to address real-world
						challenges through technology-driven solutions. What sets the schoolcare team apart is
						not just their technical prowess but also their deep understanding of the needs and
						aspirations of their users. They approach each project with empathy and creativity,
						striving to create solutions that are not only functional but also intuitive and
						impactful.
					</p>
				</div>
			</section>

			<h1 className="my-8 text-center text-2xl font-bold text-black">Our Core Value</h1>

			<section
				className="grid gap-12 bg-bgTestimonials-65 px-10 py-12 md:grid-cols-2 md:gap-10 md:px-12"
			>
				<div className="rounded-xl bg-cosWhite px-6 py-12 text-center md:h-72 md:py-7 lg:w-full">
					<div>
						<IconBox
							icon="ri-lightbulb-flash-line"
							className="text-[56px] text-cosBlue md:text-[44px]"
						/>
					</div>
					<h1 className="my-2 text-xl font-bold">Innovation</h1>
					<p>
						They continuously seek out new ideas, technologies, and methodologies to develop
						groundbreaking solutions that address life's challenges.
					</p>
				</div>

				<div>
					<div
						className="rounded-xl bg-cosWhite px-6 py-7 text-center md:flex md:h-48 md:items-center
							md:px-4 lg:w-full xl:w-[90%]"
					>
						<div className="mr-3">
							<IconBox
								icon="ri-verified-badge-line"
								className="text-[56px] text-cosBlue md:text-[44px]"
							/>
						</div>
						<div className="md:text-start">
							<h1 className="my-2 text-xl font-bold">Integrity</h1>
							<p>
								We believe in honesty, transparency, and ethical conduct in all our interactions,
								whether with clients, partners, or team members.
							</p>
						</div>
					</div>

					<div
						className="mt-12 rounded-xl bg-cosWhite px-6 py-7 text-center md:col-start-2 md:mt-6
							md:flex md:h-48 md:grid-rows-1 md:items-center md:px-4 lg:w-full xl:w-[90%]"
					>
						<div className="mr-3">
							<IconBox icon="ri-team-line" className="text-[56px] text-cosBlue md:text-[44px]" />
						</div>
						<div className="md:text-start">
							<h1 className="my-2 text-xl font-bold">Collaboration</h1>
							<p>
								We recognize the power of teamwork and believe that by working together, we can
								achieve greater results than by working alone.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default WhoWeAre;
