import { schoolFour } from "@/assets/images/home";
import { TabsAnimated } from "@/components/animated/ui";
import { ForWithWrapper, IconBox, Image } from "@/components/common";
import { Card, Form } from "@/components/ui";
import { Main } from "../-components/Main";

const allSchools = [
	{
		address: "Lagos Mainland, Surulere",
		email: "graceinterationalschool@gmail.com",
		id: 1,
		logoSrc: schoolFour,
		name: "Grace International School",
		schoolCode: "345gfbdt",
		totalStudents: "1,345",
	},
	{
		address: "Lagos Mainland, Surulere",
		email: "graceinterationalschool@gmail.com",
		id: 2,
		logoSrc: schoolFour,
		name: "Grace International School",
		schoolCode: "345gfbdt",
		totalStudents: "1,345",
	},
	{
		address: "Lagos Mainland, Surulere",
		email: "graceinterationalschool@gmail.com",
		id: 3,
		logoSrc: schoolFour,
		name: "Grace International School",
		schoolCode: "345gfbdt",
		totalStudents: "1,345",
	},
];

function SchoolsPage() {
	return (
		<Main className="gap-6">
			<header className="flex flex-col gap-6">
				<div>
					<h1 className="text-[24px] font-medium">Schools Management</h1>
					<p className="text-[hsl(0,0%,52%)]">Manage and monitor all educational institutions</p>
				</div>

				<form>
					<Form.InputGroup
						className="h-[60px] items-center gap-2 rounded-[36px] border border-[hsl(0,0%,84%)]
							bg-white px-4"
					>
						<Form.InputLeftItem>
							<IconBox
								icon="bitcoin-icons:search-outline"
								className="size-6 text-[hsl(0,0%,52%)]"
							/>
						</Form.InputLeftItem>

						<Form.InputPrimitive
							type="search"
							placeholder="Search school..."
							className="text-base font-medium placeholder:text-[hsl(0,0%,52%)]"
						/>
					</Form.InputGroup>
				</form>
			</header>

			<section>
				<TabsAnimated.Root className="gap-6">
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
							All Schools
						</TabsAnimated.Trigger>

						<TabsAnimated.Trigger
							value="pending"
							className="rounded-[36px] border border-[hsl(0,0%,84%)] bg-white px-6 py-2 text-base
								text-school-body-color data-[state=active]:border-none
								data-[state=active]:bg-transparent data-[state=active]:text-white"
						>
							Pending Approval
						</TabsAnimated.Trigger>
					</TabsAnimated.List>

					<TabsAnimated.ContentList>
						<TabsAnimated.Content value="all">
							<ForWithWrapper
								each={allSchools}
								className="flex flex-col gap-4"
								renderItem={(item) => (
									<SchoolCard key={item.id} item={item}>
										<Card.Action
											as="button"
											type="button"
											className="rounded-[8px] border border-school-dark-blue-500 px-4 py-2"
										>
											<IconBox
												icon="iconamoon:edit-thin"
												className="size-4 text-school-dark-blue-500"
											/>
										</Card.Action>
									</SchoolCard>
								)}
							/>
						</TabsAnimated.Content>

						<TabsAnimated.Content value="pending">
							<ForWithWrapper
								each={allSchools}
								className="flex flex-col gap-4"
								renderItem={(item) => (
									<SchoolCard key={item.id} item={item}>
										<Card.Action
											as="button"
											type="button"
											className="rounded-[8px] border border-school-green-500 bg-school-green-50
												p-2.5"
										>
											Approve School
										</Card.Action>
									</SchoolCard>
								)}
							/>
						</TabsAnimated.Content>
					</TabsAnimated.ContentList>
				</TabsAnimated.Root>
			</section>
		</Main>
	);
}

export default SchoolsPage;

function SchoolCard(props: { children?: React.ReactNode; item: (typeof allSchools)[number] }) {
	const { children, item } = props;

	return (
		<Card.Root
			as="li"
			className="flex-row items-start justify-between rounded-[24px] border border-[hsl(0,0%,84%)]
				bg-white px-12 py-9"
		>
			<Card.Content className="flex flex-col gap-3">
				<Card.Header className="flex flex-col gap-0.5">
					<figure className="flex items-center gap-2">
						<Image width={32} height={32} src={item.logoSrc} className="size-8 rounded-[8px]" />

						<figcaption>
							<Card.Title className="text-[24px] font-medium">{item.name}</Card.Title>
						</figcaption>
					</figure>

					<figure className="flex items-center gap-2 text-[hsl(0,0%,52%)]">
						<IconBox icon="akar-icons:location" className="size-3" />
						<figcaption>
							<Card.Description>{item.address}</Card.Description>
						</figcaption>
					</figure>
				</Card.Header>

				<article className="flex flex-col gap-1">
					<figure className="flex items-center gap-2">
						<IconBox icon="mdi-light:email" className="size-3 text-[hsl(0,0%,52%)]" />
						<figcaption>Email: {item.email}</figcaption>
					</figure>
					<figure className="flex items-center gap-2">
						<IconBox icon="lucide:scan-qr-code" className="size-3 text-[hsl(0,0%,52%)]" />
						<figcaption>School Code: {item.schoolCode}</figcaption>
					</figure>
					<figure className="flex items-center gap-2">
						<IconBox icon="hugeicons:students" className="size-3 text-[hsl(0,0%,52%)]" />
						<figcaption>Total Students: {item.totalStudents}</figcaption>
					</figure>
				</article>
			</Card.Content>

			{children}
		</Card.Root>
	);
}
