import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { getElementList, IconBox } from "@/components/common";
import { Form, Select } from "@/components/ui";
import { allClassesInSchoolQuery, studentsByClassQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useViewStudentFormStore } from "@/lib/zustand/viewStudentFormStore";
import { Main } from "../../-components/Main";

const ViewAllStudentsSchema = z.object({
	class: z.string().min(1, "Class is required"),
});

export function ViewAllStudentsPage() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			class: "",
		},
		resolver: zodResolver(ViewAllStudentsSchema),
	});

	const classesQueryResult = useQuery(allClassesInSchoolQuery());

	const [ClassesList] = getElementList("base");

	const queryClient = useQueryClient();

	const onSubmit = form.handleSubmit(async (data) => {
		useViewStudentFormStore.setState({ studentClass: data.class });

		const queryData = await queryClient.ensureQueryData(studentsByClassQuery(data.class));

		if (queryData.data.students.length === 0) {
			toast.error(`No students found in ${data.class}. Please register students first.`, {
				duration: 5000,
			});
			return;
		}

		toast.success(queryData.message);

		void navigate("./table");
	});

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">View All Students</h1>
			</header>

			<section>
				<Form.Root
					form={form}
					className="gap-10 md:gap-[56px]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof form.control> name="class" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Choose class</Form.Label>

						<Form.FieldBoundController
							render={({ field }) => (
								<Select.Root name={field.name} value={field.value} onValueChange={field.onChange}>
									<Select.Trigger
										classNames={{
											base: `h-12 rounded-[8px] border border-school-gray-lighter bg-white px-4
											text-[12px] data-placeholder:text-school-gray md:h-[75px]
											md:rounded-[20px] md:px-8 md:text-base md:text-[14px]`,
											icon: "text-school-gray group-data-[state=open]:rotate-180 md:size-6",
										}}
									>
										<Select.Value placeholder="Choose student's class" />
									</Select.Trigger>

									<Select.Content
										classNames={{
											base: "bg-white/90 backdrop-blur-lg",
											viewport: "gap-1",
										}}
									>
										<ClassesList
											each={classesQueryResult.data?.data ?? []}
											renderItem={(item) => (
												<Select.Item
													key={`${item.school_class} ${item.grade}`}
													value={`${item.school_class} ${item.grade}`}
													className="h-12 text-[12px] font-medium text-black focus:bg-gray-300
														focus:text-black data-[state=checked]:bg-gray-300 md:text-base"
												>
													{item.school_class} {item.grade}
												</Select.Item>
											)}
										/>
									</Select.Content>
								</Select.Root>
							)}
						/>
					</Form.Field>

					<div className="flex gap-6 self-end">
						<button
							type="reset"
							className="flex h-9 w-fit items-center justify-center self-end rounded-[10px] border
								border-school-blue-500 bg-white px-5 text-[14px] font-semibold text-school-blue-500
								md:h-[56px] md:px-8 md:text-[18px]"
						>
							Cancel
						</button>

						<Form.Submit
							disabled={form.formState.isSubmitting}
							className={cnMerge(
								`flex h-9 w-fit items-center justify-center self-end rounded-[10px]
								bg-school-blue-500 px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8
								md:text-[18px]`,
								form.formState.isSubmitting && "grid",
								!form.formState.isValid && "cursor-not-allowed bg-gray-400"
							)}
						>
							{form.formState.isSubmitting && (
								<span className="flex justify-center [grid-area:1/1]">
									<IconBox icon="svg-spinners:6-dots-rotate" className="size-6" />
								</span>
							)}
							<p className={cnJoin(form.formState.isSubmitting && "invisible [grid-area:1/1]")}>
								Continue
							</p>
						</Form.Submit>
					</div>
				</Form.Root>
			</section>
		</Main>
	);
}

export default ViewAllStudentsPage;
