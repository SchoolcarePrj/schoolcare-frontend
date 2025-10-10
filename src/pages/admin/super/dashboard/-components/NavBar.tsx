import { AvatarGroupAnimated } from "@/components/animated/ui";
import { IconBox } from "@/components/common";
import { Avatar } from "@/components/ui";

type NavBarProps = {
	toggleIsSidebarOpen: () => void;
};

function NavBar(props: NavBarProps) {
	const { toggleIsSidebarOpen } = props;

	return (
		<header
			className="flex justify-between rounded-[20px] border border-[hsl(0,0%,84%)] bg-white px-7 py-9"
		>
			<div className="flex items-center gap-3">
				<button type="button" className="size-6" onClick={toggleIsSidebarOpen}>
					<IconBox icon="mynaui:panel-left-close" className="size-full" />
				</button>

				<h1 className="text-[24px] font-medium">Welcome Back, Sovereign</h1>
			</div>

			<div className="flex items-center gap-3">
				<AvatarGroupAnimated.Root translate="5%">
					<Avatar.Root className="size-9 cursor-pointer rounded-full">
						<Avatar.Fallback className="bg-school-dark-blue-500 text-[14px] text-white">
							SS
						</Avatar.Fallback>

						<AvatarGroupAnimated.Tooltip classNames={{ base: "bg-school-dark-blue-500 text-white" }}>
							Sovereign
						</AvatarGroupAnimated.Tooltip>
					</Avatar.Root>
				</AvatarGroupAnimated.Root>

				<p className="font-medium text-black">SchoolCare Sovereign</p>
			</div>
		</header>
	);
}

export { NavBar };
