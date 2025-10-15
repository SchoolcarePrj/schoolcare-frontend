import type { QueryClient } from "@tanstack/react-query";
import type { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { callBackendApi } from "@/lib/api/callBackendApi";
import { authTokenStore } from "@/lib/api/callBackendApi/plugins/utils";
import { sessionQuery } from "@/lib/react-query/queryOptions";

const logout = (queryClient: QueryClient, navigate: NavigateFunction) => {
	const refreshToken = authTokenStore.getRefreshToken();

	if (!refreshToken) {
		toast.error("No session found!");
		return;
	}

	void callBackendApi("@post/logout", {
		body: { refresh: refreshToken },
		meta: { toast: { success: true } },

		onSuccess: () => {
			void navigate("/");
			queryClient.removeQueries(sessionQuery());
			authTokenStore.clearTokens();
		},
	});
};

export { logout };
