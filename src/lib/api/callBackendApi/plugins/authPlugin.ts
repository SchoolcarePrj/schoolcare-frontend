import { definePlugin, type ResponseErrorContext } from "@zayne-labs/callapi";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import type { Awaitable, CallbackFn } from "@zayne-labs/toolkit-type-helpers";
import type { BaseApiErrorResponse } from "../apiSchema";
import {
	authTokenStore,
	isAuthTokenRelatedError,
	isPathnameMatchingRoute,
	type PossibleAuthToken,
	redirectTo,
} from "./utils";
import { getNewUserSession } from "./utils/session";

export type AuthPluginMeta = {
	auth?: {
		redirectFn?: CallbackFn<`/${string}`, Awaitable<void>>;
		routesToExemptFromHeaderAddition?: Array<`/${string}` | `${string}/**`>;
		routesToExemptFromRedirectOnAuthError?: Array<`/${string}` | `${string}/**`>;
		skipHeaderAddition?: boolean;
		tokenToAdd?: PossibleAuthToken;
	};
};

const signInRoute = "/auth/login";

const defaultRedirectionMessage = "Session is missing! Redirecting to login...";

export const authPlugin = definePlugin((authOptions?: AuthPluginMeta["auth"]) => ({
	id: "auth-plugin",
	name: "authPlugin",

	// eslint-disable-next-line perfectionist/sort-objects
	hooks: {
		onRequest: (ctx) => {
			const authMeta = authOptions ?? ctx.options.meta?.auth;

			const isExemptedRoute = Boolean(
				authMeta?.routesToExemptFromHeaderAddition?.some((route) => isPathnameMatchingRoute(route))
			);

			const shouldSkipAuthHeaderAddition = isExemptedRoute || authMeta?.skipHeaderAddition;

			if (shouldSkipAuthHeaderAddition) return;

			const shouldSkipRouteFromRedirect = authMeta?.routesToExemptFromRedirectOnAuthError?.some(
				(route) => isPathnameMatchingRoute(route)
			);

			if (authTokenStore.getRefreshToken() === null) {
				const redirectFn = authMeta?.redirectFn ?? redirectTo;

				!shouldSkipRouteFromRedirect && void redirectFn(signInRoute);

				// == Turn off error toast if redirect is skipped
				shouldSkipRouteFromRedirect
					&& ctx.options.meta?.toast
					&& (ctx.options.meta.toast.error = false);

				throw new Error(defaultRedirectionMessage);
			}

			const selectedAuthToken = authTokenStore[authMeta?.tokenToAdd ?? "getAccessToken"]();

			ctx.options.auth = selectedAuthToken;
		},

		onResponseError: async (ctx: ResponseErrorContext<BaseApiErrorResponse>) => {
			const authMeta = authOptions ?? ctx.options.meta?.auth;

			// NOTE: Only call refreshUserSession on auth token related errors, and remake the request
			const shouldRefreshToken = ctx.response.status === 401 && isAuthTokenRelatedError(ctx.error);

			if (!shouldRefreshToken) return;

			const shouldSkipRouteFromRedirect = authMeta?.routesToExemptFromRedirectOnAuthError?.some(
				(route) => isPathnameMatchingRoute(route)
			);

			const refreshToken = authTokenStore.getRefreshToken();

			const redirectFn = authMeta?.redirectFn ?? redirectTo;

			if (refreshToken === null) {
				!shouldSkipRouteFromRedirect && void redirectFn(signInRoute);

				throw new Error(defaultRedirectionMessage);
			}

			const result = await getNewUserSession(refreshToken);

			if (isHTTPError(result.error)) {
				!shouldSkipRouteFromRedirect && void redirectFn(signInRoute);

				throw new Error("Session invalid or expired! Redirecting to login...");
			}

			result.data?.data && authTokenStore.setAccessToken({ access: result.data.data.access });

			ctx.options.retryAttempts = 1;
		},
	},
}));
