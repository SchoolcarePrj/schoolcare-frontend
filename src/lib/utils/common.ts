import { toast } from "sonner";

export const getUserAvatar = (firstName: string, lastName: string) => `${firstName[0]}${lastName[0]}`;

export const validateInputValue = (existingValues: string[], newValue: string | undefined) => {
	if (!newValue) return;

	if (existingValues.includes(newValue)) {
		toast.error("Error", {
			description: `${newValue} already exists`,
		});

		return;
	}

	return newValue;
};
