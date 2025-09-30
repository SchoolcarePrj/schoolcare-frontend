import { useQuery, useQueryClient } from "@tanstack/react-query";
import { lockScroll } from "@zayne-labs/toolkit-core";
import { useToggle } from "@zayne-labs/toolkit-react";
import { isFunction, isString } from "@zayne-labs/toolkit-type-helpers";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router";
import { ForWithWrapper, getElementList, IconBox, Image, NavLink, Show } from "@/components/common";
import { CollapsibleAnimated } from "@/components/ui";
import { sessionQuery } from "@/lib/react-query/queryOptions";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { dashboardLinkItems } from "./constants";

export function NavBar() {
	const [isNavShow, toggleNavShow] = useToggle(false);

	const handleToggleNavShow = () => {
		const newIsNavShow = !isNavShow;

		lockScroll({ lock: newIsNavShow });

		toggleNavShow(newIsNavShow);
	};

	return (
		<header
			className={cnJoin(
				`flex h-[70px] flex-col bg-school-darker-blue px-(--padding-value)
				[--padding-value:--spacing(5)] max-md:sticky max-md:inset-[0_0_auto_0] max-md:z-100
				max-md:justify-center md:h-[140px] md:bg-white md:px-9`,
				isNavShow && "w-svw pr-[calc(var(--padding-value)+var(--scrollbar-padding))]"
			)}
		>
			<DesktopNavContent className="max-md:hidden" />

			<MobileNavigation
				className="md:hidden"
				isNavShow={isNavShow}
				toggleNavShow={handleToggleNavShow}
			/>

			<button
				type="button"
				className="z-10 text-[30px] text-white md:hidden"
				onClick={handleToggleNavShow}
			>
				{isNavShow ?
					<IconBox icon="ri:close-line" />
				:	<IconBox icon="ri:menu-fill" />}
			</button>
		</header>
	);
}

const [NavLinksList] = getElementList();

type MobileNavProps = {
	className?: string;
	isNavShow: boolean;
	toggleNavShow: () => void;
};

function DesktopNavContent(props: { className?: string }) {
	const { className } = props;

	const sessionQueryResult = useQuery(sessionQuery());

	return (
		<section className={cnMerge("flex h-full items-end justify-between pb-6", className)}>
			<header>
				<h1 className="text-[32px] font-semibold">Hi, Admin!</h1>

				<p className="text-[20px] font-medium">Welcome back, {sessionQueryResult.data?.data.school}</p>
			</header>

			<div className="flex items-center gap-6">
				<IconBox icon="material-symbols:notifications-outline-rounded" className="size-8" />

				<Show.Root when={sessionQueryResult.data?.data.logo}>
					{(logo) => (
						<>
							<Image src={logo} width={70} height={70} className="rounded-full" />

							<Show.Otherwise>
								<span className="block size-[70px] shrink-0 rounded-full bg-[hsl(0,0%,85%)]" />
							</Show.Otherwise>
						</>
					)}
				</Show.Root>
			</div>
		</section>
	);
}

function MobileNavigation(props: MobileNavProps) {
	const { className, isNavShow, toggleNavShow } = props;

	const pathname = useLocation().pathname;

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	return (
		<section
			className={cnMerge(
				`fixed inset-[0_auto_0_0] mt-[70px] scrollbar-hidden overflow-x-hidden bg-school-darker-blue
				pt-1 text-white transition-[width] ease-in-out`,
				isNavShow ? "w-svw duration-500" : "w-0 duration-250",
				className
			)}
			onClick={(event) => {
				const element = event.target as HTMLElement;

				element.tagName === "A" && toggleNavShow();
			}}
		>
			<NavLinksList
				as="nav"
				className="flex flex-col gap-9 px-5 text-nowrap"
				each={dashboardLinkItems}
				renderItem={(item) => (
					<Fragment key={item.label}>
						{isString(item.link) && (
							<NavLink
								data-active={item.link === pathname}
								className="flex items-center gap-3 rounded-r-[8px] pl-4.5
									data-[active=true]:h-[43px] data-[active=true]:bg-school-blue-500"
								to={item.link}
							>
								<IconBox icon={item.icon} className="size-5" />
								{item.label}
							</NavLink>
						)}

						{item.link === null && (
							<CollapsibleAnimated.Root
								className="group/collapsible"
								defaultOpen={item.items.some((innerItem) => innerItem.link === pathname)}
							>
								<CollapsibleAnimated.Trigger
									className="flex items-center gap-3 rounded-r-[10px] pl-4.5"
								>
									<IconBox icon={item.icon} className="size-5" />
									{item.label}
									<IconBox
										icon="lucide:chevron-right"
										className="size-5 transition-transform duration-200
											group-data-[state=open]/collapsible:rotate-90"
									/>
								</CollapsibleAnimated.Trigger>

								<ForWithWrapper
									each={item.items}
									className="flex flex-col gap-6 group-data-[state=open]/collapsible:mt-6"
									renderItem={(innerItem) => (
										<CollapsibleAnimated.Content key={innerItem.label} asChild={true}>
											<NavLink
												to={innerItem.link}
												className="mx-7.5 flex h-[38px] items-center gap-3 rounded-[8px] border
													border-white pl-6 data-[active=true]:bg-school-blue-500"
											>
												{innerItem.label}
											</NavLink>
										</CollapsibleAnimated.Content>
									)}
								/>
							</CollapsibleAnimated.Root>
						)}

						{isFunction(item.link) && (
							<button
								type="button"
								className="flex items-center gap-3 pl-4.5"
								onClick={item.link(queryClient, navigate)}
							>
								<IconBox icon={item.icon} className="size-5" />
								{item.label}
							</button>
						)}
					</Fragment>
				)}
			/>
		</section>
	);
}
