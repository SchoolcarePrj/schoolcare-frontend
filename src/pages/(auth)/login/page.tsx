import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { omitKeys } from "@zayne-labs/toolkit-core";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { callBackendApi, type LoginData } from "@/lib/api/callBackendApi";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { z } from "@/lib/zod";
import { sessionQuery } from "@/store/react-query/queryFactory";

const SignInSchema = z.object({
	email: z.email({ error: "Please enter a valid email!" }),
	password: z.string().min(1, { error: "Password is required" }),
});

function LoginPage() {
	const methods = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(SignInSchema),
	});

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const onSubmit = methods.handleSubmit(async (data) => {
		await callBackendApi<LoginData>("/login", {
			body: data,
			meta: { toast: { success: true } },
			method: "POST",

			onSuccess: (ctx) => {
				if (!ctx.data.data) return;

				localStorage.setItem("accessToken", ctx.data.data.access);
				localStorage.setItem("refreshToken", ctx.data.data.refresh);

				queryClient.setQueryData(sessionQuery().queryKey, {
					...ctx.data,
					data: omitKeys(ctx.data.data, ["access", "refresh"]),
				});

				void navigate("/dashboard");
			},
		});
	});

	return (
		<main className="flex flex-col gap-8 px-6 py-16 md:px-[92px] md:py-[52px]">
			<header className="text-center">
				<h1 className="text-[30px] font-bold">Welcome</h1>
				<p className="text-[18px] font-bold">We are pleased to have you back</p>
			</header>

			<section>
				<Form.Root
					methods={methods}
					className="gap-10 md:gap-[56px]"
					onSubmit={(event) => void onSubmit(event)}
				>
					<Form.Field<typeof methods.control> name="email" className="gap-3 md:gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">
							School email address*
						</Form.Label>

						<Form.Input
							type="email"
							placeholder="Enter school email"
							className="h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter bg-white
								px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px] md:rounded-[20px]
								md:px-8 md:text-base"
						/>

						<Form.ErrorMessage className="text-red-600" />
					</Form.Field>

					<Form.Field<typeof methods.control> name="password" className="gap-4">
						<Form.Label className="text-[14px] font-medium md:text-base">
							School Password*
						</Form.Label>

						<Form.Input
							type="password"
							placeholder="Enter school password"
							classNames={{
								inputGroup: `h-[48px] gap-3.5 rounded-[8px] border border-school-gray-lighter
								bg-white px-4 text-[12px] data-placeholder:text-school-gray md:h-[75px]
								md:rounded-[20px] md:px-8 md:text-base`,
							}}
						/>

						<Form.ErrorMessage className="text-red-600" />
					</Form.Field>

					<div className="flex justify-between gap-3">
						<Form.Field name="remember" className="flex-row-reverse items-center gap-1 md:gap-3">
							<Form.Label className="text-[13px] font-medium md:text-base">
								Keep me signed in
							</Form.Label>
							<Form.InputPrimitive type="checkbox" className="size-4 md:size-[20px]" />
						</Form.Field>

						<Link to="#" className="text-[13px] text-school-blue md:text-base">
							Forgotten Password?
						</Link>
					</div>

					<Form.Submit
						disabled={methods.formState.isSubmitting || !methods.formState.isValid}
						className={cnMerge(
							`mt-3 flex h-12 w-full max-w-[200px] items-center justify-center gap-4 self-center
							rounded-[60px] bg-school-blue text-[18px] font-bold text-white md:h-[65px]
							md:max-w-[300px] md:text-[22px]`,
							methods.formState.isSubmitting && "grid",
							!methods.formState.isValid && "cursor-not-allowed bg-gray-400"
						)}
					>
						<p
							className={cnJoin(
								"flex items-center gap-1",
								methods.formState.isSubmitting && "invisible [grid-area:1/1]"
							)}
						>
							Login
							<span className="inline-block size-6">
								<IconBox icon="material-symbols:arrow-outward-rounded" className="size-full" />
							</span>
						</p>

						{methods.formState.isSubmitting && (
							<span className="flex justify-center [grid-area:1/1]">
								<IconBox icon="svg-spinners:6-dots-rotate" className="size-6" />
							</span>
						)}
					</Form.Submit>
				</Form.Root>
			</section>
		</main>
	);
}

export default LoginPage;
