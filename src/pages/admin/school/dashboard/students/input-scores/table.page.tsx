import { Table } from "@/components/ui";
import { useInputScoreFormStore } from "@/lib/zustand/inputScoresFormStore";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { Main } from "../../-components/Main";

const columns = defineEnum(["Name", "Reg. No", "First CA", "Second CA", "Exam", "Total", "Grade"]);

function TablePage() {
	const navigate = useNavigate();
	const { class_session_term, students } = useInputScoreFormStore((state) => state.responseData);

	const csvConfig = mkConfig({
		columnHeaders: columns,
		filename: `students-results-${class_session_term.session}-${class_session_term.term}-${class_session_term.school_class}`,
		quoteStrings: false,
		title: "Students Result Sheet",
		useBom: false,
	});

	if (students.length === 0) {
		toast.error("No students found");

		return <Navigate to="/admin/school/dashboard/students/input-scores" />;
	}

	const tableData = students.map((student) => ({
		[columns[0]]: student.name,
		[columns[1]]: student.reg_number,
		[columns[2]]: "",
		[columns[3]]: "",
		[columns[4]]: "",
		[columns[5]]: "",
		[columns[6]]: "",
	}));

	const handleCSVDownload = () => {
		const csv = generateCsv(csvConfig)(tableData);

		download(csvConfig)(csv);

		void navigate("/admin/school/dashboard/students/input-scores/upload");
	};

	return (
		<Main className="flex flex-col bg-white pt-12">
			<section>
				<Table.Root className="border-separate rounded-[20px] border-2 border-school-gray">
					<Table.Header>
						<Table.Row>
							{columns.map((column) => (
								<Table.Head
									key={column}
									className="h-[84px] min-w-[80px] border-b-2 border-b-[hsl(0,0%,68%)] text-center
										font-medium not-last:border-r-2 not-last:border-r-[hsl(0,0%,68%)]"
								>
									{column}
								</Table.Head>
							))}
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{tableData.map((student) => (
							<Table.Row key={student["Reg. No"]}>
								{columns.map((column) => (
									<Table.Cell
										key={column}
										className="h-[65px] px-7 not-last:border-r-2
											not-last:border-r-[hsl(0,0%,68%)] not-in-[tr:last-child]:border-b-2
											not-in-[tr:last-child]:border-b-[hsl(0,0%,68%)]"
									>
										{student[column]}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</section>

			<section className="mt-auto flex gap-6 self-end">
				<button
					type="reset"
					className="max-w-fit rounded-[10px] border border-school-blue-500 bg-white px-8 py-4
						text-[18px] font-bold text-school-blue-500"
				>
					Cancel
				</button>

				<button
					type="button"
					className="max-w-fit rounded-[10px] bg-school-blue-500 px-8 py-4 text-[18px] font-bold
						text-white"
					onClick={handleCSVDownload}
				>
					Export to CSV
				</button>
			</section>
		</Main>
	);
}

export default TablePage;
