export default {
	"*.{ts,tsx, _parallel-1}": () => ["pnpm lint:check-types"],
	"*.{ts,tsx, _parallel-2}": () => ["pnpm lint:eslint"],
};
