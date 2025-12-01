import { logo } from "@/assets/images/primary";
import { ForWithWrapper, IconBox, Image, NavLink } from "@/components/common";
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

					"custom-scrollbar shrink-0 transition-[width] duration-500",

					isOpen ? "w-[250px]" : "w-0",

					className
				)}
			>
				<Drawer.Header className="sr-only">
					<Drawer.Title>Super Admin Dashboard Sidebar</Drawer.Title>
					<Drawer.Description>Super Admin Dashboard Sidebar</Drawer.Description>
				</Drawer.Header>

				<Drawer.Content
					withHandle={false}
					withPortal={false}
					className={cnJoin(
						// NOTE - These classes allow the sidebar to scroll only within itself
						"absolute flex size-full grow flex-col",

						`items-center gap-2.5 rounded-[24px] border border-[hsl(0,0%,84%)] bg-white px-3.5
						py-[90px] font-medium outline-hidden data-vaul-drawer:[animation-duration:1300ms]`
					)}
				>
					<Image src={logo} width={118} height={36} className="h-9 w-[118px] object-cover" />

					<ForWithWrapper
						as="nav"
						each={dashboardLinkItems}
						className="flex w-full grow flex-col"
						renderItem={(item) => (
							<NavLink
								key={item.label}
								to={item.link}
								className="flex h-12 items-center gap-3 rounded-[8px] pl-9
									data-[active=true]:bg-school-blue-500 data-[active=true]:text-white"
							>
								<span className="inline-block size-6">
									<IconBox icon={item.icon} className="size-full" />
								</span>
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
