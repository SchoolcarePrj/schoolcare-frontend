import { useQueryClient } from "@tanstack/react-query";
import { isFunction, isString } from "@zayne-labs/toolkit-type-helpers";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router";
import { CollapsibleAnimated } from "@/components/animated/ui";
import { ForWithWrapper, IconBox, NavLink } from "@/components/common";
import { Drawer } from "@/components/ui";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { dashboardLinkItems } from "./constants";

function DashboardSidebar(props: { className?: string }) {
	const { className } = props;

	const { pathname } = useLocation();

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return (
		// NOTE - Using the trapFocus prop as a hack to prevent radix within vaul from trapping focus like a massive idiot🙂
		<Drawer.Root direction="left" trapFocus={false} modal={false} open={true} dismissible={false}>
			<aside
				className={cnMerge(
					// NOTE - These classes allow the sidebar to scroll only within itself.
					// NOTE - Also ensure the direct parent of this drawer is a flex container with the vertical axis set to flex-stretch (which is the default)
					"relative flex overflow-y-auto",

					"custom-scrollbar w-[300px] shrink-0",
					className
				)}
			>
				<Drawer.Header className="sr-only">
					<Drawer.Title>School Dashboard Sidebar</Drawer.Title>
					<Drawer.Description>School Dashboard Sidebar</Drawer.Description>
				</Drawer.Header>

				<Drawer.Content
					withHandle={false}
					withPortal={false}
					className={cnJoin(
						// NOTE - These classes allow the sidebar to scroll only within itself
						"absolute flex size-full grow flex-col",

						`bg-school-darker-blue pt-[100px] pb-15 text-white outline-hidden
						data-vaul-drawer:[animation-duration:1300ms]`
					)}
				>
					<ForWithWrapper
						as="nav"
						each={dashboardLinkItems}
						className="flex flex-col gap-9 font-medium"
						renderItem={(item) => (
							<Fragment key={item.label}>
								{isString(item.link) && (
									<NavLink
										data-active={item.link === pathname}
										className="flex items-center gap-3 rounded-r-[10px] pl-6
											data-[active=true]:h-[43px] data-[active=true]:bg-school-blue-500"
										to={item.link}
									>
										<IconBox icon={item.icon} className="size-5" />
										{item.label}
									</NavLink>
								)}

								{item.link === null && (
									<CollapsibleAnimated.Root
										className="group/collapsible"
										defaultOpen={item.items.some((innerItem) => innerItem.link === pathname)}
									>
										<CollapsibleAnimated.Trigger
											className="flex items-center gap-3 rounded-r-[10px] pl-6"
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
											each={item.items}
											className="flex flex-col gap-6 group-data-[state=open]/collapsible:mt-6"
											renderItem={(innerItem) => (
												<CollapsibleAnimated.Content key={innerItem.label} asChild={true}>
													<NavLink
														to={innerItem.link}
														className="mx-7.5 flex h-[38px] items-center gap-3 rounded-[8px]
															border border-white pl-6
															data-[active=true]:bg-school-blue-500"
													>
														{innerItem.label}
													</NavLink>
												</CollapsibleAnimated.Content>
											)}
										/>
									</CollapsibleAnimated.Root>
								)}

								{isFunction(item.link) && (
									<button
										type="button"
										className="flex items-center gap-3 pl-6"
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

export { DashboardSidebar };
