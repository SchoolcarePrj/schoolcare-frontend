import { ForWithWrapper, IconBox, NavLink } from "@/components/common";
import { Drawer } from "@/components/ui";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { dashboardLinkItems } from "./constants";

function DashboardSidebar(props: { className?: string }) {
	const { className } = props;

	return (
		// NOTE - Using the trapFocus prop as a hack to prevent radix within vaul from trapping focus like a massive idiot🙂
		<Drawer.Root direction="left" trapFocus={false} modal={false} open={true} dismissible={false}>
			<aside
				className={cnMerge(
					// NOTE - These classes allow the sidebar to scroll only within itself.
					// NOTE - Also ensure the direct parent of this drawer is a flex container with the vertical axis set to flex-stretch (which is the default)
					"relative flex overflow-y-auto",

					"custom-scrollbar min-w-[242px]",
					className
				)}
			>
				<Drawer.Header className="sr-only p-0">
					<Drawer.Title>Super Admin Dashboard Sidebar</Drawer.Title>
					<Drawer.Description>Super Admin Dashboard Sidebar</Drawer.Description>
				</Drawer.Header>

				<Drawer.Content
					withHandle={false}
					withPortal={false}
					className={cnJoin(
						// NOTE - These classes allow the sidebar to scroll only within itself
						"absolute flex size-full grow flex-col",

						`rounded-[24px] border border-[hsl(0,0%,84%)] bg-white px-3.5 py-[90px] outline-hidden
						data-vaul-drawer:[animation-duration:1300ms]`
					)}
				>
					<ForWithWrapper
						as="nav"
						each={dashboardLinkItems}
						className="flex flex-col gap-6 font-medium"
						renderItem={(item) => (
							<NavLink
								key={item.label}
								to={item.link}
								className="flex items-center gap-3 rounded-[8px] pl-[38px] data-[active=true]:h-12
									data-[active=true]:bg-school-blue data-[active=true]:text-white"
							>
								<IconBox icon={item.icon} className="size-6" />
								{item.label}
							</NavLink>
						)}
					/>
				</Drawer.Content>
			</aside>
		</Drawer.Root>
	);
}

export { DashboardSidebar };
