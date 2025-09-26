import { ForWithWrapper, getElementList, IconBox } from "@/components/common";
import { CollapsibleAnimated, Drawer } from "@/components/ui";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { useQueryClient } from "@tanstack/react-query";
import { isFunction, isString } from "@zayne-labs/toolkit-type-helpers";
import { Fragment } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { dashboardLinkItems } from "./constants";

const [SideBarLinkList] = getElementList();

function Sidebar(props: { className?: string }) {
	const { className } = props;

	const pathname = useLocation().pathname;

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return (
		// NOTE - Using the trapFocus prop as a hack to prevent radix within vaul from trapping focus like a massive idiot🙂
		<Drawer.Root direction="left" trapFocus={false} modal={false} open={true} dismissible={false}>
			<aside
				className={cnMerge(
					// NOTE - These classes allow the sidebar to scroll only within itself
					"sticky inset-y-0 flex h-svh overflow-y-auto",

					"custom-scrollbar min-w-[300px] bg-white",
					className
				)}
			>
				<Drawer.Header className="sr-only">
					<Drawer.Title>Sidebar</Drawer.Title>
					<Drawer.Description>Sidebar</Drawer.Description>
				</Drawer.Header>

				<Drawer.Content
					withHandle={false}
					withPortal={false}
					className={cnJoin(
						// NOTE - These classes allow the sidebar to scroll only within itself
						"absolute flex size-full min-h-0 grow flex-col",

						`bg-school-dark-blue pt-[100px] text-white outline-hidden
						data-vaul-drawer:[animation-duration:1300ms]`
					)}
				>
					<SideBarLinkList
						each={dashboardLinkItems}
						className="flex flex-col gap-6 bg-inherit pb-15 font-medium"
						renderItem={(item) => (
							<Fragment key={item.label}>
								{item.link === null && (
									<CollapsibleAnimated.Root
										className="group/collapsible"
										defaultOpen={item.items.some((innerItem) => innerItem.link === pathname)}
									>
										<CollapsibleAnimated.Trigger
											className="ml-6 flex h-[42px] items-center gap-3 rounded-r-[10px]"
										>
											<IconBox icon={item.icon} className="size-5" />
											{item.label}
											<IconBox
												icon="lucide:chevron-right"
												className="size-5 transition-transform duration-200
													group-data-[state=open]/collapsible:rotate-90"
											/>
										</CollapsibleAnimated.Trigger>

										<ForWithWrapper
											className="flex flex-col gap-5 group-data-[state=open]/collapsible:mt-3"
											each={item.items}
											renderItem={(innerItem) => (
												<CollapsibleAnimated.Content key={innerItem.label}>
													<NavLink
														data-active={innerItem.link === pathname}
														to={innerItem.link}
														className="mx-7.5 flex h-[42px] items-center gap-3 rounded-[8px]
															border border-white pl-6 data-[active=true]:bg-school-blue"
													>
														{innerItem.label}
													</NavLink>
												</CollapsibleAnimated.Content>
											)}
										/>
									</CollapsibleAnimated.Root>
								)}

								{isString(item.link) && (
									<NavLink
										data-active={item.link === pathname}
										className="flex h-[42px] items-center gap-3 rounded-r-[10px] pl-6
											data-[active=true]:bg-school-blue"
										to={item.link}
									>
										<IconBox icon={item.icon} className="size-5" />
										{item.label}
									</NavLink>
								)}
								{isFunction(item.link) && (
									<button
										type="button"
										className="flex h-[42px] items-center gap-3 pl-6"
										onClick={item.link(queryClient, navigate)}
									>
										<IconBox icon={item.icon} className="size-5" />
										{item.label}
									</button>
								)}
							</Fragment>
						)}
					/>
				</Drawer.Content>
			</aside>
		</Drawer.Root>
	);
}

export { Sidebar };
