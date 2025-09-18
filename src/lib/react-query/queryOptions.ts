import { queryOptions } from "@tanstack/react-query";
import type { CallApiExtraOptions } from "@zayne-labs/callapi";
import { callBackendApiForQuery } from "../api/callBackendApi";
import { checkUserSessionForQuery } from "../api/callBackendApi/plugins/utils/session";

export const sessionQuery = () => {
	return queryOptions({
		queryFn: () => checkUserSessionForQuery(),
		queryKey: ["session"],
		retry: false,
		staleTime: Infinity,
	});
};

export const allClassesQuery = () => {
	return queryOptions({
		meta: { toast: { success: false } },
		queryFn: () => callBackendApiForQuery("@get/main-class"),
		queryKey: ["classes-all"],
		staleTime: Infinity,
	});
};

export const allSubjectsQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery("@get/main-subject"),
		queryKey: ["subjects-all"],
		staleTime: Infinity,
	});
};

export const allClassesInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery("@get/school/classes"),
		queryKey: ["classes", "school"],
		staleTime: Infinity,
	});
};

export const allSubjectsInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery("@get/school/subjects"),
		queryKey: ["subjects", "school"],
		staleTime: Infinity,
	});
};

export const allStudentsInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery("@get/school/students"),
		queryKey: ["students", "school"],
		staleTime: Infinity,
	});
};

export const studentsByClassQuery = (studentClass: string) => {
	return queryOptions({
		queryFn: () => {
			return callBackendApiForQuery("@get/school/students/class-students", {
				query: { class: studentClass },
			});
		},
		queryKey: ["students", "school", { class: studentClass }],
		staleTime: Infinity,
	});
};

export const studentsByIDQuery = (options: { studentId: string }) => {
	const { studentId } = options;

	return queryOptions({
		queryFn: () => {
			return callBackendApiForQuery("@get/school/students/students-by-reg-number", {
				meta: { toast: { success: true } },
				query: { reg: studentId },
			});
		},
		queryKey: ["students", "school", { id: studentId }],
		staleTime: Infinity,
	});
};

export const studentsGenderQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery("@get/school/students/students-by-gender"),
		queryKey: ["students", "school", "gender-ratio"],
		staleTime: Infinity,
	});
};

export type StudentGenderRatioData = Awaited<
	ReturnType<NonNullable<ReturnType<typeof studentsGenderQuery>["select"]>>
>["data"];

export const schoolSessionQuery = (options?: { meta?: CallApiExtraOptions["meta"] }) => {
	const { meta } = options ?? {};

	return queryOptions({
		queryFn: () =>
			callBackendApiForQuery("@get/session", {
				meta: { auth: { skipHeaderAddition: true }, ...meta },
			}),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["school-session"],
		staleTime: Infinity,
	});
};

export const schoolTermQuery = (options?: { meta?: CallApiExtraOptions["meta"] }) => {
	const { meta } = options ?? {};

	return queryOptions({
		queryFn: () =>
			callBackendApiForQuery("@get/term", {
				meta: { auth: { skipHeaderAddition: true }, ...meta },
			}),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["school-term"],
		staleTime: Infinity,
	});
};
