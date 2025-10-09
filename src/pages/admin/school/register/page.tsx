import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { apiSchema, callBackendApi } from "@/lib/api/callBackendApi";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { Main } from "@/pages/admin/school/dashboard/-components/Main";

const AdminRegisterSchema = apiSchema.routes["@post/school/admin/register"].body;

function AdminRegisterPage() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			school: "",
		},
		resolver: zodResolver(AdminRegisterSchema),
	});

	const onSubmit = form.handleSubmit(async (data) => {
		await callBackendApi("@post/school/admin/register", {
			body: data,
			meta: { auth: { skipHeaderAddition: true } },

			onSuccess: () => {
				void navigate("/auth/login");
			},
		});
	});

	return (
		<Main className="flex flex-col gap-8 p-0 md:p-0">
			<header>
				<h1 className="text-[24px] font-bold md:text-[30px]">Admin Register</h1>
			</header>

			<section>
				<Form.Root methods={form} className="gap-10" onSubmit={(event) => void onSubmit(event)}>
					<Form.Field control={form.control} name="school" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">School Name</Form.Label>

						<Form.Input
							placeholder="Enter school name"
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						/>

						<Form.ErrorMessage className="text-red-600" />
					</Form.Field>

					<Form.Field control={form.control} name="email" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Email</Form.Label>

						<Form.Input
							placeholder="Enter school email"
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						/>

						<Form.ErrorMessage className="text-red-600" />
					</Form.Field>

					<Form.Field control={form.control} name="password" className="w-full gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">Password</Form.Label>

						<Form.Input
							type="password"
							placeholder="Enter password"
							classNames={{
								inputGroup: `h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter
								bg-white px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px]
								md:rounded-[20px] md:px-8 md:text-base`,
							}}
						/>

						<Form.ErrorMessage className="text-red-600" />
					</Form.Field>

					<Form.Submit
						disabled={form.formState.isSubmitting}
						className={cnMerge(
							`mt-12 flex h-9 w-fit items-center justify-center self-end rounded-[10px]
							bg-school-blue-500 px-5 text-[14px] font-semibold text-white md:h-[56px] md:px-8
							md:text-[18px]`,
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

export default AdminRegisterPage;
