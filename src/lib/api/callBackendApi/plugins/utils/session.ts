import { callBackendApi, callBackendApiForQuery } from "../../callBackendApi";

export const checkUserSessionForQuery = () => {
	return callBackendApiForQuery("@get/check-user-session", { dedupeStrategy: "defer" });
};

export const checkUserSession = () => {
	return callBackendApi("@get/check-user-session", { dedupeStrategy: "defer" });
};

export const getNewUserSession = (refreshToken: string) => {
	return callBackendApi("@post/token/refresh", {
		body: { refresh: refreshToken },
		dedupeStrategy: "defer",
		meta: { auth: { skipHeaderAddition: true } },
	});
};
