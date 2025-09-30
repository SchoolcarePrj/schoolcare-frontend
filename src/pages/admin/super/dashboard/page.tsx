import { Icon } from "@iconify/react";
import { tw } from "@zayne-labs/toolkit-core";
import { ForWithWrapper } from "@/components/common";
import { Card } from "@/components/ui";
import { cnJoin } from "@/lib/utils/cn";
import { Main } from "./-components/Main";

const infoCardArray = [
	{
		cardColorClass: tw`border-school-dark-blue-200 bg-school-dark-blue-50`,
		icon: { colorClass: tw`text-school-blue-500`, value: "lucide:school" },
		mainTitle: { label: "Total Number of Schools", value: "8.00" },
		subTitle: { label: "Pending Approval", value: "5" },
	},
	{
		cardColorClass: tw`border-school-green-200 bg-school-green-50`,
		icon: { colorClass: tw`text-school-green-500`, value: "hugeicons:students" },
		mainTitle: { label: "Total Number of Students", value: "3,400" },
		subTitle: { label: "Total Results Checked", value: "2,010" },
	},
	{
		cardColorClass: tw`border-school-yellow-200 bg-school-yellow-50`,
		icon: { colorClass: tw`text-school-yellow-500`, value: "streamline-plump:news-paper" },
		mainTitle: { label: "Total Number of Blogs", value: "10.00" },
		subTitle: { label: "Pending Approval", value: "8" },
	},
];

function DashboardPage() {
	return (
		<Main>
			<ForWithWrapper
				as="section"
				className="flex gap-3.5"
				each={infoCardArray}
				renderItem={(item) => (
					<Card.Root
						key={item.mainTitle.label}
						className={cnJoin("w-full rounded-[20px] border bg-white p-7", item.cardColorClass)}
					>
						<Card.Content className="flex flex-col gap-1">
							<div className="flex items-center justify-between">
								<h2 className="font-medium">{item.mainTitle.label}</h2>
								<Icon
									icon={item.icon.value}
									className={cnJoin("size-6 shrink-0", item.icon.colorClass)}
								/>
							</div>

							<Card.Title className="text-[32px]">{item.mainTitle.value}</Card.Title>

							<div className="flex items-center justify-between">
								<Card.Description className="text-[14px] text-[hsl(0,0%,52%)]">
									{item.subTitle.label}
								</Card.Description>
								<p className={cnJoin("text-[14px]", item.icon.colorClass)}>
									{item.subTitle.value}
								</p>
							</div>
						</Card.Content>
					</Card.Root>
				)}
			/>
		</Main>
	);
}

export default DashboardPage;
