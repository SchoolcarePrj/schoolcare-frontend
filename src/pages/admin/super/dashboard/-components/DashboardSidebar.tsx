import { ForWithWrapper, IconBox, NavLink } from "@/components/common";
import { Drawer } from "@/components/ui";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { dashboardLinkItems } from "./constants";

function DashboardSidebar(props: { className?: string; isOpen: boolean }) {
	const { className, isOpen } = props;

	return (
		// NOTE - Using the trapFocus prop as a hack to prevent radix within vaul from trapping focus like a massive idiot🙂
		<Drawer.Root direction="left" trapFocus={false} modal={false} open={true} dismissible={false}>
			<aside
				className={cnMerge(
					// NOTE - These classes allow the sidebar to scroll only within itself.
					// NOTE - Also ensure the direct parent of this drawer is a flex container with the vertical axis set to flex-stretch (which is the default)
					"relative flex overflow-y-auto",

					"custom-scrollbar shrink-0 transition-[width]",

					isOpen ? "w-[250px] duration-500" : "w-0 duration-350",

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

						`rounded-[24px] border border-[hsl(0,0%,84%)] bg-white px-3.5 py-[90px] font-medium
						outline-hidden data-vaul-drawer:[animation-duration:1300ms]`
					)}
				>
					<ForWithWrapper
						as="nav"
						each={dashboardLinkItems}
						className="flex grow flex-col gap-6"
						renderItem={(item) => (
							<NavLink
								key={item.label}
								to={item.link}
								className="flex items-center gap-3 rounded-[8px] pl-9 data-[active=true]:h-12
									data-[active=true]:bg-school-blue-500 data-[active=true]:text-white"
							>
								<IconBox icon={item.icon} className="size-6" />
								{item.label}
							</NavLink>
						)}
					/>

					<button type="button" className="flex items-center gap-2 pl-9 text-school-red-500">
						<IconBox icon="solar:logout-outline" className="size-6" />
						Logout
					</button>
				</Drawer.Content>
			</aside>
		</Drawer.Root>
	);
}

export { DashboardSidebar };
