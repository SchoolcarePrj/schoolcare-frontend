import { NavLink, Outlet } from "react-router";

function RegisterLayout() {
	return (
		<div className="flex flex-col gap-6 px-12 py-[56px] md:gap-16 md:px-[100px] md:py-[92px]">
			<header
				className="flex max-w-[282px] justify-between text-[14px] font-medium md:max-w-[917px]
					md:text-[18px]"
			>
				<NavLink
					onClick={(event) => event.preventDefault()}
					to="/auth/register/personal-info"
					className="pointer-events-none underline-offset-8 md:underline-offset-[10px]
						[&.active]:underline"
				>
					Personal Information
				</NavLink>

				<NavLink
					onClick={(event) => event.preventDefault()}
					to="/auth/register/address"
					className="pointer-events-none underline-offset-8 md:underline-offset-[10px]
						[&.active]:underline"
				>
					Address
				</NavLink>
			</header>

			<Outlet />
		</div>
	);
}

export default RegisterLayout;
