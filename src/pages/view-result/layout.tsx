import { ForWithWrapper } from "@/components/common";
import { AvatarWithTooltip } from "@/components/common/AvatarWithTooltip";
import {
	checkResultMutation,
	type CheckResultMutationResultType,
} from "@/lib/react-query/mutationOptions";
import { useMutationState } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Outlet } from "react-router";
import { toOrdinal } from "./utils";

function StudentResultLayout() {
	// const [data] = useStorageState<CheckResultResponseData | null>("scratch-card-result", null);

	const [resultData] = useMutationState({
		filters: { mutationKey: checkResultMutation().mutationKey },
		select: (data) => data.state.data as CheckResultMutationResultType,
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
			<header className="mt-[50px] flex flex-col gap-8">
				<section className="mx-auto flex max-w-[369px] flex-col gap-2 text-center">
					<div className="flex items-center justify-center gap-4">
						<AvatarWithTooltip
							logo={resultData?.logo}
							name={resultData?.school}
							classNames={{ base: "size-9" }}
						/>

						<h1 className="text-[28px] font-semibold">{resultData?.school}</h1>
					</div>

					<p>{resultData?.school_address}</p>

					<p>Email: {resultData?.school_email}</p>
				</section>

				<section className="flex flex-col items-center gap-4">
					<h2 className="text-center text-[24px] font-medium">REPORT SHEET</h2>

					<ForWithWrapper
						each={reportInfoArray}
						className="flex max-w-[690px] flex-wrap gap-x-9 gap-y-4"
						renderItem={(item) => (
							<li key={item.label} className="inline-flex gap-2 uppercase">
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
