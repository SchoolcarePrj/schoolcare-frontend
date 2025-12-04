import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { studentsByIDQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useViewStudentFormStore } from "@/lib/zustand/viewStudentFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Main } from "../../-components/Main";

const ViewSingleStudentsSchema = z.object({
	reg_number: z.string().min(1, "Reg number is required"),
});

function ViewSingleStudent() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			reg_number: "",
		},
		resolver: zodResolver(ViewSingleStudentsSchema),
	});

	const queryClient = useQueryClient();

	const onSubmit = form.handleSubmit(async (data) => {
		useViewStudentFormStore.setState({ studentId: data.reg_number });

		await queryClient.prefetchQuery(
			studentsByIDQuery({
				onSuccess: () => {
					void navigate("./table");
				},
				studentId: data.reg_number,
			})
		);
	});

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">View Student</h1>
			</header>

			<section>
				<Form.Root
					methods={form}
					className="gap-10 md:gap-[56px]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof form.control> name="reg_number" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Reg. Number*</Form.Label>

						<Form.Input
							placeholder="Enter student's reg number"
							className="h-12 gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white px-4
								text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px] md:px-8
								md:text-base"
						/>

						<Form.ErrorMessage />
					</Form.Field>

					<Form.ErrorMessage type="root" errorField="serverError" />

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
							// disabled={form.formState.isSubmitting}
							className={cnMerge(
								`flex h-9 w-fit items-center justify-center self-end rounded-[10px]
								bg-school-blue-500 px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8
								md:text-[18px]`,
								!form.formState.isValid && "cursor-not-allowed bg-gray-400",
								form.formState.isSubmitting && "grid"
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

export default ViewSingleStudent;
