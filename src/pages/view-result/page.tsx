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
	"Class Average",
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
			[columns[6]]: "",
			[columns[7]]: result.remark,
		})) ?? [];

	return (
		<Main className="gap-7 md:gap-13">
			<section className="flex flex-col gap-6">
				<h2 className="text-center text-[24px] font-medium uppercase">Cognitive Ability</h2>
				<Table.Root className="border-separate rounded-[20px] border-2 border-school-gray">
					<Table.Header>
						<Table.Row>
							{columns.map((column) => (
								<Table.Head
									key={column}
									className={cnMerge(
										`h-[70px] min-w-[80px] border-b-2 border-b-[hsl(0,0%,68%)] text-center
										font-medium not-last:border-r-2 not-last:border-r-[hsl(0,0%,68%)]`,
										column === "Subject" && "min-w-[200px] px-6 text-left",
										column === "Remark" && "min-w-[120px]"
									)}
								>
									<div className="wrap-break-word">{column.toUpperCase()}</div>
								</Table.Head>
							))}
						</Table.Row>
					</Table.Header>

					<Table.Body className="relative">
						{tableData.length === 0 && (
							<div className="h-[56px] w-full">
								<p className="absolute inset-0 flex items-center justify-center text-base">
									No results found
								</p>
							</div>
						)}

						{tableData.map((result) => (
							<Table.Row
								key={result.Subject}
								className="[&_td:not(:last-child)]:border-r-2
									[&_td:not(:last-child)]:border-r-[hsl(0,0%,68%)]
									[&:not(:last-child)_td]:border-b-2
									[&:not(:last-child)_td]:border-b-[hsl(0,0%,68%)]"
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
		</Main>
	);
}

export default ResultSheetPage;
