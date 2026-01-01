import { createFetchClientWithContext } from "@zayne-labs/callapi";
import { loggerPlugin } from "@zayne-labs/callapi-plugins";
import { defineBaseConfig } from "@zayne-labs/callapi/utils";
import { apiSchema } from "./apiSchema";
import { authPlugin, toastPlugin, type AuthPluginMeta, type ToastPluginMeta } from "./plugins";
import { isAuthTokenRelatedError } from "./plugins/utils";

type GlobalMeta = AuthPluginMeta & ToastPluginMeta;

// declare module "@zayne-labs/callapi" {
// 	// eslint-disable-next-line ts-eslint/consistent-type-definitions
// 	interface Register {
// 		meta: GlobalMeta;
// 	}
// }

const REMOTE_BACKEND_HOST = "https://api.schoolcare.com.ng";
const LOCAL_BACKEND_HOST = "http://127.0.0.1:8000";

const BACKEND_HOST = process.env.NODE_ENV === "development" ? LOCAL_BACKEND_HOST : REMOTE_BACKEND_HOST;
// const BACKEND_HOST = REMOTE_BACKEND_HOST;

const BASE_API_URL = `${BACKEND_HOST}/api`;

const sharedBaseCallApiConfig = defineBaseConfig({
	baseURL: BASE_API_URL,

	dedupe: {
		cacheScope: "global",
		cacheScopeKey: (ctx) => ctx.options.baseURL,
	},

	plugins: [
		authPlugin({
			routesToExemptFromRedirectOnAuthError: ["/", "/auth/**"],
			signInRoute: "/auth/signin",
		}),
		toastPlugin({
			endpointsToSkip: {
				errorAndSuccess: ["/token/refresh"],
				success: ["/check-user-session"],
			},
			error: true,
			errorsToSkip: ["AbortError"],
			errorsToSkipCondition: (error) => isAuthTokenRelatedError(error),
			success: false,
		}),
		loggerPlugin({
			enabled: { onError: true },
		}),
	],

	schema: apiSchema,
});

const createFetchClient = createFetchClientWithContext<{ Meta: GlobalMeta }>();

export const callBackendApi = createFetchClient(sharedBaseCallApiConfig);

export const callBackendApiForQuery = createFetchClient({
	...sharedBaseCallApiConfig,
	resultMode: "onlyData",
	throwOnError: true,
});
