import { Outlet } from "react-router";
import { DashboardSidebar } from "./-components/DashboardSidebar";
import { NavBar } from "./-components/NavBar";

function DashBoardLayout() {
	return (
		<div className="flex grow bg-[hsl(0,0%,98%)]">
			<DashboardSidebar className="max-md:hidden" />

			<div className="flex w-full grow flex-col">
				<NavBar />
				<Outlet />
			</div>
		</div>
	);
}

export default DashBoardLayout;
