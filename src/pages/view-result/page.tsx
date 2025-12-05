import { Table } from "@/components/ui";
import type { CheckResultResponseData } from "@/lib/api/callBackendApi";
import { cnMerge } from "@/lib/utils/cn";
import { useStorageState } from "@zayne-labs/toolkit-react";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Main } from "../admin/school/dashboard/-components/Main";

const columns = defineEnum([
	"Subject",
	"First CA",
	"Second CA",
	"Exam",
	"Total",
	"Grade",
	"Class Subject Average",
	"Remark",
]);

function ResultSheetPage() {
	const [data] = useStorageState<CheckResultResponseData | null>("scratch-card-result", null);

	const tableData =
		data?.results.map((result) => ({
			[columns[0]]: result.subject,
			[columns[1]]: result.first_ca,
			[columns[2]]: result.second_ca,
			[columns[3]]: result.exam,
			[columns[4]]: result.total,
			[columns[5]]: result.grade,
			[columns[6]]: result.class_subject_average,
			[columns[7]]: result.remark,
		})) ?? [];

	return (
		<Main className="gap-7 pb-[70px] md:gap-13 md:px-8">
			<section className="flex flex-col gap-8">
				<h2 className="text-center text-[24px] font-medium uppercase">Cognitive Ability</h2>

				<Table.Root className="border-separate rounded-[20px] border-2 border-school-gray">
					<Table.Header>
						<Table.Row>
							{columns.map((column) => (
								<Table.Head
									key={column}
									className={cnMerge(
										`h-[84px] min-w-[80px] border-b-2 border-b-[hsl(0,0%,68%)] text-center
										font-medium whitespace-nowrap not-last:border-r-2
										not-last:border-r-[hsl(0,0%,68%)] first:rounded-tl-[20px]
										last:rounded-tr-[20px]`,
										column === "Subject" && "min-w-[150px] px-6 text-left",
										column === "Class Subject Average" && "max-w-[80px] whitespace-normal",
										column === "Remark" && "min-w-[120px]"
									)}
								>
									{column.toUpperCase()}
								</Table.Head>
							))}
						</Table.Row>
					</Table.Header>

					<Table.Body className="relative">
						{tableData.length === 0 && (
							<div className="h-[65px] w-full">
								<p className="absolute inset-0 flex items-center justify-center text-base">
									No results found
								</p>
							</div>
						)}

						{tableData.map((result) => (
							<Table.Row key={result.Subject}>
								{columns.map((column) => (
									<Table.Cell
										key={column}
										className="h-[65px] px-7 not-last:border-r-2
											not-last:border-r-[hsl(0,0%,68%)] not-in-[tr:last-child]:border-b-2
											not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]"
									>
										{result[column]}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</section>

			<section className="flex flex-col gap-[18px]">
				<div>
					<Table.Root className="border-separate rounded-[8px] border border-school-gray">
						<Table.Body>
							<Table.Row
								className="text-[24px] leading-8 font-medium uppercase
									[&_td:not(:last-child)]:border-r
									[&_td:not(:last-child)]:border-r-[hsl(0,0%,68%)]
									[&:not(:last-child)_td]:border-b
									[&:not(:last-child)_td]:border-b-[hsl(0,0%,68%)]"
							>
								<Table.Cell className="h-[125px]">
									<p className="mx-auto max-w-[219px]">
										STUDENT’S TOTAL SCORE = {data?.total_score}
									</p>
								</Table.Cell>
								<Table.Cell className="h-[125px]">
									<p className="mx-auto max-w-[256px]">
										STUDENT’S AVERAGE SCORE = {data?.average}
									</p>
								</Table.Cell>
								<Table.Cell className="h-[125px]">
									<p className="mx-auto max-w-[198px]">
										CLASS AVERAGE SCORE = {data?.class_average_score}
									</p>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table.Root>
				</div>

				<h3 className="text-center text-[24px] font-medium">GRADE SCALES</h3>

				<Table.Root className="border-separate rounded-[8px] border border-school-gray">
					<Table.Body>
						<Table.Row
							className="text-center text-[24px] leading-8 font-medium uppercase
								[&_td:not(:last-child)]:border-r [&_td:not(:last-child)]:border-r-[hsl(0,0%,68%)]
								[&:not(:last-child)_td]:border-b [&:not(:last-child)_td]:border-b-[hsl(0,0%,68%)]"
						>
							<Table.Cell className="h-[70px]">90 - 100 = A+</Table.Cell>
							<Table.Cell className="h-[70px]">80 - 89 = A6</Table.Cell>
							<Table.Cell className="h-[70px]">70 - 79 = B</Table.Cell>
							<Table.Cell className="h-[70px]">60 - 69 = C</Table.Cell>
						</Table.Row>

						<Table.Row
							className="text-center text-[24px] leading-8 font-medium uppercase
								[&_td:not(:last-child)]:border-r [&_td:not(:last-child)]:border-r-[hsl(0,0%,68%)]
								[&:not(:last-child)_td]:border-b [&:not(:last-child)_td]:border-b-[hsl(0,0%,68%)]"
						>
							<Table.Cell className="h-[70px]">50 - 59 = B</Table.Cell>
							<Table.Cell className="h-[70px]">40 - 49 = E</Table.Cell>
							<Table.Cell className="h-[70px]">30 - 39 = F</Table.Cell>
							<Table.Cell className="h-[70px]">Below 30 = U</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</section>

			<section className="flex flex-col gap-5">
				<article className="grid grid-cols-[auto_1fr] gap-x-1.5 gap-y-4">
					<p className="text-[24px] font-medium whitespace-nowrap">
						Headmaster’s / Teacher’s Comment:
					</p>

					<p className="mt-[9px] flex grow flex-col flex-wrap gap-0.5 text-[18px]">
						<span className="leading-4">{data?.comment}</span>
						<hr className="w-full border border-school-body-color/70" />
					</p>

					<hr className="col-span-2 w-full border border-school-body-color/70" />
				</article>

				<article className="flex gap-[100px]">
					<div className="flex w-full items-center gap-1.5">
						<p className="text-[24px] font-medium whitespace-nowrap">Signature:</p>
						<hr className="mt-4 w-full border border-school-body-color/70" />
					</div>

					<div className="flex w-full items-center gap-1.5">
						<p className="text-[24px] font-medium whitespace-nowrap">Date:</p>
						<hr className="mt-4 w-full border border-school-body-color/70" />
					</div>
				</article>
			</section>
		</Main>
	);
}

export default ResultSheetPage;
