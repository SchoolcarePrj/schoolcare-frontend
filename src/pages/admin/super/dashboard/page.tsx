import { Pagination } from "@ark-ui/react/pagination";
import { tw } from "@zayne-labs/toolkit-core";
import { useState } from "react";
import {
	schoolLogoFive,
	schoolLogoFour,
	schoolLogoOne,
	schoolLogoThree,
	schoolLogoTwo,
} from "@/assets/images";
import { schoolOne, schoolThree, schoolTwo } from "@/assets/images/home";
import { For, ForWithWrapper, IconBox, Image } from "@/components/common";
import { Card, DropdownMenu } from "@/components/ui";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { cnJoin } from "@/lib/utils/cn";
import { Main } from "./-components/Main";

const infoCardArray = [
	{
		classNames: {
			cardRootColors: tw`border-school-dark-blue-200 bg-school-dark-blue-50`,
			textColor: tw`text-school-blue-500`,
		},
		icon: "lucide:school",
		mainTitle: { label: "Total Number of Schools", value: "8.00" },
		subTitle: { label: "Pending Approval", value: "5" },
	},
	{
		classNames: {
			cardRootColors: tw`border-school-green-200 bg-school-green-50`,
			textColor: tw`text-school-green-500`,
		},
		icon: "hugeicons:students",
		mainTitle: { label: "Total Number of Students", value: "3,400" },
		subTitle: { label: "Total Results Checked", value: "2,010" },
	},
	{
		classNames: {
			cardRootColors: tw`border-school-yellow-200 bg-school-yellow-50`,
			textColor: tw`text-school-yellow-500`,
		},
		icon: "streamline-plump:news-paper",
		mainTitle: { label: "Total Number of Blogs", value: "10.00" },
		subTitle: { label: "Pending Approval", value: "8" },
	},
];

const activitiesArray = [
	{
		activity: "New school registered – Bright Future Academy",
		time: "2 mins ago",
	},
	{
		activity: "New school registered – Rockville International School",
		time: "2 mins ago",
	},
	{
		activity:
			"Blog post published –  “How to Prepare for Exams” has been published and is now live on the platform.",
		time: "20 mins ago",
	},
	{
		activity: "New school registered – St. Charles Federal College, Abeokuta",
		time: "10 mins ago",
	},
	{
		activity: "System Maintenance Completed",
		time: "2 mins ago",
	},
];

const checkCountArray = [
	{
		checkCount: 200,
		schoolLogoSrc: schoolLogoOne,
		schoolName: "Rock Ville International School",
	},
	{
		checkCount: 158,
		schoolLogoSrc: schoolLogoTwo,
		schoolName: "Grace International College",
	},
	{
		checkCount: 234,
		schoolLogoSrc: schoolLogoThree,
		schoolName: "Bright Future Academy",
	},
	{
		checkCount: 80,
		schoolLogoSrc: schoolOne,
		schoolName: "Girls College",
	},
	{
		checkCount: 56,
		schoolLogoSrc: schoolTwo,
		schoolName: "Faithfield Secondary School",
	},
	{
		checkCount: 92,
		schoolLogoSrc: schoolThree,
		schoolName: "Bluecrest Academy",
	},
	{
		checkCount: 44,
		schoolLogoSrc: schoolLogoFour,
		schoolName: "Golden Gate High School",
	},
	{
		checkCount: 12,
		schoolLogoSrc: schoolLogoFive,
		schoolName: "Gloryland International School",
	},
];

const sessionArray = ["2023/2024", "2024/2025"];

const termArray = ["1st Term", "2nd Term", "3rd Term"];

function DashboardPage() {
	const [selectedSession, setSelectedSession] = useState(sessionArray[0]);
	const [selectedTerm, setSelectedTerm] = useState(termArray[0]);

	return (
		<Main className="gap-6">
			<ForWithWrapper
				as="section"
				className="flex gap-3.5"
				each={infoCardArray}
				renderItem={(item) => (
					<Card.Root
						key={item.mainTitle.label}
						className={cnJoin(
							"w-full rounded-[20px] border bg-white p-7",
							item.classNames.cardRootColors
						)}
					>
						<Card.Content className="flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<h3 className="font-medium">{item.mainTitle.label}</h3>
								<IconBox
									icon={item.icon}
									className={cnJoin("size-6 shrink-0", item.classNames.textColor)}
								/>
							</div>

							<Card.Title className="text-[32px]">{item.mainTitle.value}</Card.Title>

							<div className="flex items-center justify-between">
								<Card.Description className="text-[14px] text-[hsl(0,0%,52%)]">
									{item.subTitle.label}
								</Card.Description>

								<p className={cnJoin("text-[14px]", item.classNames.textColor)}>
									{item.subTitle.value}
								</p>
							</div>
						</Card.Content>
					</Card.Root>
				)}
			/>

			<section className="flex grow gap-5">
				<article
					className="flex w-[calc(1.36*100%)] flex-col gap-5 rounded-[24px] border
						border-[hsl(0,0%,84%)] bg-white p-9.5"
				>
					<header className="flex justify-between gap-5 text-nowrap">
						<h3 className="text-[24px] font-medium">Recent Activities</h3>
						<DateTimePicker
							className="h-11 gap-1.5 rounded-[8px] border border-[hsl(0,0%,84%)] p-2.5 text-base"
							defaultDateString={new Date().toDateString()}
							startMonth={new Date(2025, 0)}
							formats={{ visibleDate: "do MMMM" }}
						/>
					</header>

					<ForWithWrapper
						each={activitiesArray}
						className="flex grow flex-col gap-6"
						renderItem={(item) => (
							<li className="flex flex-col gap-1" key={item.activity}>
								<p>{item.activity}</p>
								<p className="text-[hsl(0,0%,52%)]">({item.time})</p>
							</li>
						)}
					/>

					<Pagination.Root
						count={5}
						pageSize={1}
						siblingCount={3}
						className="flex items-center justify-center gap-6"
					>
						<Pagination.PrevTrigger>
							<IconBox icon="lucide:chevron-left" />
						</Pagination.PrevTrigger>

						<Pagination.Context>
							{(pagination) => (
								<ForWithWrapper
									as="div"
									each={pagination.pages}
									className="flex items-center gap-7"
									renderItem={(page, index) => {
										if (page.type === "page") {
											return (
												<Pagination.Item
													key={index}
													{...page}
													className="text-center data-selected:h-6 data-selected:min-w-7
														data-selected:rounded-[4px] data-selected:bg-school-dark-blue-500
														data-selected:text-[hsl(0,0%,98%)]"
												>
													{page.value}
												</Pagination.Item>
											);
										}

										return (
											<Pagination.Ellipsis key={index} index={index}>
												&#8230;
											</Pagination.Ellipsis>
										);
									}}
								/>
							)}
						</Pagination.Context>

						<Pagination.NextTrigger>
							<IconBox icon="lucide:chevron-right" />
						</Pagination.NextTrigger>
					</Pagination.Root>
				</article>

				<article
					className="flex flex-col gap-7 rounded-[24px] border border-[hsl(0,0%,84%)] bg-white p-9.5"
				>
					<header className="flex justify-between gap-5 text-nowrap">
						<h3 className="text-[24px] font-medium">Number of Checks</h3>

						<div className="flex gap-2">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger
									className="group/trigger flex h-9 items-center justify-between gap-2
										rounded-[8px] border border-[hsl(0,0%,84%)] p-2.5 text-[12px] font-medium"
								>
									<p className="font-medium">{selectedSession}</p>

									<IconBox
										icon="lucide:chevron-down"
										className="size-4 text-school-body-color
											group-data-[state=open]/trigger:rotate-180"
									/>
								</DropdownMenu.Trigger>

								<DropdownMenu.Content
									className="grid gap-1 border border-[hsl(0,0%,84%)] bg-white/90
										backdrop-blur-lg"
									align="start"
								>
									<DropdownMenu.RadioGroup
										value={selectedSession}
										onValueChange={setSelectedSession}
									>
										<For
											each={sessionArray}
											renderItem={(item) => (
												<DropdownMenu.RadioItem
													withIndicator={false}
													value={item}
													className="justify-center px-0 font-medium focus:bg-gray-200
														data-[state=checked]:bg-gray-300"
												>
													{item}
												</DropdownMenu.RadioItem>
											)}
										/>
									</DropdownMenu.RadioGroup>
								</DropdownMenu.Content>
							</DropdownMenu.Root>

							<DropdownMenu.Root>
								<DropdownMenu.Trigger
									className="group/trigger flex h-9 items-center justify-between gap-2
										rounded-[8px] border border-[hsl(0,0%,84%)] p-2.5 text-[12px] font-medium"
								>
									<p className="font-medium">{selectedTerm}</p>

									<IconBox
										icon="lucide:chevron-down"
										className="size-4 text-school-body-color
											group-data-[state=open]/trigger:rotate-180"
									/>
								</DropdownMenu.Trigger>

								<DropdownMenu.Content
									className="grid gap-1 border border-[hsl(0,0%,84%)] bg-white/90
										backdrop-blur-lg"
									align="start"
								>
									<DropdownMenu.RadioGroup value={selectedTerm} onValueChange={setSelectedTerm}>
										<For
											each={termArray}
											renderItem={(item) => (
												<DropdownMenu.RadioItem
													withIndicator={false}
													value={item}
													className="justify-center px-0 font-medium focus:bg-gray-200
														data-[state=checked]:bg-gray-300"
												>
													{item}
												</DropdownMenu.RadioItem>
											)}
										/>
									</DropdownMenu.RadioGroup>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</header>

					<ForWithWrapper
						className="flex flex-col gap-4"
						each={checkCountArray}
						renderItem={(item) => (
							<li className="flex justify-between gap-5 rounded-[8px] bg-[hsl(0,0%,98%)] p-3.5">
								<div className="flex gap-2">
									<Image
										layout="fullWidth"
										src={item.schoolLogoSrc}
										alt={item.schoolName}
										className="size-6 object-cover"
									/>

									<p>{item.schoolName}</p>
								</div>

								<p className="font-medium">{item.checkCount}</p>
							</li>
						)}
					/>
				</article>
			</section>
		</Main>
	);
}

export default DashboardPage;
