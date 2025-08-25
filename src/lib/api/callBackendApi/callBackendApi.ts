import { type CallApiParameters, createFetchClient, type ResultModeUnion } from "@zayne-labs/callapi";
import type { UnmaskType } from "@zayne-labs/toolkit-type-helpers";
import {
	type AuthHeaderInclusionPluginMeta,
	authHeaderInclusionPlugin,
	isAuthTokenRelatedError,
	type ToastPluginMeta,
	toastPlugin,
} from "./plugins";

type GlobalMeta = AuthHeaderInclusionPluginMeta & ToastPluginMeta;

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const BACKEND_HOST = "https://api.schoolcare.com.ng";
// const BACKEND_HOST = import.meta.env.MODE === "development" ? "" : "https://api.schoolcare.com.ng";

const BASE_API_URL = "api";

export const sharedFetchClient = createFetchClient((ctx) => ({
	baseURL: `${BACKEND_HOST}/${BASE_API_URL}`,

	plugins: [authHeaderInclusionPlugin(), toastPlugin()],

	skipAutoMergeFor: "options",

	...(ctx.options as object),

	meta: {
		...ctx.options.meta,
		toast: {
			error: true,
			errorsToSkip: ["AbortError"],
			errorsToSkipCondition: (error) => isAuthTokenRelatedError(error),
			...ctx.options.meta?.toast,
		},
	},
}));

export type ApiSuccessResponse<TData = unknown> = UnmaskType<{
	data: TData | null;
	message: string;
	status: "success";
}>;

export type ApiErrorResponse<TErrorData = unknown> = UnmaskType<{
	errors?: Record<string, string> & TErrorData & { message?: string };
	message: string;
	status: "error";
}>;

export const callBackendApi = <
	TData = unknown,
	TError = unknown,
	TResultMode extends ResultModeUnion = ResultModeUnion,
>(
	...args: CallApiParameters<ApiSuccessResponse<TData>, ApiErrorResponse<TError>, TResultMode>
) => {
	const [initUrl, config] = args;

	return sharedFetchClient(initUrl, config);
};

export const callBackendApiForQuery = <TData = unknown>(
	...args: CallApiParameters<ApiSuccessResponse<TData>, false | undefined>
) => {
	const [initUrl, config] = args;

	return sharedFetchClient(initUrl, {
		resultMode: "onlySuccessWithException",
		throwOnError: true,
		...config,
	});
};
