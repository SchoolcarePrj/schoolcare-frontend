import { zayne } from "@zayne-labs/eslint-config";

export default zayne({
	react: {
		compiler: {
			overrides: {
				"react-hooks/preserve-manual-memoization": "off",
			},
		},
	},
	tailwindcssBetter: true,
	tanstack: {
		query: true,
	},
	typescript: true,
});
