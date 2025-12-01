import { cnMerge } from "@/lib/utils/cn";
import { AvatarGroupAnimated } from "../animated/ui";
import { Avatar } from "../ui";
import { Image } from "./Image";
import { Show } from "./Show";

type AvatarWithTooltipProps = {
	classNames?: {
		base?: string;
		fallback?: string;
		image?: string;
	};
	logo: string | null | undefined;
	name: string | null | undefined;
};

function AvatarWithTooltip(props: AvatarWithTooltipProps) {
	const { classNames, logo, name } = props;

	return (
		<AvatarGroupAnimated.Root translate="5%">
			<Avatar.Root className={cnMerge("size-70", classNames?.base)}>
				<Show.Root control="content">
					<Show.Content when={logo}>
						{(definedLogo) => (
							<Image
								src={definedLogo}
								width={70}
								height={70}
								className={cnMerge("size-full rounded-full object-cover", classNames?.image)}
							/>
						)}
					</Show.Content>

					<Show.Fallback>
						<span
							className={cnMerge(
								`inline-flex size-full shrink-0 items-center justify-center rounded-full
								bg-[hsl(0,0%,85%)] text-[18px]`,
								classNames?.fallback
							)}
						>
							{name?.slice(0, 2)}
						</span>
					</Show.Fallback>
				</Show.Root>

				<AvatarGroupAnimated.Tooltip classNames={{ base: "bg-school-dark-blue-500 text-white" }}>
					{name}
				</AvatarGroupAnimated.Tooltip>
			</Avatar.Root>
		</AvatarGroupAnimated.Root>
	);
}

export { AvatarWithTooltip };
