/* eslint-disable perfectionist/sort-object-types */
import type { Prettify } from "@zayne-labs/toolkit-type-helpers";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

export type StepOneData = {
	email: string;
	logo: File;
	name: string;
};

export type StepTwoData = {
	nationality: string;
	address: string;
	state: string;
	local_govt: string;
	postal_code: string;
};

export type RegisterFormStore = {
	formStepData: Prettify<StepOneData & StepTwoData>;

	logoPreview: string | null;

	actions: {
		resetFormStore: () => void;

		updateFormData: (updatedFormData: Partial<RegisterFormStore["formStepData"]>) => void;
	};
};

const initialRegisterFormState = {
	formStepData: {
		address: "",
		email: "",
		local_govt: "",
		name: "",
		nationality: "",
		postal_code: "",
		state: "",
	} satisfies Omit<RegisterFormStore["formStepData"], "logo"> as RegisterFormStore["formStepData"],
	logoPreview: null,
} satisfies Omit<RegisterFormStore, "actions">;

const stateObjectFn: StateCreator<RegisterFormStore> = (set, get) => ({
	...initialRegisterFormState,

	actions: {
		resetFormStore: () => set(initialRegisterFormState),

		updateFormData: (updatedFormData) => {
			const { formStepData } = get();

			set({ formStepData: { ...formStepData, ...updatedFormData } });
		},
	} satisfies RegisterFormStore["actions"],
});

export const useRegisterFormStore = create(
	persist(stateObjectFn, {
		name: "registerFormStepData",
		partialize: ({ formStepData: { logo: _ignoredLogo, ...restOfFormStepData } }) => ({
			formStepData: restOfFormStepData,
		}),
		version: 3,
	})
);
