import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { For, IconBox, Show } from "@/components/common";
import { Command, Form, Popover } from "@/components/ui";
import { apiSchema, callBackendApi } from "@/lib/api/callBackendApi";
import { allSubjectsInSchoolQuery, allSubjectsQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { Main } from "../-components/Main";

const RegisterSubjectSchema = apiSchema.routes["@post/school/subjects"].body;

function RegisterSubjectPage() {
	const methods = useForm({
		defaultValues: {
			subject: "",
		},
		mode: "onChange",
		resolver: zodResolver(RegisterSubjectSchema),
	});

	const subjectQueryResult = useQuery(allSubjectsQuery());

	const queryClient = useQueryClient();

	const onSubmit = methods.handleSubmit(async (data) => {
		await callBackendApi("@post/school/subjects", {
			body: data,
			meta: { toast: { success: true } },

			// onResponseError: (ctx) => {
			// 	methods.setError("root.serverError", {
			// 		message: ctx.error.errorData.errors?.message,
			// 	});
			// },

			onSuccess: () => {
				methods.reset();

				void queryClient.invalidateQueries(allSubjectsInSchoolQuery());
			},
		});
	});

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">Register Subjects</h1>
			</header>

			<section>
				<Form.Root
					methods={methods}
					className="gap-6 md:gap-8"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof methods.control> name="subject" className="gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Select Subject</Form.Label>

						<Form.FieldController
							render={({ field }) => (
								<Popover.Root>
									<Popover.Trigger
										className={cnJoin(
											`flex h-[48px] items-center justify-between rounded-[8px] border
											border-school-gray-lighter bg-white px-4 text-[12px]
											data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px] md:px-8
											md:text-base md:text-[14px]`,
											!(field.value as boolean) && "text-shadcn-muted-foreground"
										)}
									>
										<Show.Root when={field.value} fallback="Select subject">
											{subjectQueryResult.data?.data.find((subject) => subject === field.value)}
										</Show.Root>

										<IconBox
											icon="lucide:chevrons-up-down"
											className="size-5 text-school-gray md:size-6"
										/>
									</Popover.Trigger>

									<Popover.Content className="bg-white/90 p-0 backdrop-blur-lg">
										<Command.Root>
											<Command.Input placeholder="Choose subject" className="h-9" />

											<Command.List>
												<Command.Empty>No subject found.</Command.Empty>

												<Command.Group>
													<For
														each={subjectQueryResult.data?.data ?? []}
														renderItem={(item) => (
															<Command.Item
																key={item}
																value={item}
																onSelect={() => field.onChange(item)}
																className="h-12 text-[12px] font-medium text-black
																	focus:bg-gray-300 focus:text-black
																	data-[selected=true]:bg-gray-300 md:text-base"
															>
																<p>{item}</p>
																<IconBox
																	icon="lucide:check"
																	className={cnJoin(
																		"ml-auto size-[14px]",
																		item === field.value ? "opacity-100" : "opacity-0"
																	)}
																/>
															</Command.Item>
														)}
													/>
												</Command.Group>
											</Command.List>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
							)}
						/>

						<Form.ErrorMessage />
					</Form.Field>

					<Form.ErrorMessage type="root" errorField="serverError" />

					<Form.Submit
						disabled={methods.formState.isSubmitting}
						className={cnMerge(
							`mt-12 flex h-9 w-fit items-center justify-center self-end rounded-[10px]
							bg-school-blue px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8
							md:text-[18px]`,
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
							Register
						</p>
					</Form.Submit>
				</Form.Root>
			</section>
		</Main>
	);
}

export default RegisterSubjectPage;
