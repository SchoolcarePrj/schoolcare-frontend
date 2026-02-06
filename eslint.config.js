import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	react: true,
	tailwindcssBetter: {
		enforceCanonicalClasses: true,
	},
	tanstack: {
		query: true,
	},
	typescript: true,
});
