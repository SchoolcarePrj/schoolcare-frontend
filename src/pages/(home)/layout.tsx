import { Outlet } from "react-router";
import { Footer } from "./-components/Footer";
import { NavBar } from "./-components/NavBar";

function HomeLayout() {
	return (
		<div className="flex grow flex-col">
			<NavBar />
			<Outlet />
			<Footer />
		</div>
	);
}

export default HomeLayout;
