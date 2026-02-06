import { css } from "@zayne-labs/toolkit-core";
import type { CssWithCustomProperties, InferProps } from "@zayne-labs/toolkit-react/utils";
import type { ExtractUnion } from "@zayne-labs/toolkit-type-helpers";
import { createContext, use, useId, useMemo } from "react";
import * as RechartsPrimitive from "recharts";
import { cnMerge } from "@/lib/utils/cn";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { dark: ".dark", light: "" } as const;

export type ChartConfig = Record<
	string,
	{
		icon?: React.ComponentType;
		label?: React.ReactNode;
	} & (
		| {
				color?: never;
				theme: Record<keyof typeof THEMES, string>;
		  }
		| {
				color?: string;
				theme?: never;
		  }
	)
>;

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

const useChart = () => {
	const context = use(ChartContext);

	if (!context) {
		throw new Error("useChart must be used within a <ChartContainer />");
	}

	return context;
};

// Helper to extract item config from a payload.
const getConfigItemFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
	if (typeof payload !== "object" || payload === null) {
		return;
	}

	const payloadPayload =
		"payload" in payload && typeof payload.payload === "object" && payload.payload !== null ?
			payload.payload
		:	null;

	let configLabelKey = key;

	if (key in payload && typeof payload[key as never] === "string") {
		configLabelKey = payload[key as never] as string;
	}

	if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as never] === "string") {
		configLabelKey = payloadPayload[key as never] as string;
	}

	return configLabelKey in config ? config[configLabelKey] : config[key];
};

export function ChartContainer(
	props: InferProps<"div">
		& Pick<InferProps<typeof RechartsPrimitive.ResponsiveContainer>, "children"> & {
			config: ChartConfig;
		}
) {
	const { children, className, config, id, ...restOfProps } = props;

	const uniqueId = useId();
	const chartId = `chart-${id ?? uniqueId.replaceAll(":", "")}`;

	const contextValue = useMemo(() => ({ config }), [config]);

	return (
		<ChartContext value={contextValue}>
			<div
				data-slot="chart-root"
				data-chart={chartId}
				className={cnMerge(
					`flex aspect-video justify-center text-xs
					[&_.recharts-cartesian-axis-tick_text]:fill-shadcn-muted-foreground
					[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-shadcn-border/50
					[&_.recharts-curve.recharts-tooltip-cursor]:stroke-shadcn-border
					[&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden
					[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-shadcn-border
					[&_.recharts-radial-bar-background-sector]:fill-shadcn-muted
					[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-shadcn-muted
					[&_.recharts-reference-line_[stroke='#ccc']]:stroke-shadcn-border
					[&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent
					[&_.recharts-surface]:outline-hidden`,
					className
				)}
				{...restOfProps}
			>
				<ChartStyle id={chartId} config={config} />

				<RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext>
	);
}

export function ChartStyle(props: { config: ChartConfig; id: string }) {
	const { config, id } = props;

	const colorConfig = Object.entries(config).filter(
		({ 1: configItem }) => configItem.theme ?? configItem.color
	);

	if (colorConfig.length === 0) {
		return null;
	}

	const cssStringArray = Object.entries(THEMES).map(
		// eslint-disable-next-line react-hooks/todo
		([theme, prefix]) => css`
			${prefix} [data-chart=${id}] {
				${colorConfig
					.map(([key, configItem]) => {
						const color =
							configItem.theme?.[theme as keyof typeof configItem.theme] ?? configItem.color;

						return color ? `--color-${key}: ${color};` : null;
					})
					.join("\n")}
			}
		`
	);

	return <style>{cssStringArray.join("\n")}</style>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ChartTooltip = RechartsPrimitive.Tooltip;

/* eslint-disable ts-eslint/no-unsafe-assignment */
/* eslint-disable ts-eslint/no-unsafe-member-access */
export function ChartTooltipContent(
	props: InferProps<"div">
		& InferProps<typeof RechartsPrimitive.Tooltip> & {
			hideIndicator?: boolean;
			hideLabel?: boolean;
			indicator?: "dashed" | "dot" | "line";
			labelKey?: string;
			nameKey?: string;
		}
) {
	const {
		active,
		className,
		color,
		formatter,
		hideIndicator = false,
		hideLabel = false,
		indicator = "dot",
		label,
		labelClassName,
		labelFormatter,
		labelKey,
		nameKey,
		payload,
	} = props;

	const { config } = useChart();

	const tooltipLabel = useMemo(() => {
		if (hideLabel || !payload || payload.length === 0) {
			return null;
		}

		const [item] = payload;

		const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;

		const configItem = getConfigItemFromPayload(config, item, key);

		const value =
			!labelKey && typeof label === "string" ? (config[label]?.label ?? label) : configItem?.label;

		if (labelFormatter) {
			return (
				<div className={cnMerge("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
			);
		}

		if (!value) {
			return null;
		}

		return <div className={cnMerge("font-medium", labelClassName)}>{value}</div>;
	}, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

	if (!active || !payload || payload.length === 0) {
		return null;
	}

	const nestLabel = payload.length === 1 && indicator !== "dot";

	return (
		<div
			className={cnMerge(
				`grid min-w-[128px] items-start gap-1.5 rounded-lg border border-shadcn-border/50
				bg-shadcn-background px-2.5 py-1.5 text-xs shadow-xl`,
				className
			)}
		>
			{!nestLabel ? tooltipLabel : null}

			<div className="grid gap-1.5">
				{payload.map((item, index) => {
					const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
					const configItem = getConfigItemFromPayload(config, item, key);
					const indicatorColor = color ?? item.payload.fill ?? item.color;

					return (
						<div
							key={item.dataKey}
							className={cnMerge(
								`flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5
								[&>svg]:text-shadcn-muted-foreground`,
								indicator === "dot" && "items-center"
							)}
						>
							{formatter && item.value !== undefined && item.name ?
								// eslint-disable-next-line ts-eslint/no-unsafe-argument
								formatter(item.value, item.name, item, index, item.payload)
							:	<>
									{configItem?.icon ?
										<configItem.icon />
									:	!hideIndicator && (
											<div
												className={cnMerge(
													"shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
													indicator === "dot" && "size-2.5",
													nestLabel && indicator === "dashed" && "my-0.5",
													indicator === "dashed"
														&& "w-0 border-[1.5px] border-dashed bg-transparent",
													indicator === "line" && "w-1"
												)}
												style={
													{
														"--color-bg": indicatorColor,
														"--color-border": indicatorColor,
													} satisfies CssWithCustomProperties as CssWithCustomProperties
												}
											/>
										)
									}
									<div
										className={cnMerge(
											"flex flex-1 justify-between leading-none",
											nestLabel ? "items-end" : "items-center"
										)}
									>
										<div className="grid gap-1.5">
											{nestLabel ? tooltipLabel : null}
											<span className="text-shadcn-muted-foreground">
												{configItem?.label ?? item.name}
											</span>
										</div>

										{Boolean(item.value) && (
											<span
												className="font-mono font-medium text-shadcn-foreground tabular-nums"
											>
												{item.value.toLocaleString()}
											</span>
										)}
									</div>
								</>
							}
						</div>
					);
				})}
			</div>
		</div>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const ChartLegend = RechartsPrimitive.Legend;

export function ChartLegendContent(
	props: InferProps<"div">
		& Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
			classNames?: {
				base?: string;
				legendItem?: string;
				legendItemIcon?: string;
				legendItemLabel?: string;
			};
			nameKey?: string;
			renderItem?: (context: {
				index: number;
				itemConfig: ReturnType<typeof getConfigItemFromPayload>;
				payloadItem: ExtractUnion<RechartsPrimitive.LegendProps["payload"]>;
			}) => React.ReactNode;
			withIcon?: boolean;
		}
) {
	const {
		className,
		classNames,
		nameKey,
		payload,
		renderItem,
		verticalAlign = "bottom",
		withIcon = true,
	} = props;

	const { config } = useChart();

	if (!payload?.length) {
		return null;
	}

	return (
		<div
			className={cnMerge(
				"flex items-center justify-center gap-4",
				verticalAlign === "top" ? "pb-3" : "pt-3",
				className,
				classNames?.base
			)}
		>
			{payload.map((item, index) => {
				const key = String(nameKey ?? item.dataKey ?? "value");
				const itemConfig = getConfigItemFromPayload(config, item, key);

				if (renderItem) {
					return renderItem({
						index,
						itemConfig,
						payloadItem: item,
					});
				}

				return (
					<div
						key={key}
						className={cnMerge(
							"flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-shadcn-muted-foreground",
							classNames?.legendItem
						)}
					>
						{itemConfig?.icon && withIcon ?
							<itemConfig.icon />
						:	<span
								className={cnMerge("size-2 shrink-0 rounded-[2px]", classNames?.legendItemIcon)}
								style={{ backgroundColor: item.color }}
							/>
						}

						<span className={classNames?.legendItemLabel}>{itemConfig?.label}</span>
					</div>
				);
			})}
		</div>
	);
}
/* eslint-enable ts-eslint/no-unsafe-assignment */
/* eslint-enable ts-eslint/no-unsafe-member-access */

export const Container = ChartContainer;

export const Style = ChartStyle;

export const Tooltip = ChartTooltip;

export const TooltipContent = ChartTooltipContent;

export const Legend = ChartLegend;

export const LegendContent = ChartLegendContent;
