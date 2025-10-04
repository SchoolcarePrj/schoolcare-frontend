import { dataAttr, lockScroll } from "@zayne-labs/toolkit-core";
import { useToggle } from "@zayne-labs/toolkit-react";
import { IconBox, NavLink } from "@/components/common";
import { getElementList } from "@/components/common/For";
import { cnMerge } from "@/lib/utils/cn";

function NavBar(props: {
	classNames?: {
		base?: string;
		desktop?: DesktopNavigationProps["classNames"];
		mobile?: MobileNavigationProps["classNames"];
	};
}) {
	const { classNames } = props;

	const [isNavShow, toggleNavShow] = useToggle(false);

	const handleToggleNavShow = () => {
		const newIsNavShow = !isNavShow;

		lockScroll({ lock: newIsNavShow });

		toggleNavShow(newIsNavShow);
	};

	return (
		<header
			className={cnMerge(
				`absolute z-500 flex w-full flex-col pt-7 [--padding-x-value:--spacing(6)]
				max-lg:px-(--padding-x-value)`,
				isNavShow && "max-lg:pr-[calc(var(--padding-x-value)+var(--scrollbar-padding))]",
				classNames?.base
			)}
		>
			<DesktopNavigation className="max-lg:hidden" classNames={classNames?.desktop} />

			<MobileNavigation
				className="lg:hidden"
				isNavShow={isNavShow}
				toggleNavShow={handleToggleNavShow}
				classNames={classNames?.mobile}
			/>
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

const [NavLinksList] = getElementList();

type DesktopNavigationProps = {
	className?: string;
	classNames?: {
		base?: string;
	};
};

function DesktopNavigation(props: DesktopNavigationProps) {
	const { className, classNames } = props;

	return (
		<article
			className={cnMerge(
				`mx-[80px] flex items-center justify-between rounded-[24px] bg-white px-[78px] py-5
				shadow-[0_4px_8px_hsl(150,20%,25%,0.25)]`,
				className,
				classNames?.base
			)}
		>
			<NavLinksList
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
					to="/auth/register"
					className="block rounded-[12px] bg-210-79-44 px-6 py-4 font-semibold text-white"
				>
					Register
				</NavLink>
			</button>
		</article>
	);
}

type MobileNavigationProps = {
	className?: string;
	classNames?: { base?: string; hamburgerButton?: string };
	isNavShow: boolean;
	toggleNavShow: () => void;
};

function MobileNavigation(props: MobileNavigationProps) {
	const { className, classNames, isNavShow, toggleNavShow } = props;

	return (
		<>
			<article
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

					element.tagName === "A" && toggleNavShow();
				}}
			>
				<div
					className="flex flex-col gap-[58px]
						pr-[calc(var(--padding-x-value)+var(--scrollbar-padding))] pl-(--padding-x-value)
						[--padding-x-value:--spacing(6)]"
				>
					<NavLinksList
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
							to="/auth/register"
							className="block w-full rounded-[8px] bg-210-79-44 py-2.5 font-semibold text-white"
						>
							Register
						</NavLink>
					</button>
				</div>
			</article>

			<button
				type="button"
				data-nav-show={dataAttr(isNavShow)}
				className={cnMerge("z-10 w-6 self-end text-white lg:hidden", classNames?.hamburgerButton)}
				onClick={toggleNavShow}
			>
				{isNavShow ?
					<IconBox icon="ri:close-line" className="size-full" />
				:	<IconBox icon="ri:menu-fill" className="size-full" />}
			</button>
		</>
	);
}
