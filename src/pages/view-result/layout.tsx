import { useMutationState } from "@tanstack/react-query";
// import { useStorageState } from "@zayne-labs/toolkit-react";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Outlet } from "react-router";
import { ForWithWrapper } from "@/components/common";
import { AvatarWithTooltip } from "@/components/common/AvatarWithTooltip";
import { usePageBlocker } from "@/lib/hooks";
import {
	checkResultMutation,
	type CheckResultMutationResultType,
} from "@/lib/react-query/mutationOptions";
import { toOrdinal } from "./utils";

function StudentResultLayout() {
	// const [resultData] = useStorageState<CheckResultMutationResultType | null>("scratch-card-result", null);

	const [resultData] = useMutationState({
		filters: { mutationKey: checkResultMutation().mutationKey },
		select: (data) => data.state.data as CheckResultMutationResultType,
	});

	usePageBlocker({
		condition: !resultData,
		message: "No result data found! Redirecting to home...",
		redirectDelay: 500,
		redirectPath: "/",
	});

	const classSessionTerm = resultData?.class_session_term.split(" - ");

	const schoolClass = classSessionTerm?.[0];
	const schoolSession = classSessionTerm?.[1];
	const schoolTerm = classSessionTerm?.[2];

	const reportInfoArray = defineEnum(
		[
			{
				label: "Student's Name",
				value: resultData?.student_name,
			},
			{
				label: "Class",
				value: schoolClass,
			},
			{
				label: "Position",
				value: toOrdinal(resultData?.position),
			},
			{
				label: "Student's Registration Number",
				value: resultData?.student_reg_number,
			},
			{
				label: "Sex",
				value: resultData?.gender,
			},
			{
				label: "Term",
				value: schoolTerm,
			},
			{
				label: "Number of Pupils",
				value: resultData?.class_students_count,
			},
			{
				label: "Academic Year",
				value: schoolSession,
			},
		],
		{ writeableLevel: "deep" }
	);

	return (
		<div className="flex grow flex-col">
			<header className="mt-6 flex flex-col gap-5 px-4 md:mt-[50px] md:gap-8">
				<section className="mx-auto flex max-w-[369px] flex-col gap-2 text-center">
					<div className="flex items-center justify-center gap-4">
						<AvatarWithTooltip
							logo={resultData?.logo}
							name={resultData?.school}
							classNames={{ base: "size-9" }}
						/>

						{resultData?.school && (
							<h1 className="text-[18px] font-semibold md:text-[28px]">{resultData.school}</h1>
						)}
					</div>

					<p className="text-sm md:text-base">{resultData?.school_address}</p>

					<p className="text-sm md:text-base">Email: {resultData?.school_email}</p>
				</section>

				<section className="flex flex-col items-center gap-4">
					<h2 className="text-center text-[18px] font-medium md:text-[24px]">REPORT SHEET</h2>

					<ForWithWrapper
						each={reportInfoArray}
						className="flex w-full max-w-[690px] flex-wrap justify-center gap-4 md:gap-x-9"
						renderItem={(item) => (
							<li
								key={item.label}
								className="inline-flex gap-1 text-xs uppercase md:gap-2 md:text-base"
							>
								<span className="font-medium">{item.label}:</span> {item.value}
							</li>
						)}
					/>
				</section>
			</header>

			<Outlet />
		</div>
	);
}

export default StudentResultLayout;
