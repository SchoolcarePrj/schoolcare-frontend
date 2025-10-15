type HeadingProps = {
	description: string;
	title: string;
};

function Heading(props: HeadingProps) {
	const { description, title } = props;

	return (
		<div className="flex flex-col gap-px">
			<h1 className="text-[24px] font-medium">{title}</h1>
			<p className="text-[hsl(0,0%,52%)]">{description}</p>
		</div>
	);
}

export { Heading };
