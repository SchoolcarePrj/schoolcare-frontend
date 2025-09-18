import { For, IconBox, Show } from "@/components/common";
import { Command, Form, Popover, Select } from "@/components/ui";
import { AddressBodySchema, callBackendApi, PersonalInfoBodySchema } from "@/lib/api/callBackendApi";
import { nigeriaStatesAndLGA } from "@/lib/api/nigeria";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useRegisterFormStore } from "@/lib/zustand/registerFormStore";
import { Main } from "@/pages/dashboard/-components/Main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

function AddressPage() {
	const {
		actions: { resetFormStore, updateFormData },
		formStepData,
	} = useRegisterFormStore((state) => state);

	const methods = useForm({
		defaultValues: formStepData,
		mode: "onChange",
		resolver: zodResolver(AddressBodySchema),
	});

	const navigate = useNavigate();

	const onSubmit = methods.handleSubmit(async (stepTwoData) => {
		updateFormData(stepTwoData);

		const result = PersonalInfoBodySchema.safeParse(formStepData);

		if (!result.success) {
			const fieldErrors = z.flattenError(result.error).fieldErrors;

			for (const path of Object.keys(fieldErrors)) {
				toast.error(
					`Your school ${path} is missing. Please return to the previous step and ${path === "logo" ? "upload" : "fill"} it`,
					{ duration: 3000 }
				);
			}

			void navigate("/register/personal-info");

			return;
		}

		await callBackendApi("@post/school/register", {
			body: {
				...formStepData,
				...stepTwoData,
			},
			meta: { toast: { success: true } },

			onSuccess: () => {
				resetFormStore();
				void navigate("/");
			},
		});
	});

	const state = methods.watch("state");

	const LGAResult = nigeriaStatesAndLGA.find((item) => item.state === state)?.lgas ?? [];

	return (
		<Main className="flex flex-col gap-8">
			<header>
				<h1 className="text-[18px] font-bold md:text-[30px]">Tell us more about your school</h1>
				<p className="mt-2 text-[10px] md:text-[18px]">Please fill in the details below</p>
			</header>

			<section>
				<Form.Root
					methods={methods}
					className="mt-3 gap-10 md:gap-[56px]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof methods.control> name="nationality" className="gap-3 md:gap-4">
						<Form.Label className="text-[14px] font-semibold md:text-base">
							School nationality
						</Form.Label>

						<Form.FieldController
							render={({ field }) => (
								<Select.Root name={field.name} value={field.value} onValueChange={field.onChange}>
									<Select.Trigger
										classNames={{
											base: `h-[48px] rounded-[8px] border border-school-gray-lighter bg-white
											px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px]
											md:rounded-[20px] md:px-8 md:text-base md:text-[14px]`,
											icon: "text-school-gray group-data-[state=open]:rotate-180 md:size-6",
										}}
									>
										<Select.Value placeholder="Choose school nationality" />
									</Select.Trigger>

									<Select.Content
										classNames={{
											base: "bg-white/90 backdrop-blur-lg",
											viewport: "gap-1",
										}}
									>
										<Select.Item
											value="Nigeria"
											className="h-12 text-[12px] font-medium text-black focus:bg-gray-300
												focus:text-black data-[state=checked]:bg-gray-300 md:text-base"
										>
											Nigeria
										</Select.Item>
									</Select.Content>
								</Select.Root>
							)}
						/>

						<Form.ErrorMessage control={methods.control} className="text-red-600" />
					</Form.Field>

					<Form.Field<typeof methods.control> name="address" className="gap-4">
						<Form.Label className="text-[14px] font-semibold md:text-base">
							School Address
						</Form.Label>

						<Form.Input
							placeholder="Enter school address"
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						/>

						<Form.ErrorMessage control={methods.control} className="text-red-600" />
					</Form.Field>

					<Form.Field<typeof methods.control> name="state" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">State</Form.Label>

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
										<Show.Root when={field.value} fallback="Select State">
											{nigeriaStatesAndLGA.find((item) => item.state === field.value)?.state}
										</Show.Root>

										<IconBox
											icon="lucide:chevrons-up-down"
											className="size-5 text-school-gray md:size-6"
										/>
									</Popover.Trigger>

									<Popover.Content className="bg-white/90 p-0 backdrop-blur-lg max-md:w-60">
										<Command.Root>
											<Command.Input placeholder="Choose State" className="h-9" />

											<Command.List>
												<Command.Empty>No State found.</Command.Empty>

												<Command.Group>
													<For
														each={nigeriaStatesAndLGA}
														renderItem={(item) => (
															<Command.Item
																key={item.state}
																value={item.state}
																onSelect={() => field.onChange(item.state)}
																className="h-12 text-[12px] font-medium text-black
																	focus:bg-gray-300 focus:text-black
																	data-[selected=true]:bg-gray-300 md:text-base"
															>
																<p>{item.state}</p>
																<IconBox
																	icon="lucide:check"
																	className={cnJoin(
																		"ml-auto size-[14px]",
																		item.state === field.value ?
																			"opacity-100"
																		:	"opacity-0"
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

						<Form.ErrorMessage control={methods.control} className="text-red-600" />
					</Form.Field>

					<div className="flex justify-between gap-1 md:gap-4">
						<Form.Field<typeof methods.control> name="local_govt" className="w-full gap-3 md:gap-4">
							<Form.Label className="text-[14px] font-medium md:text-base">LGA</Form.Label>

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
											<Show.Root when={field.value} fallback="Select LGA">
												{LGAResult.find((LGA) => LGA === field.value)}
											</Show.Root>

											<IconBox
												icon="lucide:chevrons-up-down"
												className="size-5 text-school-gray md:size-6"
											/>
										</Popover.Trigger>

										<Popover.Content className="bg-white/90 p-0 backdrop-blur-lg max-md:w-60">
											<Command.Root>
												<Command.Input placeholder="Choose LGA" className="h-9" />

												<Command.List>
													<Command.Empty>No LGA found.</Command.Empty>

													<Command.Group>
														<For
															each={LGAResult}
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

							<Form.ErrorMessage control={methods.control} className="text-red-600" />
						</Form.Field>

						<Form.Field<typeof methods.control> name="postal_code" className="w-full gap-3 md:gap-4">
							<Form.Label className="text-[14px] font-medium md:text-base">
								School postal code
							</Form.Label>

							<Form.Input
								type="number"
								placeholder="Enter school postal code"
								className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter
									bg-white px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px]
									md:rounded-[20px] md:px-8 md:text-base"
							/>

							<Form.ErrorMessage control={methods.control} className="text-red-600" />
						</Form.Field>
					</div>

					<div className="mt-5 flex gap-4 self-end">
						<button
							type="button"
							className="flex max-w-fit items-center gap-3 rounded-[4px] border-2
								border-[hsl(0,0%,26%)] px-3 py-[6px] text-[14px] font-semibold text-[hsl(0,0%,13%)]
								md:rounded-[8px] md:px-5 md:py-2 md:text-[18px]"
							onClick={() => void navigate("/register/personal-info")}
						>
							<IconBox icon="material-symbols:arrow-forward-ios-rounded" className="rotate-180" />
							Back
						</button>

						<Form.Submit
							disabled={methods.formState.isSubmitting || !methods.formState.isValid}
							className={cnMerge(
								`flex max-w-fit min-w-[77px] items-center justify-center gap-3 rounded-[4px]
								bg-school-blue px-3 py-[6px] text-[14px] font-semibold text-white md:rounded-[8px]
								md:px-5 md:py-2 md:text-[18px]`,
								methods.formState.isSubmitting && "grid",
								!methods.formState.isValid && "cursor-not-allowed bg-gray-400"
							)}
						>
							{methods.formState.isSubmitting && (
								<span className="flex justify-center [grid-area:1/1]">
									<IconBox icon="svg-spinners:6-dots-rotate" className="size-6" />
								</span>
							)}
							<p className={cnJoin(methods.formState.isSubmitting && "invisible [grid-area:1/1]")}>
								Submit
							</p>
						</Form.Submit>
					</div>
				</Form.Root>
			</section>
		</Main>
	);
}

export default AddressPage;
