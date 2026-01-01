import { useMutationState } from "@tanstack/react-query";
// import { useStorageState } from "@zayne-labs/toolkit-react";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Table } from "@/components/ui";
import {
	checkResultMutation,
	type CheckResultMutationResultType,
} from "@/lib/react-query/mutationOptions";
import { cnMerge } from "@/lib/utils/cn";
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
	// const [resultData] = useStorageState<CheckResultMutationResultType | null>("scratch-card-result", null);

	const [resultData] = useMutationState({
		filters: { mutationKey: checkResultMutation().mutationKey },
		select: (data) => data.state.data as CheckResultMutationResultType,
	});

	const tableData =
		resultData?.results.map((result) => ({
			[columns[0]]: result.subject,
			[columns[1]]: result.first_ca,
			[columns[2]]: result.second_ca,
			[columns[3]]: result.exam,
			[columns[4]]: result.total,
			[columns[5]]: result.grade,
			[columns[6]]: result.class_subject_average.toFixed(2),
			[columns[7]]: result.remark,
		})) ?? [];

	return (
		<Main className="gap-7 pb-[50px] md:gap-13 md:px-8 lg:px-[100px]">
			<section className="flex flex-col gap-8">
				<h2 className="text-center text-[18px] font-medium uppercase md:text-[24px]">
					Cognitive Ability
				</h2>

				<Table.Root
					classNames={{
						container: "print:overflow-visible",
						table: "border-separate rounded-[20px] border-2 border-school-gray",
					}}
				>
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

					<Table.Body>
						{tableData.length === 0 && (
							<Table.Row className="relative h-[65px]">
								<Table.Cell className="absolute inset-0 flex items-center justify-center text-base">
									No results found
								</Table.Cell>
							</Table.Row>
						)}

						{tableData.map((result) => (
							<Table.Row key={result.Subject}>
								{columns.map((column) => (
									<Table.Cell
										key={column}
										className={cnMerge(
											`h-[65px] px-7 text-center not-last:border-r-2
											not-last:border-r-[hsl(0,0%,68%)] not-in-[tr:last-child]:border-b-2
											not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]`,
											column === "Subject" && "text-left"
										)}
									>
										{result[column]}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</section>

			<section>
				<Table.Root
					classNames={{
						container: "print:overflow-visible",
						table: "border-separate rounded-[8px] border border-school-gray",
					}}
				>
					<Table.Body>
						<Table.Row className="leading-8 font-medium uppercase md:text-[20px]">
							<Table.Cell
								className="not-last:border-r not-last:border-r-[hsl(0,0%,68%)]
									not-in-[tr:last-child]:border-b not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]
									md:h-[100px]"
							>
								<p className="mx-auto w-[219px]">
									STUDENT'S TOTAL SCORE = {resultData?.total_score}
								</p>
							</Table.Cell>
							<Table.Cell
								className="not-last:border-r not-last:border-r-[hsl(0,0%,68%)]
									not-in-[tr:last-child]:border-b not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]
									md:h-[100px]"
							>
								<p className="mx-auto w-[256px]">
									STUDENT'S AVERAGE SCORE = {resultData?.average}
								</p>
							</Table.Cell>
							<Table.Cell
								className="not-last:border-r not-last:border-r-[hsl(0,0%,68%)]
									not-in-[tr:last-child]:border-b not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]
									md:h-[100px]"
							>
								<p className="mx-auto w-[198px]">
									CLASS AVERAGE SCORE = {resultData?.class_average_score.toFixed(2)}
								</p>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</section>

			<section className="mt-6 flex flex-col gap-4 md:mt-10 md:gap-6">
				<p className="flex w-full flex-wrap gap-1 text-sm md:items-baseline md:gap-1.5 md:text-[18px]">
					<span className="text-base font-medium md:text-[20px]">
						Headmaster's / Teacher's Comment:
					</span>
					<span className="grow border-b border-school-body-color/70 box-decoration-clone">
						{resultData?.comment}
					</span>
				</p>

				<article className="flex gap-4 md:gap-[100px]">
					<p className="flex w-full items-baseline gap-1.5">
						<span className="text-base font-medium md:text-[20px]">Signature:</span>
						<span className="grow border-b border-school-body-color/70" />
					</p>

					<p className="flex w-full items-baseline gap-1.5">
						<span className="text-base font-medium md:text-[20px]">Date:</span>
						<span className="grow border-b border-school-body-color/70" />
					</p>
				</article>
			</section>

			<section className="mt-8 self-center md:mt-12 md:self-end">
				<button
					type="button"
					className="max-w-fit rounded-[10px] bg-school-blue-500 px-6 py-2.5 text-base font-bold
						text-white md:px-8 md:py-3 md:text-[18px] print:hidden"
					onClick={() => window.print()}
				>
					Print result
				</button>
			</section>
		</Main>
	);
}

export default ResultSheetPage;
