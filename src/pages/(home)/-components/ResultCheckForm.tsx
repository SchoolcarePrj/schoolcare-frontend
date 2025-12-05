import { For, IconBox } from "@/components/common";
import { Form, Select } from "@/components/ui";
import { apiSchema } from "@/lib/api/callBackendApi";
import { checkResultMutation } from "@/lib/react-query/mutationOptions";
import { schoolSessionQuery, schoolTermQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const ResultCheckFormSchema = apiSchema.routes["@post/check-result"].body;

function ResultCheckForm() {
	// const { 1: storageActions } = useStorageState<CheckResultResponseData | null>(
	// 	"scratch-card-result",
	// 	null
	// );

	const schoolSessionQueryResult = useQuery(schoolSessionQuery({ meta: { toast: { error: false } } }));
	const schoolTermQueryResult = useQuery(schoolTermQuery({ meta: { toast: { error: false } } }));

	const form = useForm({
		defaultValues: {
			class_grade: "",
			school_class: "",
			school_ID: "",
			scratch_card_code: "",
			serial_number: "",
			session: "",
			student_reg_number: "",
			term: "",
		},
		resolver: zodResolver(ResultCheckFormSchema),
	});

	const navigate = useNavigate();

	const resultViewMutationResult = useMutation(checkResultMutation());

	const onSubmit = form.handleSubmit(async (data) => {
		await resultViewMutationResult.mutateAsync(data, {
			onSuccess: () => {
				void navigate("/view-result");
			},
		});
	});

	return (
		<Form.Root
			methods={form}
			onSubmit={(event) => void onSubmit(event)}
			className="w-full max-w-[600px] rounded-[24px] border-2 border-white px-9 py-11 lg:border-[3px]
				lg:px-10 lg:py-14"
		>
			<h3 className="text-center text-[14px] font-semibold lg:text-[24px]">Check Result</h3>

			<div className="mt-5.5 grid grid-cols-2 gap-x-7 gap-y-4 lg:mt-7 lg:gap-x-11.5 lg:gap-y-6.5">
				<Form.Field<typeof form.control> name="school_ID" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">School ID</Form.Label>
					<Form.Input
						placeholder="Enter school ID"
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="student_reg_number" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Reg. Number</Form.Label>
					<Form.Input
						placeholder="e.g: 20246..."
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="school_class" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Class</Form.Label>
					<Form.Input
						placeholder="e.g: JSS1"
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="class_grade" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Class Grade</Form.Label>
					<Form.Input
						placeholder="e.g: A"
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="session" className="group flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Result Session</Form.Label>

					<Form.FieldController
						render={({ field }) => (
							<Select.Root name={field.name} value={field.value} onValueChange={field.onChange}>
								<Select.Trigger
									classNames={{
										base: `h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3
										text-[11px] group-data-invalid:border-school-red-500
										data-placeholder:text-shadcn-muted-foreground lg:h-12 lg:rounded-[12px]
										lg:border-2 lg:px-6 lg:py-4 lg:text-[14px]`,
										icon: "text-school-gray group-data-[state=open]:rotate-180 md:size-6",
									}}
								>
									<Select.Value placeholder="Select session" />
								</Select.Trigger>

								<Select.Content
									classNames={{
										base: "bg-white/90 backdrop-blur-lg",
										viewport: "gap-1",
									}}
								>
									<For
										each={schoolSessionQueryResult.data?.data ?? []}
										renderItem={(item) => (
											<Select.Item
												key={item}
												value={item}
												className="h-6 text-[11px] font-medium focus:bg-gray-200
													data-[state=checked]:bg-gray-300"
											>
												{item}
											</Select.Item>
										)}
									/>
								</Select.Content>
							</Select.Root>
						)}
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="term" className="group flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Term</Form.Label>

					<Form.FieldController
						render={({ field }) => (
							<Select.Root name={field.name} value={field.value} onValueChange={field.onChange}>
								<Select.Trigger
									classNames={{
										base: `h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3
										text-[11px] group-data-invalid:border-school-red-500
										data-placeholder:text-shadcn-muted-foreground lg:h-12 lg:rounded-[12px]
										lg:border-2 lg:px-6 lg:py-4 lg:text-[14px]`,
										icon: "text-school-gray group-data-[state=open]:rotate-180 md:size-6",
									}}
								>
									<Select.Value placeholder="Select term" />
								</Select.Trigger>

								<Select.Content
									classNames={{
										base: "bg-white/90 backdrop-blur-lg",
										viewport: "gap-1",
									}}
								>
									<For
										each={schoolTermQueryResult.data?.data ?? []}
										renderItem={(item) => (
											<Select.Item
												key={item}
												value={item}
												className="h-6 text-[11px] font-medium focus:bg-gray-300
													focus:text-210-79-44 data-[state=checked]:bg-gray-300"
											>
												{item}
											</Select.Item>
										)}
									/>
								</Select.Content>
							</Select.Root>
						)}
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="scratch_card_code" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Card Pin</Form.Label>
					<Form.Input
						placeholder="Enter card pin"
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>

				<Form.Field<typeof form.control> name="serial_number" className="flex flex-col gap-3">
					<Form.Label className="text-[12px] font-medium lg:text-base">Card Serial No.</Form.Label>
					<Form.Input
						placeholder="e.g: 12348..."
						className="h-10 rounded-[8px] border-2 border-[hsl(0,0%,98%)] px-4 py-3 text-[11px]
							data-invalid:border-school-red-500 lg:h-12 lg:rounded-[12px] lg:border-2 lg:px-6
							lg:py-4 lg:text-[14px]"
					/>
				</Form.Field>
			</div>

			<Form.WatchFormState
				render={(formState) => (
					<Form.Submit
						disabled={formState.isSubmitting}
						className={cnMerge(
							`mx-auto mt-12 flex h-10 w-full max-w-[120px] items-center justify-center
							rounded-[8px] bg-210-79-44 text-[14px] font-semibold lg:mt-14 lg:h-[64px]
							lg:max-w-[216px] lg:rounded-[12px] lg:text-[24px]`,
							formState.isSubmitting && "grid",
							!formState.isValid && "cursor-not-allowed bg-gray-400"
						)}
					>
						<p className={cnJoin(formState.isSubmitting && "invisible [grid-area:1/1]")}>
							Check Result
						</p>

						{formState.isSubmitting && (
							<span className="flex justify-center [grid-area:1/1]">
								<IconBox icon="svg-spinners:6-dots-rotate" className="size-6" />
							</span>
						)}
					</Form.Submit>
				)}
			/>
		</Form.Root>
	);
}

export { ResultCheckForm };
