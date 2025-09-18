import { getQueryClient } from "./queryClient";
import {
	allClassesInSchoolQuery,
	allStudentsInSchoolQuery,
	allSubjectsInSchoolQuery,
	sessionQuery,
	studentsGenderQuery,
} from "./queryOptions";

const queryClient = getQueryClient();

export const protectionLoader = () => {
	void queryClient.prefetchQuery(sessionQuery());
};

export const dashboardLoader = () => {
	void queryClient.prefetchQuery(allStudentsInSchoolQuery());

	void queryClient.prefetchQuery(allSubjectsInSchoolQuery());

	void queryClient.prefetchQuery(allClassesInSchoolQuery());

	void queryClient.prefetchQuery(studentsGenderQuery());
};
