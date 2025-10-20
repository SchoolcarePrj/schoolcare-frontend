import { zayne } from "@zayne-labs/eslint-config";

export default zayne(
	{
		react: true,
		tailwindcssBetter: true,
		tanstack: {
			query: true,
		},
		typescript: true,
	},
	{
		files: ["./src/components/animated/primitives/**.tsx"],
		rules: {
			"react-hooks/preserve-manual-memoization": "off",
		},
	}
);
