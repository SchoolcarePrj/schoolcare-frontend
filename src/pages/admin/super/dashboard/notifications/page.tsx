import { TabsAnimated } from "@/components/animated/ui";
import { ForWithWrapper, IconBox } from "@/components/common";
import { Card } from "@/components/ui";
import { cnJoin } from "@/lib/utils/cn";
import { Heading } from "../-components/Heading";
import { Main } from "../-components/Main";

const allNotifications = [
	{
		description:
			"Routine system maintenance is scheduled for tomorrow at 2:00 AM. Expected downtime: 30 minutes.",
		id: 1,
		status: "read",
		time: "5 mins ago",
		title: "System Maintenance Scheduled",
	},
	{
		description:
			"Routine system maintenance is scheduled for tomorrow at 2:00 AM. Expected downtime: 30 minutes.",
		id: 2,
		status: "read",
		time: "5 mins ago",
		title: "System Maintenance Scheduled",
	},
	{
		description:
			"Routine system maintenance is scheduled for tomorrow at 2:00 AM. Expected downtime: 30 minutes.",
		id: 3,
		status: "unread",
		time: "5 mins ago",
		title: "System Maintenance Scheduled",
	},
] as const;

const unreadNotifications = allNotifications.filter((item) => item.status === "unread");

function NotificationsPage() {
	return (
		<Main className="gap-6">
			<header className="flex flex-col gap-6">
				<Heading
					title="Schools Management"
					description="Manage and monitor all educational institutions"
				/>
			</header>

			<section>
				<TabsAnimated.Root defaultValue="all" className="gap-6">
					<TabsAnimated.List
						classNames={{
							highlight: "rounded-[36px] border-none bg-school-dark-blue-500",
							list: "gap-4",
						}}
					>
						<TabsAnimated.Trigger
							value="all"
							className="rounded-[36px] border border-[hsl(0,0%,84%)] bg-white px-6 py-2 text-base
								text-school-body-color data-[state=active]:border-none
								data-[state=active]:bg-transparent data-[state=active]:text-white"
						>
							All Notifications ({allNotifications.length})
						</TabsAnimated.Trigger>

						<TabsAnimated.Trigger
							value="unread"
							className="rounded-[36px] border border-[hsl(0,0%,84%)] bg-white px-6 py-2 text-base
								text-school-body-color data-[state=active]:border-none
								data-[state=active]:bg-transparent data-[state=active]:text-white"
						>
							Pending Approval ({unreadNotifications.length})
						</TabsAnimated.Trigger>
					</TabsAnimated.List>

					<TabsAnimated.ContentList>
						<TabsAnimated.Content value="all">
							<ForWithWrapper
								each={allNotifications}
								className="flex flex-col gap-4"
								renderItem={(item) => <NotificationCard key={item.id} item={item} />}
							/>
						</TabsAnimated.Content>

						<TabsAnimated.Content value="unread">
							<ForWithWrapper
								each={unreadNotifications}
								className="flex flex-col gap-4"
								renderItem={(item) => <NotificationCard key={item.id} item={item} />}
							/>
						</TabsAnimated.Content>
					</TabsAnimated.ContentList>
				</TabsAnimated.Root>
			</section>
		</Main>
	);
}

export default NotificationsPage;

function NotificationCard(props: { item: (typeof allNotifications)[number] }) {
	const { item } = props;

	return (
		<Card.Root
			as="li"
			className={cnJoin(
				`flex-row items-center justify-between rounded-[24px] border border-school-blue-500 px-10
				py-6.5`,
				item.status === "unread" ? "bg-[hsl(209,100%,97%)]" : "bg-white"
			)}
		>
			<Card.Header>
				<Card.Title className="text-[24px] font-medium">{item.title}</Card.Title>
				<Card.Description className="max-w-[712px] text-base text-school-body-color">
					{item.description}
				</Card.Description>
			</Card.Header>

			<Card.Footer className="flex flex-col items-end gap-[60px]">
				<button type="button" className="size-6">
					<IconBox icon="iconoir:cancel" className="size-full" />
				</button>

				<p className="text-[hsl(0,0%,52%)]">{item.time}</p>
			</Card.Footer>
		</Card.Root>
	);
}
