import { QueryClient } from "@tanstack/react-query";
import { isServer } from "@zayne-labs/toolkit-core";

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: 0,
			},
		},
	});
};

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
	if (isServer()) {
		return makeQueryClient();
	}

	browserQueryClient ??= makeQueryClient();

	return browserQueryClient;
};
