import { useToggle } from "@zayne-labs/toolkit-react";
import { Outlet } from "react-router";
import { DashboardSidebar } from "./-components/DashboardSidebar";
import { NavBar } from "./-components/NavBar";
import { cnJoin } from "@/lib/utils/cn";

function SuperAdminDashboardLayout() {
	const [isSidebarOpen, toggleIsSidebarOpen] = useToggle(true);

	return (
		<div className={cnJoin("flex grow bg-[hsl(0,0%,95%)] px-5 pt-5.5 pb-11", isSidebarOpen && "gap-8")}>
			<DashboardSidebar isOpen={isSidebarOpen} />

			<div className="flex w-full grow flex-col gap-6">
				<NavBar toggleIsSidebarOpen={toggleIsSidebarOpen} />
				<Outlet />
			</div>
		</div>
	);
}

export default SuperAdminDashboardLayout;
