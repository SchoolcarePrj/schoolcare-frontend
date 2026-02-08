import { dataAttr, lockScroll } from "@zayne-labs/toolkit-core";
import { useToggle } from "@zayne-labs/toolkit-react";
import { IconBox, NavLink } from "@/components/common";
import { ForWithWrapper } from "@/components/common/For";
import { cnMerge } from "@/lib/utils/cn";

function NavBar(props: {
	classNames?: {
		base?: string;
		desktop?: DesktopNavigationProps["classNames"];
		mobile?: MobileNavigationProps["classNames"];
	};
}) {
	const { classNames } = props;

	return (
		<header className={cnMerge("absolute z-500 flex w-full pt-7 max-lg:px-6", classNames?.base)}>
			<DesktopNavigation className="max-lg:hidden" classNames={classNames?.desktop} />

			<MobileNavigation className="lg:hidden" classNames={classNames?.mobile} />
		</header>
	);
}

export { NavBar };

const linkItems = [
	{ href: "/", title: "Home" },
	{ href: "/who-we-are", title: "Who we Are" },
	{ href: "/how-it-works", title: "How it Works" },
	{ href: "/faqs", title: "FAQs" },
	{ href: "/contact", title: "Contact us" },
];

type DesktopNavigationProps = {
	className?: string;
	classNames?: {
		base?: string;
	};
};

function DesktopNavigation(props: DesktopNavigationProps) {
	const { className, classNames } = props;

	return (
		<section
			className={cnMerge(
				`mx-[80px] flex w-full items-center justify-between rounded-[24px] bg-white px-[78px] py-5
				shadow-[0_4px_8px_hsl(150,20%,25%,0.25)]`,
				className,
				classNames?.base
			)}
		>
			<ForWithWrapper
				as="nav"
				className="flex w-fit gap-14 font-medium"
				each={linkItems}
				renderItem={(linkItem) => (
					<NavLink key={linkItem.title} to={linkItem.href}>
						{linkItem.title}
					</NavLink>
				)}
			/>

			<button type="button">
				<NavLink
					to="/auth/signup"
					className="block rounded-[12px] bg-210-79-44 px-6 py-4 font-semibold text-white"
				>
					Register
				</NavLink>
			</button>
		</section>
	);
}

type MobileNavigationProps = {
	className?: string;
	classNames?: { base?: string; hamburgerButton?: string };
};

function MobileNavigation(props: MobileNavigationProps) {
	const { className, classNames } = props;

	const [isNavShow, toggleNavShow] = useToggle(false);

	const handleToggleNavShow = () => {
		const newIsNavShow = !isNavShow;

		lockScroll({ lock: newIsNavShow });

		toggleNavShow(newIsNavShow);
	};

	return (
		<>
			<section
				className={cnMerge(
					`fixed inset-[0_0_0_auto] w-full overflow-x-hidden bg-school-darker-blue pt-[72px]
					text-white transition-[width,translate] duration-300`,
					// isNavShow ? "translate-x-0 ease-in-out" : "translate-x-full ease-in-out",
					isNavShow ? "w-full duration-500 ease-initial" : "w-0 duration-250 ease-initial",
					className,
					classNames?.base
				)}
				onClick={(event) => {
					const element = event.target as HTMLElement;

					element.tagName === "A" && handleToggleNavShow();
				}}
			>
				<div className="mr-(--scrollbar-width) flex flex-col gap-[58px] px-6">
					<ForWithWrapper
						as="nav"
						className="flex flex-col gap-6 text-[14px] text-nowrap"
						each={linkItems}
						renderItem={(linkItem) => (
							<NavLink
								key={linkItem.title}
								to={linkItem.href}
								className="[.active]:text-school-blue-500"
							>
								{linkItem.title}
							</NavLink>
						)}
					/>

					<button type="button">
						<NavLink
							to="/auth/signup"
							className="block w-full rounded-[8px] bg-210-79-44 py-2.5 font-semibold text-white"
						>
							Register
						</NavLink>
					</button>
				</div>
			</section>

			<button
				type="button"
				data-nav-show={dataAttr(isNavShow)}
				className={cnMerge(
					"z-10 mr-(--scrollbar-width) ml-auto w-6 text-white lg:hidden",
					classNames?.hamburgerButton
				)}
				onClick={handleToggleNavShow}
			>
				{isNavShow ?
					<IconBox icon="ri:close-line" className="size-full" />
				:	<IconBox icon="ri:menu-fill" className="size-full" />}
			</button>
		</>
	);
}
