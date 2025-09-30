import { useStorageState } from "@zayne-labs/toolkit-react";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Table } from "@/components/ui";
import type { CheckResultResponseData } from "@/lib/api/callBackendApi";
import { Main } from "../admin/school/dashboard/-components/Main";

const columns = defineEnum(["Subject", "First CA", "Second CA", "Exam", "Total", "Grade", "Remark"]);

const toOrdinal = (number: number) => {
	const rules = new Intl.PluralRules("en", { type: "ordinal" });

	const suffixes = {
		few: "rd",
		many: "th",
		one: "st",
		other: "th",
		two: "nd",
		zero: "th",
	} satisfies Record<Intl.LDMLPluralRule, string>;

	const rule = rules.select(number);

	const selectedSuffix = suffixes[rule];

	return `${number}${selectedSuffix}`;
};

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
			[columns[6]]: result.remark,
		})) ?? [];

	return (
		<Main className="gap-7 md:gap-13">
			<section className="flex flex-col gap-6">
				<h2 className="text-center text-[24px] font-semibold">RESULT SHEET</h2>

				<Table.Root className="border-separate rounded-[20px] border-2 border-[hsl(313,0%,42%)]">
					<Table.Header>
						<Table.Row>
							{columns.map((column) => (
								<Table.Head
									key={column}
									className="min-w-[60px] border-b border-b-[hsl(0,0%,3%)] p-4 text-center
										font-bold text-black not-last:border-r not-last:border-r-[hsl(0,0%,3%)]"
								>
									{column}
								</Table.Head>
							))}
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{tableData.length === 0 && (
							<Table.Row className="flex h-[56px] items-center justify-center">
								No results found
							</Table.Row>
						)}
						{tableData.map((result) => (
							<Table.Row
								key={result.Subject}
								className="[&_td:not(:last-child)]:border-r
									[&_td:not(:last-child)]:border-r-[hsl(0,0%,3%)] [&:not(:last-child)_td]:border-b
									[&:not(:last-child)_td]:border-b-[hsl(0,0%,3%)]"
							>
								{columns.map((column) => (
									<Table.Cell key={column} className="h-[56px] px-7">
										{result[column]}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</section>

			<section className="flex gap-5 md:gap-7">
				<article
					className="grid shrink-0 grid-cols-[auto_auto] gap-x-8 gap-y-4 rounded-[24px] border-[1px]
						border-[hsl(0,0%,76%)] bg-[hsl(0,0%,96%)] px-5 py-6 md:px-10 md:py-12"
				>
					<p className="font-semibold">Average score:</p>
					<p className="text-[hsl(2,84%,59%)]">{data?.average}%</p>

					<p className="font-semibold">Class Position:</p>
					<p className="text-[hsl(2,84%,59%)]">
						{Boolean(data?.position) && toOrdinal(data.position)}
					</p>

					<p className="font-semibold">Total Number in class:</p>
					<p className="text-[hsl(2,84%,59%)]">{data?.class_students_count}</p>

					{/* <p className="font-semibold">Total Score:</p>
					<p className="text-[hsl(2,84%,59%)]">{data?.total_score}</p> */}
				</article>

				<article
					className="flex w-full flex-col justify-center gap-2 rounded-[24px] border-[1px]
						border-[hsl(0,100%,71%)] bg-[hsl(0,61%,99%)] px-7 md:px-13"
				>
					<h5 className="text-[20px] font-semibold">Teacher's Comment:</h5>
					<p>{data?.comment}</p>
				</article>
			</section>

			<section className="flex gap-5 md:gap-7">
				<article
					className="flex w-full flex-col gap-4 rounded-[24px] border-[1px] border-school-blue-500
						bg-[hsl(208,76%,98%)] p-6 md:gap-7 md:p-9"
				>
					<button
						type="button"
						className="grid h-10 w-full place-items-center rounded-[8px] bg-school-blue-500
							text-white"
					>
						Key to grade
					</button>

					<div>
						<p>A = 80-100 (Excellent)</p>
						<p>B+ = 70-79 (Very Good)</p>
						<p>B = 60-69 (Good)</p>
						<p>C = 50-59 (Satisfactory)</p>
						<p>D = 40-49 (Fair)</p>
						<p>F = 0-39 (Fail)</p>
					</div>
				</article>

				<article
					className="flex w-full flex-col gap-4 rounded-[24px] border-[1px] border-school-blue-500
						bg-[hsl(208,76%,98%)] p-7 md:gap-7 md:p-9"
				>
					<button
						type="button"
						className="grid h-10 w-full place-items-center rounded-[8px] bg-school-blue-500
							text-white"
					>
						Key to remark
					</button>

					<div>
						<p>Excellent = Outstanding performance</p>
						<p>Very Good = Above average performance</p>
						<p>Good = Average performance</p>
						<p>Satisfactory = Below average but acceptable</p>
						<p>Fair = Needs improvement</p>
						<p>Poor = Requires serious attention</p>
					</div>
				</article>
			</section>
		</Main>
	);
}

export default ResultSheetPage;
