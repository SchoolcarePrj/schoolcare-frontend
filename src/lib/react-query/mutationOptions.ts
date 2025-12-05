import { mutationOptions } from "@tanstack/react-query";
import type { z } from "zod";
import { callBackendApiForQuery, type apiSchema } from "../api/callBackendApi";

export const checkResultMutation = () => {
	return mutationOptions({
		mutationFn: async (bodyData: z.infer<(typeof apiSchema.routes)["@post/check-result"]["body"]>) => {
			const data = await callBackendApiForQuery("@post/check-result", {
				body: bodyData,
				meta: {
					auth: { skipHeaderAddition: true },
					toast: { success: true },
				},
			});

			return data.data;
		},
		mutationKey: ["check-result"],
	});
};
