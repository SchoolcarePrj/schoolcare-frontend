import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";
import { Table } from "@/components/ui";
import { useInputScoreFormStore } from "@/lib/zustand/inputScoresFormStore";
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

		return <Navigate to="/dashboard/students/input-scores" />;
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

		void navigate("/dashboard/students/input-scores/upload");
	};

	return (
		<Main className="flex flex-col bg-white pt-12">
			<section>
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
						{tableData.map((student) => (
							<Table.Row
								key={student["Reg. No"]}
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

			<section className="mt-auto flex gap-6 self-end">
				<button
					type="reset"
					className="max-w-fit rounded-[10px] border border-school-blue bg-white px-8 py-4 text-[18px]
						font-bold text-school-blue"
				>
					Cancel
				</button>

				<button
					type="button"
					className="max-w-fit rounded-[10px] bg-school-blue px-8 py-4 text-[18px] font-bold
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
