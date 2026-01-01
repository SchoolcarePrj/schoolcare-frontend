import { For, IconBox } from "@/components/common";
import { Combobox, Form } from "@/components/ui";
import { apiSchema, callBackendApi } from "@/lib/api/callBackendApi";
import { allSubjectsInSchoolQuery, allSubjectsQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Main } from "../-components/Main";

const RegisterSubjectSchema = apiSchema.routes["@post/school/subjects"].body;

function RegisterSubjectPage() {
	const form = useForm({
		defaultValues: {
			subject: "",
		},
		mode: "onChange",
		resolver: zodResolver(RegisterSubjectSchema),
	});

	const subjectQueryResult = useQuery(allSubjectsQuery());

	const queryClient = useQueryClient();

	const onSubmit = form.handleSubmit(async (data) => {
		await callBackendApi("@post/school/subjects", {
			body: data,
			meta: { toast: { success: true } },

			// onResponseError: (ctx) => {
			// 	form.setError("root.serverError", {
			// 		message: ctx.error.errorData.errors?.message,
			// 	});
			// },

			onSuccess: () => {
				form.reset();

				void queryClient.invalidateQueries(allSubjectsInSchoolQuery());
			},
		});
	});

	const formattedSubjectQueryResult =
		subjectQueryResult.data?.data.map((subject) => ({
			label: subject,
			value: subject,
		})) ?? [];

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">Register Subjects</h1>
			</header>

			<section>
				<Form.Root
					form={form}
					className="gap-6 md:gap-8"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof form.control> name="subject" className="gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Select Subject</Form.Label>

						<Form.FieldBoundController
							render={({ field }) => (
								<Combobox.Root
									data={formattedSubjectQueryResult}
									type="subject"
									value={field.value}
									onValueChange={field.onChange}
								>
									<Combobox.Trigger
										classNames={{
											base: cnJoin(
												`flex h-12 items-center justify-between rounded-[8px] border
												border-school-gray-lighter bg-white px-4 text-[12px]
												data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px] md:px-8
												md:text-base md:text-[14px]`,
												!(field.value as boolean) && "text-shadcn-muted-foreground"
											),
											icon: "size-5 text-school-gray md:size-6",
										}}
									/>

									<Combobox.Content className="bg-white/90 p-0 backdrop-blur-lg">
										<Combobox.Input placeholder="Choose subject" className="h-9" />
										<Combobox.Empty>No subject found.</Combobox.Empty>

										<Combobox.List>
											<Combobox.Group>
												<For
													each={formattedSubjectQueryResult}
													renderItem={(item) => (
														<Combobox.Item
															key={item.value}
															value={item.value}
															className="h-12 text-[12px] font-medium text-black
																focus:bg-gray-300 focus:text-black
																data-[selected=true]:bg-gray-300 md:text-base"
														>
															<p>{item.label}</p>
															<IconBox
																icon="lucide:check"
																className={cnJoin(
																	"ml-auto size-[14px]",
																	item.value === field.value ? "opacity-100" : "opacity-0"
																)}
															/>
														</Combobox.Item>
													)}
												/>
											</Combobox.Group>
										</Combobox.List>
									</Combobox.Content>
								</Combobox.Root>
							)}
						/>

						<Form.ErrorMessage />
					</Form.Field>

					<Form.ErrorMessage type="root" errorField="serverError" />

					<Form.Submit
						disabled={form.formState.isSubmitting}
						className={cnMerge(
							`mt-12 flex h-9 w-fit items-center justify-center self-end rounded-[10px]
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
							Register
						</p>
					</Form.Submit>
				</Form.Root>
			</section>
		</Main>
	);
}

export default RegisterSubjectPage;
