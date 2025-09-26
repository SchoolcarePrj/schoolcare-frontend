import { createFetchClient, defineBaseConfig } from "@zayne-labs/callapi";
import { loggerPlugin } from "@zayne-labs/callapi-plugins";
import { apiSchema } from "./apiSchema";
import { type AuthPluginMeta, authPlugin, type ToastPluginMeta, toastPlugin } from "./plugins";
import { isAuthTokenRelatedError } from "./plugins/utils";

type GlobalMeta = AuthPluginMeta & ToastPluginMeta;

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const REMOTE_BACKEND_HOST = "https://api.schoolcare.com.ng";

// const BACKEND_HOST =
// 	process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000" : REMOTE_BACKEND_HOST;

const BACKEND_HOST = REMOTE_BACKEND_HOST;

const BASE_API_URL = `${BACKEND_HOST}/api`;

const sharedBaseCallApiConfig = defineBaseConfig((instanceCtx) => ({
	baseURL: BASE_API_URL,

	dedupeCacheScope: "global",
	dedupeCacheScopeKey: instanceCtx.options.baseURL,

	plugins: [authPlugin(), toastPlugin(), loggerPlugin({ enabled: { onError: true } })],

	schema: apiSchema,

	skipAutoMergeFor: "options",

	...(instanceCtx.options as object),

	meta: {
		...instanceCtx.options.meta,

		auth: {
			routesToExemptFromRedirectOnAuthError: ["/", "/auth/**"],
			...instanceCtx.options.meta?.auth,
		},

		toast: {
			endpointsToSkip: {
				errorAndSuccess: ["/token/refresh"],
				success: ["/check-user-session"],
			},
			error: true,
			errorsToSkip: ["AbortError"],
			errorsToSkipCondition: (error) => isAuthTokenRelatedError(error),
			success: false,
			...instanceCtx.options.meta?.toast,
		},
	} satisfies GlobalMeta,
}));

export const callBackendApi = createFetchClient(sharedBaseCallApiConfig);

export const callBackendApiForQuery = createFetchClient(
	(instanceConfig) =>
		({
			...sharedBaseCallApiConfig(instanceConfig),
			resultMode: "onlyData",
			throwOnError: true,
		}) satisfies ReturnType<typeof defineBaseConfig>
);
