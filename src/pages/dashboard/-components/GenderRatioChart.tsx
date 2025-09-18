import { Pie, PieChart } from "recharts";
import { Card, Chart } from "@/components/ui";
import type { StudentGenderRatioData } from "@/lib/react-query/queryOptions";

const chartConfig = {
	female: {
		color: "var(--chart-2)",
		label: "Female",
	},
	male: {
		color: "var(--chart-1)",
		label: "Male",
	},
	ratio: {
		label: "Ratio",
	},
} satisfies Chart.ChartConfig;

function GenderRatioChart(props: { genderResponseData: StudentGenderRatioData | undefined }) {
	const { genderResponseData } = props;

	const chartData = [
		{
			fill: "var(--color-male)",
			gender: "male",
			ratio: genderResponseData?.male ?? 0,
		},
		{
			fill: "var(--color-female)",
			gender: "female",
			ratio: genderResponseData?.female ?? 0,
		},
	];

	return (
		<Card.Root
			className="flex size-full max-w-[334px] flex-col items-center rounded-[24px] border-2
				border-school-gray-lighter bg-white py-[36px_18px]"
		>
			<Card.Header className="shrink-0">
				<Card.Title className="text-[22px] font-semibold">Gender Composition</Card.Title>
			</Card.Header>

			<Card.Content className="-mt-3 flex size-full justify-center">
				<Chart.Container config={chartConfig} className="min-h-[280px] w-full max-w-[215px]">
					<PieChart className="flex gap-59">
						<Chart.Tooltip cursor={false} content={<Chart.TooltipContent hideLabel={true} />} />

						{Boolean(genderResponseData) && (
							<Pie
								data={chartData}
								dataKey="ratio"
								nameKey="gender"
								innerRadius={60}
								strokeWidth={5}
								cornerRadius={20}
								paddingAngle={-20}
							/>
						)}

						<Chart.Legend
							content={
								<Chart.LegendContent
									className="pt-0"
									renderItem={(ctx) => (
										<section key={ctx.index} className="flex flex-col items-center gap-3">
											<div className="flex items-center gap-4">
												<span
													className="size-3.5 rounded-full"
													style={{ backgroundColor: ctx.itemConfig?.color }}
												/>

												<span className="text-[18px] font-semibold">
													{ctx.payloadItem.payload?.value}%
												</span>
											</div>

											<p className="text-[12px] font-medium text-school-gray">
												{ctx.itemConfig?.label}
											</p>
										</section>
									)}
								/>
							}
						/>
					</PieChart>
				</Chart.Container>
			</Card.Content>

			<Card.Footer />
		</Card.Root>
	);
}
export { GenderRatioChart };
