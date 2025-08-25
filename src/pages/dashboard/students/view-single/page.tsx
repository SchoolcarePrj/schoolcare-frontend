import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { z } from "@/lib/zod";
import { useQueryClientStore } from "@/store/react-query/queryClientStore";
import { studentsByIDQuery } from "@/store/react-query/queryFactory";
import { useViewStudentFormStore } from "@/store/zustand/viewStudentFormStore";
import { Main } from "../../-components/Main";

const ViewSingleStudentsSchema = z.object({
	reg_number: z.string().min(1, "Reg number is required"),
});

function ViewSingleStudent() {
	const navigate = useNavigate();

	const methods = useForm({
		defaultValues: {
			reg_number: "",
		},
		resolver: zodResolver(ViewSingleStudentsSchema),
	});

	const onSubmit = methods.handleSubmit(async (data) => {
		useViewStudentFormStore.setState({ studentId: data.reg_number });

		await useQueryClientStore
			.getState()
			.queryClient.prefetchQuery(studentsByIDQuery({ studentId: data.reg_number }));

		void navigate("./table");
	});

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">View Student</h1>
			</header>

			<section>
				<Form.Root
					methods={methods}
					className="gap-10 md:gap-[56px]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof methods.control> name="reg_number" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Reg. Number*</Form.Label>

						<Form.Input
							placeholder="Enter student's reg number"
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						/>

						<Form.ErrorMessage />
					</Form.Field>

					<Form.ErrorMessage type="root" errorField="serverError" />

					<div className="flex gap-6 self-end">
						<button
							type="reset"
							className="flex h-9 w-fit items-center justify-center self-end rounded-[10px] border
								border-school-blue bg-white px-5 text-[14px] font-semibold text-school-blue
								md:h-[56px] md:px-8 md:text-[18px]"
						>
							Cancel
						</button>

						<Form.Submit
							// disabled={methods.formState.isSubmitting}
							className={cnMerge(
								`flex h-9 w-fit items-center justify-center self-end rounded-[10px] bg-school-blue
								px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8 md:text-[18px]`,
								!methods.formState.isValid && "cursor-not-allowed bg-gray-400",
								methods.formState.isSubmitting && "grid"
							)}
						>
							{methods.formState.isSubmitting && (
								<span className="flex justify-center [grid-area:1/1]">
									<IconBox icon="svg-spinners:6-dots-rotate" className="size-6" />
								</span>
							)}
							<p className={cnJoin(methods.formState.isSubmitting && "invisible [grid-area:1/1]")}>
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
