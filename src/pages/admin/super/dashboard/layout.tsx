import { Outlet } from "react-router";
import { DashboardSidebar } from "./-components/DashboardSidebar";

function SuperAdminDashboardLayout() {
	return (
		<div className="flex grow gap-8 bg-[hsl(0,0%,95%)] px-5 py-5.5">
			<DashboardSidebar />
			<div className="flex w-full grow flex-col">
				<Outlet />
			</div>
		</div>
	);
}

export default SuperAdminDashboardLayout;
