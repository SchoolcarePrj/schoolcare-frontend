import { useQuery } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Table } from "@/components/ui";
import { studentsByIDQuery } from "@/lib/react-query/queryOptions";
import { useViewStudentFormStore } from "@/lib/zustand/viewStudentFormStore";
import { Main } from "../../-components/Main";

const columns = defineEnum(["Name", "Gender", "Reg. No"]);

function TablePage() {
	const studentId = useViewStudentFormStore((state) => state.studentId);

	const studentsQueryResult = useQuery(studentsByIDQuery({ studentId }));

	const tableData = [
		{
			[columns[0]]: studentsQueryResult.data?.data.name,
			[columns[1]]: studentsQueryResult.data?.data.gender,
			[columns[2]]: studentsQueryResult.data?.data.registration_number,
		},
	];

	return (
		<Main className="flex flex-col bg-white pt-12">
			<section>
				<Table.Root className="border-separate rounded-[20px] border-2 border-school-gray">
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
						{tableData.map((student) => (
							<Table.Row
								key={student.Name}
								className="[&_td:not(:last-child)]:border-r
									[&_td:not(:last-child)]:border-r-[hsl(0,0%,3%)] [&:not(:last-child)_td]:border-b
									[&:not(:last-child)_td]:border-b-[hsl(0,0%,3%)]"
							>
								{columns.map((column) => (
									<Table.Cell key={column} className="h-[56px] px-7">
										{student[column]}
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

export default TablePage;
