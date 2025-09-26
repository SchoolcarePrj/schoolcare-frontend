import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { For, IconBox } from "@/components/common";
import { Combobox, Form } from "@/components/ui";
import { apiSchema, callBackendApi } from "@/lib/api/callBackendApi";
import { allClassesInSchoolQuery, allClassesQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { Main } from "../-components/Main";

const RegisterClassSchema = apiSchema.routes["@post/school/classes"].body;

function RegisterClassPage() {
	const form = useForm({
		defaultValues: {
			grade: "",
			school_class: "",
		},
		mode: "onChange",
		resolver: zodResolver(RegisterClassSchema),
	});

	const allClassesQueryResult = useQuery(allClassesQuery());

	const queryClient = useQueryClient();

	const onSubmit = form.handleSubmit(async (data) => {
		await callBackendApi("@post/school/classes", {
			body: data,
			meta: { toast: { success: true } },

			// onResponseError: (ctx) => {
			// 	form.setError("root.serverError", {
			// 		message: ctx.error.errorData.errors?.message,
			// 	});
			// },

			onSuccess: () => {
				form.resetField("grade");

				void queryClient.invalidateQueries(allClassesInSchoolQuery());
			},
		});
	});

	const watchedSchoolClass = form.watch("school_class");

	const formattedClasses =
		allClassesQueryResult.data?.data.map((school_class) => ({
			label: school_class,
			value: school_class,
		})) ?? [];

	return (
		<Main className="flex flex-col gap-6 md:gap-8">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">Register Class</h1>
			</header>

			<section>
				<Form.Root
					methods={form}
					className="gap-6 md:gap-8"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof form.control> name="school_class" className="gap-3 md:gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Class Name</Form.Label>

						<Form.FieldController
							render={({ field }) => (
								<Combobox.Root
									data={formattedClasses}
									type="class"
									value={field.value}
									onValueChange={field.onChange}
								>
									<Combobox.Trigger
										classNames={{
											base: cnJoin(
												`flex h-[48px] items-center justify-between rounded-[8px] border
												border-school-gray-lighter bg-white px-4 text-[12px]
												data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px] md:px-8
												md:text-base md:text-[14px]`,
												!(field.value as boolean) && "text-shadcn-muted-foreground"
											),
											icon: "size-5 text-school-gray md:size-6",
										}}
									/>

									<Combobox.Content className="bg-white/90 backdrop-blur-lg">
										<Combobox.Input placeholder="Choose class" className="h-9" />
										<Combobox.Empty>No class found.</Combobox.Empty>

										<Combobox.List>
											<Combobox.Group>
												<For
													each={formattedClasses}
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
																	item.value === field.value ? "visible" : "invisible"
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

					<Form.Field<typeof form.control> name="grade" className="gap-3 md:gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Class Grade</Form.Label>

						<Form.InputGroup
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						>
							<Form.InputLeftItem className="shrink-0">{watchedSchoolClass}</Form.InputLeftItem>

							<Form.Input
								placeholder="Enter grades A-Z"
								className="text-[size:inherit]"
								maxLength={1}
								onChange={(event) => {
									const input = event.target;
									input.value = input.value.toUpperCase();
								}}
							/>
						</Form.InputGroup>

						<Form.ErrorMessage />
					</Form.Field>

					<Form.ErrorMessage type="root" errorField="serverError" />

					<Form.Submit
						disabled={form.formState.isSubmitting || !form.formState.isValid}
						className={cnMerge(
							`mt-12 flex h-9 w-fit items-center justify-center self-end rounded-[10px]
							bg-school-blue px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8
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

export default RegisterClassPage;
