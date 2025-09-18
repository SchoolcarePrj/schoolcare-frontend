/* eslint-disable perfectionist/sort-object-types */

import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type { InputScoresResponseData } from "@/lib/api/callBackendApi";

type InputScoresFormStore = {
	responseData: InputScoresResponseData;
	actions: {
		resetFormStore: () => void;
	};
};

const initialInputScoreFormState = {
	responseData: {
		class_session_term: {
			school_class: "",
			session: "",
			term: "",
		},
		students: [],
	},
} satisfies Omit<InputScoresFormStore, "actions">;

const stateObjectFn: StateCreator<InputScoresFormStore> = (set) => ({
	...initialInputScoreFormState,

	actions: {
		resetFormStore: () => set(initialInputScoreFormState),
	},
});

export const useInputScoreFormStore = create(
	persist(stateObjectFn, {
		name: "inputScoreFormResponseData",
		partialize: ({ responseData }) => ({ responseData }),
		version: 3,
	})
);
