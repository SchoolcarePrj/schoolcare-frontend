import { Table } from "@/components/ui";
import { studentsByClassQuery } from "@/lib/react-query/queryOptions";
import { cnMerge } from "@/lib/utils/cn";
import { useViewStudentFormStore } from "@/lib/zustand/viewStudentFormStore";
import { useQuery } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Main } from "../../-components/Main";

const columns = defineEnum(["Name", "Gender", "Reg. No"]);

function TablePage() {
	const studentClass = useViewStudentFormStore((state) => state.studentClass);

	const studentsQueryResult = useQuery(studentsByClassQuery(studentClass));

	const tableData =
		studentsQueryResult.data?.data.students.map((student) => ({
			[columns[0]]: student.name,
			[columns[1]]: student.gender,
			[columns[2]]: student.registration_number,
		})) ?? [];

	return (
		<Main className="flex flex-col bg-white pt-12">
			<section>
				<Table.Root className="border-separate rounded-[20px] border-2 border-school-gray">
					<Table.Header>
						<Table.Row>
							{columns.map((column) => (
								<Table.Head
									key={column}
									className={cnMerge(
										`min-w-[60px] border-b border-b-[hsl(0,0%,3%)] p-4 text-center font-bold
										text-black not-last:border-r not-last:border-r-[hsl(0,0%,3%)]`,
										tableData.length === 0 && "border-b-0"
									)}
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
