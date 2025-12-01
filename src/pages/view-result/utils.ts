export const toOrdinal = (number: number | undefined) => {
	if (number === undefined) {
		return "";
	}

	const rules = new Intl.PluralRules("en", { type: "ordinal" });

	const suffixes = {
		few: "rd",
		many: "th",
		one: "st",
		other: "th",
		two: "nd",
		zero: "th",
	} satisfies Record<Intl.LDMLPluralRule, string>;

	const rule = rules.select(number);

	const selectedSuffix = suffixes[rule];

	return `${number}${selectedSuffix}`;
};
