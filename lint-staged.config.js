export default {
	"*.{ts,tsx, _parallel-1}": () => ["pnpm lint:type-check"],
	"*.{ts,tsx,js _parallel-2}": () => ["pnpm lint:eslint"],
};
