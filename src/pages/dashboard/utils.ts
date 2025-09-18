import type { QueryClient } from "@tanstack/react-query";
import { hardNavigate } from "@zayne-labs/toolkit-core";
import { toast } from "sonner";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { authTokenObject } from "@/lib/api/callBackendApi/plugins/utils";
import { sessionQuery } from "@/lib/react-query/queryOptions";

const logout = (queryClient: QueryClient) => {
	const refreshToken = authTokenObject.getRefreshToken();

	if (!refreshToken) {
		toast.error("No session found!");
		return;
	}

	void callBackendApi("@post/logout", {
		body: { refresh: refreshToken },
		meta: { toast: { success: true } },

		onSuccess: () => {
			hardNavigate("/");
			queryClient.removeQueries(sessionQuery());
			authTokenObject.clearTokens();
		},
	});
};

export { logout };
