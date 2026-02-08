import { Outlet } from "react-router";
import { Footer } from "../(home)/-components/Footer";
import { NavBar } from "../(home)/-components/NavBar";

function PrimaryLayout() {
	return (
		<>
			<NavBar
				classNames={{
					desktop: { base: "mx-0 shadow-none" },
					mobile: { hamburgerButton: "not-data-nav-show:text-school-body-color" },
				}}
			/>

			<div className="flex grow flex-col px-5 pt-[84px] pb-[110px] lg:px-[75px] lg:pt-[200px]">
				<Outlet />
			</div>

			<Footer />
		</>
	);
}

export default PrimaryLayout;
