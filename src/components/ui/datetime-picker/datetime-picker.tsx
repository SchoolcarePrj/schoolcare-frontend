/* eslint-disable react-x/no-nested-component-definitions */

import { useControllableState } from "@zayne-labs/toolkit-react";
import type { InferProps } from "@zayne-labs/toolkit-react/utils";
import { format } from "date-fns";
import { ForWithWrapper, IconBox } from "@/components/common";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { Calendar, CalendarDayButton } from "../calender";
import { shadcnButtonVariants } from "../constants";
import * as Popover from "../popover";
import { ScrollArea } from "../scroll-area";
import { getDateFromString } from "./getDateFromString";

type DatePickerProps = Pick<InferProps<typeof Calendar>, "endMonth" | "startMonth"> & {
	className?: string;
	dateString?: string;
	defaultDateString?: string;
	formats?: {
		onChangeDate?: string;
		visibleDate?: string;
	};
	onDateStringChange?: (dateString?: string) => void;
	placeholder?: string;
	variant?: "date" | "datetime" | "time";
};

export function DateTimePicker(props: DatePickerProps) {
	const {
		className,
		dateString: dateStringProp,
		defaultDateString: defaultDateStringProp = "",
		formats,
		onDateStringChange: onDateStringChangeProp,
		placeholder,
		variant = "date",
		...restOrProps
	} = props;

	const [dateString, setDateString] = useControllableState({
		defaultProp: defaultDateStringProp,
		isControlled: "dateString" in props,
		onChange: onDateStringChangeProp,
		prop: dateStringProp,
	});

	const date = getDateFromString(dateString);

	const showTimePicker = variant === "time" || variant === "datetime";

	const showDatePicker = variant === "date" || variant === "datetime";

	return (
		<Popover.Root>
			<Popover.Trigger className={cnMerge("flex items-center justify-between text-[14px]", className)}>
				<IconBox icon="solar:calendar-outline" className="size-5" />

				<span className={cnJoin(!date && "text-black/60")}>
					{date ? format(date, formats?.visibleDate ?? "PPP") : placeholder}
				</span>
			</Popover.Trigger>

			<Popover.Content className="w-auto border-none p-0">
				<div className="flex rounded-[6px]">
					{showDatePicker && (
						<Calendar
							mode="single"
							captionLayout="dropdown"
							{...restOrProps}
							classNames={{
								base: "p-5",
								button_next: "hover:bg-school-dark-blue-200 hover:text-shadcn-primary-foreground",
								button_previous:
									"hover:bg-school-dark-blue-200 hover:text-shadcn-primary-foreground",
								today: "hover:bg-school-dark-blue-50",
							}}
							components={{
								DayButton: (innerProps) => (
									<CalendarDayButton
										{...innerProps}
										className={cnMerge(
											`size-8.5 hover:bg-school-dark-blue-200 hover:text-school-body-color
											data-[selected-single=true]:bg-school-blue-500`,
											// eslint-disable-next-line react-x/prefer-destructuring-assignment
											innerProps.className
										)}
									/>
								),
							}}
							selected={date}
							onSelect={(selectedDate) => {
								if (!selectedDate) return;

								setDateString(format(selectedDate, formats?.onChangeDate ?? "MM-dd-yyyy"));
							}}
						/>
					)}

					{showTimePicker && (
						<TimeScrollArea
							dateValue={date ?? new Date()}
							onChange={setDateString as typeof onDateStringChangeProp}
							formats={formats}
						/>
					)}
				</div>
			</Popover.Content>
		</Popover.Root>
	);
}

type TimeScrollAreaProps = {
	dateValue: Date;
	formats: DatePickerProps["formats"];
	onChange: DatePickerProps["onDateStringChange"];
};

function TimeScrollArea(props: TimeScrollAreaProps) {
	const { dateValue, formats, onChange } = props;

	function handleTimeChange(variant: "am-pm" | "hour" | "minute", value: number | string) {
		const newDate = new Date(dateValue);

		switch (variant) {
			case "am-pm": {
				const hours = newDate.getHours();

				if (value === "AM" && hours >= 12) {
					newDate.setHours(hours - 12);
				}

				if (value === "PM" && hours < 12) {
					newDate.setHours(hours + 12);
				}
				break;
			}

			case "hour": {
				const hour = Number(value);

				// newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
				newDate.setHours(hour);
				break;
			}

			case "minute": {
				const minute = Number(value);

				newDate.setMinutes(minute);
				break;
			}

			default: {
				variant satisfies never;
			}
		}

		onChange?.(format(newDate, formats?.onChangeDate ?? "MM-dd-yyyy HH:mm:ss"));
	}
	return (
		<div className="flex h-[332px] divide-x divide-y-0 divide-school-blue-500">
			<ScrollArea className="w-auto">
				<ForWithWrapper
					className="flex flex-col p-2"
					each={[...Array(24).keys()].toReversed()}
					renderItem={(hour) => (
						<button
							type="button"
							data-selected={dateValue.getHours() === hour}
							key={hour}
							className={cnMerge(
								"aspect-square shrink-0",
								shadcnButtonVariants({ size: "icon", variant: "ghost" }),
								`hover:bg-school-dark-blue-200 hover:text-school-body-color
								data-[selected=true]:bg-school-blue-500
								data-[selected=true]:text-shadcn-primary-foreground`
							)}
							onClick={() => handleTimeChange("hour", hour)}
						>
							{hour}
						</button>
					)}
				/>
			</ScrollArea>

			<ScrollArea className="w-64 sm:w-auto">
				<ForWithWrapper
					as="div"
					className="flex flex-col p-2"
					each={[...Array(12).keys()].map((i) => i * 5)}
					renderItem={(minute) => (
						<button
							type="button"
							data-selected={dateValue.getMinutes() === minute}
							key={minute}
							className={cnMerge(
								"aspect-square shrink-0",
								shadcnButtonVariants({ size: "icon", variant: "ghost" }),
								`hover:bg-school-dark-blue-200 hover:text-school-body-color
								data-[selected=true]:bg-school-blue-500
								data-[selected=true]:text-shadcn-primary-foreground`
							)}
							onClick={() => handleTimeChange("minute", minute)}
						>
							{minute}
						</button>
					)}
				/>
			</ScrollArea>

			{/*
			<ScrollArea>
				<ForWithWrapper
					as="div"
					className="flex flex-col p-2"
					each={["AM", "PM"]}
					render={(am_pm) => (
						<button
							type="button"
							key={am_pm}
							data-selected={
								(am_pm === "AM" && dateValue.getHours() < 12)
								|| (am_pm === "PM" && dateValue.getHours() >= 12)
							}
							className={cnMerge(
								"aspect-square shrink-0",
								shadcnButtonVariants({
									size: "icon",
									variant: "ghost",
									className: `hover:bg-medinfo-primary-subtle hover:text-medinfo-body-color
									data-[selected=true]:bg-medinfo-primary-main
									data-[selected=true]:text-shadcn-primary-foreground`,
								})
							)}
							onClick={() => handleTimeChange("am-pm", am_pm)}
						>
							{am_pm}
						</button>
					)}
				/>
			</ScrollArea> */}
		</div>
	);
}
