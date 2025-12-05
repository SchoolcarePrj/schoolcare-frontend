import { ForWithWrapper } from "@/components/common";
import { AvatarWithTooltip } from "@/components/common/AvatarWithTooltip";
import type { CheckResultResponseData } from "@/lib/api/callBackendApi";
import { useStorageState } from "@zayne-labs/toolkit-react";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { Outlet } from "react-router";
import { toOrdinal } from "./utils";

function StudentResultLayout() {
	const [data] = useStorageState<CheckResultResponseData | null>("scratch-card-result", null);

	const classSessionTerm = data?.class_session_term.split(" - ");

	const schoolClass = classSessionTerm?.[0];
	const schoolSession = classSessionTerm?.[1];
	const schoolTerm = classSessionTerm?.[2];

	const reportInfoArray = defineEnum(
		[
			{
				label: "Student's Name",
				value: data?.student_name,
			},
			{
				label: "Class",
				value: schoolClass,
			},
			{
				label: "Position",
				value: toOrdinal(data?.position),
			},
			{
				label: "Student's Registration Number",
				value: data?.student_reg_number,
			},
			{
				label: "Sex",
				value: data?.gender,
			},
			{
				label: "Term",
				value: schoolTerm,
			},
			{
				label: "Number of Pupils",
				value: data?.class_students_count,
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
							logo={data?.logo}
							name={data?.school}
							classNames={{ base: "size-9" }}
						/>

						<h1 className="text-[28px] font-semibold">{data?.school}</h1>
					</div>

					<p>{data?.school_address}</p>

					<p>Email: {data?.school_email}</p>
				</section>

				<section className="flex flex-col items-center gap-4">
					<h2 className="text-center text-[24px] font-medium">REPORT SHEET</h2>

					<ForWithWrapper
						each={reportInfoArray}
						className="flex max-w-[690px] flex-wrap gap-x-9 gap-y-4"
						renderItem={(item) => (
							<li className="inline-flex gap-2 uppercase">
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
