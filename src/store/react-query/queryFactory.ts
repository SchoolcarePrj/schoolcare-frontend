import { queryOptions } from "@tanstack/react-query";
import type { CallApiExtraOptions } from "@zayne-labs/callapi";
import {
	type AllClasses,
	type AllStudentsInSchool,
	type AllSubjects,
	type AllSubjectsInSchool,
	type ClassesData,
	callBackendApiForQuery,
	type StudentsByClassOrID,
	type StudentsGenderResponse,
} from "@/lib/api/callBackendApi";
import { checkUserSession } from "@/lib/api/callBackendApi/plugins/utils";

export const sessionQuery = () => {
	return queryOptions({
		queryFn: () => checkUserSession(),
		queryKey: ["session"],
		refetchInterval: 9 * 60 * 1000, // 9 minutes
		refetchOnWindowFocus: false,
		retry: false,
		staleTime: Infinity,
	});
};

export const allClassesQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<AllClasses>("/main-class"),
		queryKey: ["classes-all"],
		staleTime: Infinity,
	});
};

export const allSubjectsQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<AllSubjects>("/main-subject"),
		queryKey: ["subjects-all"],
		staleTime: Infinity,
	});
};

export const allClassesInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<ClassesData[]>("/school/classes"),
		queryKey: ["classes", "school"],
		staleTime: Infinity,
	});
};

export const allSubjectsInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<AllSubjectsInSchool>("/school/subjects"),
		queryKey: ["subjects", "school"],
		staleTime: Infinity,
	});
};

export const allStudentsInSchoolQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<AllStudentsInSchool>("/school/students"),
		queryKey: ["students", "school"],
		staleTime: Infinity,
	});
};

export const studentsByClassQuery = (studentClass: string) => {
	return queryOptions({
		queryFn: () => {
			return callBackendApiForQuery<{ students: StudentsByClassOrID[] }>(
				"/school/students/class-students",
				{
					query: { class: studentClass },
				}
			);
		},
		queryKey: ["students", "school", { class: studentClass }],
		staleTime: Infinity,
	});
};

export const studentsByIDQuery = (options: { studentId: string }) => {
	const { studentId } = options;

	return queryOptions({
		queryFn: () => {
			return callBackendApiForQuery<StudentsByClassOrID>("/school/students/students-by-reg-number", {
				meta: { toast: { errorMessageField: "reg", success: true } },
				query: { reg: studentId },
			});
		},
		queryKey: ["students", "school", { id: studentId }],
		staleTime: Infinity,
	});
};

export const studentsGenderQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<StudentsGenderResponse>("/school/students/students-by-gender"),
		queryKey: ["students", "school", "gender-ratio"],
		staleTime: Infinity,
	});
};

export const schoolSessionQuery = (options?: { meta?: CallApiExtraOptions["meta"] }) => {
	const { meta } = options ?? {};

	return queryOptions({
		queryFn: () =>
			callBackendApiForQuery<string[]>("/session", { meta: { skipAuthHeaderAddition: true, ...meta } }),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["school-session"],
		staleTime: Infinity,
	});
};

export const schoolTermQuery = (options?: { meta?: CallApiExtraOptions["meta"] }) => {
	const { meta } = options ?? {};

	return queryOptions({
		queryFn: () =>
			callBackendApiForQuery<string[]>("/term", { meta: { skipAuthHeaderAddition: true, ...meta } }),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: ["school-term"],
		staleTime: Infinity,
	});
};
