import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { ForWithWrapper } from "@/components/common";
import { BookIcon, SchoolIcon, StudentIcon } from "@/components/icons";
import { Card } from "@/components/ui";
import {
	allClassesInSchoolQuery,
	allStudentsInSchoolQuery,
	allSubjectsInSchoolQuery,
	studentsGenderQuery,
} from "@/lib/react-query/queryOptions";
import { GenderRatioChart } from "./-components/GenderRatioChart";
import { Main } from "./-components/Main";

function DashboardPage() {
	const allSubjectsInSchoolQueryResult = useQuery(allSubjectsInSchoolQuery());

	const allStudentsInSchoolQueryResult = useQuery(allStudentsInSchoolQuery());

	const allClassesInSchoolQueryResult = useQuery(allClassesInSchoolQuery());

	const studentsGenderQueryResult = useQuery(studentsGenderQuery());

	const infoCardArray = [
		{
			description: allStudentsInSchoolQueryResult.data?.data.length ?? 0,
			icon: <StudentIcon className="max-md:size-3" />,
			title: "Registered Students",
		},
		{
			description: allSubjectsInSchoolQueryResult.data?.data.length ?? 0,
			icon: <BookIcon className="max-md:size-3" />,
			title: "Number of Subjects",
		},
		{
			description: allClassesInSchoolQueryResult.data?.data.length ?? 0,
			icon: <SchoolIcon className="max-md:size-3" />,
			title: "Numbers of Classes",
		},
	];

	return (
		<Main className="flex w-full flex-col gap-10 py-4 md:gap-6">
			<ForWithWrapper
				as="section"
				className="flex gap-5 md:gap-10"
				each={infoCardArray}
				renderItem={(item) => (
					<Card.Root
						key={item.title}
						className="w-[calc(100%/3)] rounded-[8px] border-2 border-school-gray-lighter bg-white
							py-[20px_9px] md:rounded-[30px] md:py-[30px_32px]"
					>
						<Card.Content className="flex flex-col items-center px-0">
							<span
								className="flex size-6 items-center justify-center rounded-full
									border-[3px] border-school-blue-500 md:size-[70px]"
							>
								{item.icon}
							</span>

							<hr className="my-2 h-2 w-full bg-school-blue-500 md:hidden" />

							<Card.Title
								className="px-3 text-center text-[10px] font-medium md:mt-3.5 md:text-[12px]"
							>
								{item.title}
							</Card.Title>

							<Card.Description
								className="px-3 text-[13px] font-bold text-black md:mt-1 md:text-[24px]"
							>
								<NumberFlow value={item.description} />
							</Card.Description>
						</Card.Content>

						<hr className="mt-3 h-4 w-full bg-school-blue-500 max-md:hidden" />
					</Card.Root>
				)}
			/>

			<section className="flex flex-col items-center md:ml-auto md:w-[calc(100%/3.3)]">
				<GenderRatioChart genderResponseData={studentsGenderQueryResult.data?.data} />
			</section>
		</Main>
	);
}

export default DashboardPage;
