import {
	cardOne,
	cardThree,
	cardTwo,
	carouselOne,
	carouselThree,
	carouselTwo,
	chart,
	schoolFour,
	schoolOne,
	schoolThree,
	schoolTwo,
} from "@/assets/images/home";
import { For, ForWithWrapper, IconBox, Image, NavLink } from "@/components/common";
import { BrainIcon, LineGraphIcon, PageIcon, PieIcon, StudentIcon, UploadIcon } from "@/components/icons";
import { Card, Carousel } from "@/components/ui";
import { sessionQuery } from "@/lib/react-query/queryOptions";
import { useQuery } from "@tanstack/react-query";
import { AccordionFaqs } from "./-components/AccordionFaqs";
import { ResultCheckForm } from "./-components/ResultCheckForm";

const experiences = [
	{
		description:
			"Schools log into their dashboard and securely upload students’ results using a simple spreadsheet upload system.",
		icon: <UploadIcon className="size-9" />,
		title: "School Uploads Results",
	},
	{
		description:
			"The platform automatically organizes the results and assigns them to the correct student profile, ensuring accuracy and privacy.",
		icon: <PieIcon className="size-9" />,
		title: "System Processes the Data",
	},
	{
		description:
			"Students (or parents) log in with their credentials to easily view, download, or print their results anytime, anywhere.",
		icon: <StudentIcon className="size-9" />,
		title: "Students View Their Results",
	},
];

const features = [
	{
		description: "Students stay updated on their academic journey and know where they need to improve.",
		icon: <LineGraphIcon className="size-6" />,
		title: "Track Academic Progress",
	},
	{
		description:
			"As soon as results are uploaded, students can view them instantly. No delays, no queues.",
		icon: <PageIcon className="size-6" />,
		title: "Check Results Fast",
	},
	{
		description: "With early access, students can take action, study better, and grow academically.",
		icon: <BrainIcon className="size-6" />,
		title: "Improve Smarter",
	},
];

const reasons = [
	{
		description:
			"SchoolCare simplifies school management by bringing admin tasks, student records, communication, and more into one easy-to-use platform.",
		title: "All-in-One Solution",
	},
	{
		description:
			"Designed with both tech-savvy and non-tech users in mind, SchoolCare ensures that teachers, parents, and admins can navigate effortlessly anytime, anywhere.",
		title: "User-Friendly & Accessible",
	},
	{
		description:
			"From instant updates to streamlined workflows, SchoolCare enhances collaboration between staff and parents, saving time and reducing miscommunication.",
		title: "Boosts Efficiency and Communication",
	},
];

const blogPosts = [
	{
		description:
			"Lagos State Governor, Mr Babajide Sanwo-Olu, on Thursday, announced a cash gift of N10 million for Miss Isioma Sybil Nwosu, who emerged as the...",
		imageURL: cardOne,
		title: "Lagos State Governor, Mr Babajide Sanwo-Olu, on Thursday, announced a cash gift of N10 million for Miss Isioma Sybil Nwosu",
	},
	{
		description:
			"Bunmi-Alade Opeyemi, a young Nigerian woman, has overcome incredible odds to graduate as a licensed medical doctor from Bukovinian State Medical University in Chernivtsi, Ukraine",
		imageURL: cardTwo,
		title: "From Refugee to Medical Doctor . Young Nigerian Lady Celebrates Inspiring Achievement",
	},
	{
		description:
			"Bunmi-Alade Opeyemi, a young Nigerian woman, has overcome incredible odds to graduate as a licensed medical doctor from Bukovinian State Medical University in Chernivtsi, Ukraine",
		imageURL: cardThree,
		title: "From Refugee to Medical Doctor . Young Nigerian Lady Celebrates Inspiring Achievement",
	},
	{
		description:
			"Bunmi-Alade Opeyemi, a young Nigerian woman, has overcome incredible odds to graduate as a licensed medical doctor from Bukovinian State Medical University in Chernivtsi, Ukraine",
		imageURL: cardTwo,
		title: "From Refugee to Medical Doctor . Young Nigerian Lady Celebrates Inspiring Achievement",
	},
	{
		description:
			"Bunmi-Alade Opeyemi, a young Nigerian woman, has overcome incredible odds to graduate as a licensed medical doctor from Bukovinian State Medical University in Chernivtsi, Ukraine",
		imageURL: cardThree,
		title: "From Refugee to Medical Doctor . Young Nigerian Lady Celebrates Inspiring Achievement",
	},
	{
		description:
			"Lagos State Governor, Mr Babajide Sanwo-Olu, on Thursday, announced a cash gift of N10 million for Miss Isioma Sybil Nwosu, who emerged as the...",
		imageURL: cardOne,
		title: "Lagos State Governor, Mr Babajide Sanwo-Olu, on Thursday, announced a cash gift of N10 million for Miss Isioma Sybil Nwosu",
	},
];

const carouselItems = [
	{
		imageURL: carouselOne,
	},
	{
		imageURL: carouselTwo,
	},
	{
		imageURL: carouselThree,
	},
];

function HomePage() {
	const sessionQueryResult = useQuery(sessionQuery());

	return (
		<main className="flex grow flex-col gap-9 pb-[120px] lg:gap-[100px]">
			<section
				className="flex flex-col items-center justify-between gap-14 bg-210-100-13 px-6 py-[84px_56px]
					text-white lg:flex-row lg:items-start lg:gap-[96px] lg:px-[80px] lg:py-[200px_104px]"
			>
				<article className="flex w-full flex-col items-center lg:items-start">
					<h1
						className="max-w-[353px] text-[24px] font-bold max-lg:text-center lg:max-w-[588px]
							lg:text-[48px]"
					>
						Track and Get Easy Access to all Academic results with{" "}
						<span className="text-210-79-44">SCHOOL CARE</span>
					</h1>

					<p className="mt-3 max-w-[288px] max-lg:text-center lg:max-w-[605px] lg:text-[32px]">
						Access and manage all student results in one place.
					</p>

					<div className="mt-9 flex flex-col items-center gap-5.5 lg:mt-[64px] lg:flex-row lg:gap-7">
						<button type="button" className="shrink-0">
							<NavLink
								to={sessionQueryResult.data ? "/admin/school/dashboard" : "/auth/signin"}
								className="block rounded-[8px] border border-[hsla(0,0%,98%,1)] px-6 py-2
									font-semibold lg:rounded-[12px] lg:py-4 lg:text-[24px]"
							>
								{sessionQueryResult.data ? "Dashboard" : "Login"}
							</NavLink>
						</button>

						<button type="button" className="shrink-0">
							<NavLink
								to="/auth/signup"
								className="block rounded-[8px] bg-210-79-44 px-6 py-2 font-semibold
									lg:rounded-[12px] lg:py-4 lg:text-[24px]"
							>
								Register School
							</NavLink>
						</button>
					</div>

					<div
						className="mt-5.5 flex w-full max-w-[428px] items-center justify-center gap-3
							rounded-[60px] bg-201-100-9 px-7.5 py-3 lg:mt-[50px] lg:px-11.5"
					>
						<div className="flex [&>img]:-ml-3.5">
							<Image src={schoolOne} width={32} height={32} />
							<Image src={schoolTwo} width={32} height={32} />
							<Image src={schoolThree} width={32} height={32} />
							<Image src={schoolFour} width={32} height={32} />
						</div>

						<p className="text-[12px] font-medium lg:text-base">500+ Schools joined School Care</p>
					</div>
				</article>

				<ResultCheckForm />
			</section>

			<section className="flex flex-col items-center gap-6 px-6 lg:gap-[52px] lg:px-[80px]">
				<h3 className="text-center font-bold lg:text-[32px]">Your SchoolCare Experience</h3>

				<ForWithWrapper
					className="flex flex-col gap-6 lg:flex-row lg:gap-8"
					each={experiences}
					renderItem={(experience) => (
						<li
							key={experience.title}
							className="flex h-[218px] w-full flex-col items-center justify-center gap-3
								rounded-[12px] border-[3px] border-210-78-82 px-[52px] text-center lg:h-[285px]
								lg:rounded-[24px] lg:border-[5px] lg:px-8"
						>
							<span
								className="flex size-[64px] items-center justify-center rounded-full bg-210-77-95
									lg:size-[80px]"
							>
								{experience.icon}
							</span>

							<div className="flex flex-col gap-2">
								<h4 className="text-[14px] font-semibold lg:text-base">{experience.title}</h4>
								<p className="text-[12px] lg:text-base">{experience.description}</p>
							</div>
						</li>
					)}
				/>
			</section>

			<section
				className="flex flex-col items-center gap-6 bg-[hsl(210,25%,97%)] px-6 py-[20px_40px]
					lg:gap-[52px] lg:px-[80px] lg:py-[60px_100px]"
			>
				<h3 className="text-center font-bold lg:text-[32px]">
					How SchoolCare Supports an Academic Journey
				</h3>

				<div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-[64px]">
					<Image
						src={chart}
						width={376}
						height={360}
						className="h-[360px] max-w-[376px] lg:h-[528px] lg:max-w-[583px]"
					/>

					<ForWithWrapper
						className="flex flex-col gap-6"
						each={features}
						renderItem={(feature) => (
							<li
								key={feature.title}
								className="flex items-start gap-3.5 rounded-[12px] bg-210-79-44 px-9 py-7.5
									text-white lg:gap-6.5 lg:rounded-[24px] lg:px-[50px]"
							>
								<span
									className="flex size-[48px] shrink-0 items-center justify-center rounded-full
										bg-white"
								>
									{feature.icon}
								</span>

								<div className="flex flex-col gap-2">
									<h4 className="text-[14px] font-bold lg:text-[24px]">{feature.title}</h4>
									<p className="text-[12px] font-medium lg:text-base">{feature.description}</p>
								</div>
							</li>
						)}
					/>
				</div>
			</section>

			<section className="flex flex-col items-center gap-6 px-6 lg:gap-[52px] lg:px-[80px]">
				<h3 className="text-center font-bold lg:text-[32px]">Why SchoolCare is Your Ideal Platform</h3>

				<div className="flex flex-col gap-[54px] max-lg:items-center lg:flex-row-reverse lg:gap-10">
					<Carousel.Root className="flex w-full max-w-[379px] flex-col gap-5.5 lg:max-w-[623px]">
						<Carousel.Content className="size-full cursor-grab gap-5.5">
							<For
								each={carouselItems}
								renderItem={(item) => (
									<Carousel.Item key={item.imageURL} className="h-[333px] lg:h-full">
										<Image
											src={item.imageURL}
											width={379}
											height={333}
											className="size-full rounded-[12px] object-cover lg:rounded-[24px]"
										/>
									</Carousel.Item>
								)}
							/>
						</Carousel.Content>

						<Carousel.IndicatorList
							classNames={{
								indicator: "size-2 bg-[hsl(0,0%,85%)] data-[selected=true]:bg-210-79-44 lg:size-3",
								indicatorGroup: "-bottom-5.5 lg:-bottom-[52px]",
							}}
						/>
					</Carousel.Root>

					<ForWithWrapper
						className="flex flex-col gap-6 lg:gap-11.5"
						each={reasons}
						renderItem={(reason) => (
							<li
								key={reason.title}
								className="flex flex-col gap-1 rounded-[12px] border-[3px] border-210-78-82 px-6
									py-4 lg:rounded-[24px] lg:px-10 lg:py-5.5"
							>
								<h4 className="text-[14px] font-medium lg:text-[24px]">{reason.title}</h4>
								<p className="text-[12px] lg:text-[14px]">{reason.description}</p>
							</li>
						)}
					/>
				</div>
			</section>

			<section
				className="flex flex-col items-center gap-6 bg-[hsl(210,25%,97%)] px-6 py-[20px_40px]
					lg:gap-[52px] lg:px-[80px] lg:py-[60px_100px]"
			>
				<h3 className="text-center font-bold lg:text-[32px]">Frequently Asked Questions</h3>

				<AccordionFaqs />
			</section>

			<section className="px-6 lg:px-[80px]">
				<Carousel.Root className="flex flex-col items-center gap-3.5 lg:gap-10">
					<div className="flex w-full items-center *:ml-auto">
						<h3 className="text-center font-bold lg:text-[32px]">Latest Blog Posts</h3>
						<Carousel.Context>
							{(ctx) => (
								<div
									className="flex shrink-0 items-center gap-2 rounded-[40px] bg-[hsl(0,0%,96%)]
										p-1 text-[12px] lg:gap-4.5 lg:text-base"
								>
									<button
										type="button"
										onClick={ctx.scrollPrev}
										className="grid size-4.5 place-content-center rounded-full
											bg-[hsl(209,93%,95%)] lg:size-12"
									>
										<IconBox icon="lucide:chevron-left" className="lg:size-6" />
									</button>
									<p>
										{ctx.selectedIndex + 1}/{ctx.totalItems}
									</p>
									<button
										type="button"
										onClick={ctx.scrollNext}
										className="grid size-4.5 place-content-center rounded-full bg-school-blue-500
											text-white lg:size-12"
									>
										<IconBox icon="lucide:chevron-right" className="lg:size-6" />
									</button>
								</div>
							)}
						</Carousel.Context>
					</div>

					<Carousel.Content className="size-full justify-between gap-6.5">
						<For
							each={blogPosts}
							renderItem={(post, index) => (
								<Carousel.Item
									key={index}
									className="max-w-[379px] cursor-grab active:cursor-grabbing lg:max-w-[408px]"
								>
									<Card.Root className="size-full">
										<div className="h-[258px]">
											<Image
												className="h-full rounded-t-[24px] object-cover"
												src={post.imageURL}
												draggable={false}
												width={383}
												height={258}
											/>
										</div>

										<div
											className="flex grow flex-col gap-3 rounded-b-[12px] border-2
												border-[hsl(0,0%,78%)] px-4 py-6 select-none lg:rounded-b-[24px]
												lg:border-[3px]"
										>
											<Card.Header className="flex grow flex-col justify-between gap-5">
												<Card.Title className="text-[14px] font-medium lg:text-base">
													{post.title}
												</Card.Title>

												<Card.Description className="text-[12px] text-inherit lg:text-[14px]">
													{post.description}
												</Card.Description>
											</Card.Header>

											<Card.Footer>
												<a
													href="#"
													className="text-[12px] text-[hsl(0,0%,46%)] lg:text-[14px]"
												>
													See more...
												</a>
											</Card.Footer>
										</div>
									</Card.Root>
								</Carousel.Item>
							)}
						/>
					</Carousel.Content>
				</Carousel.Root>
			</section>
		</main>
	);
}

export default HomePage;
