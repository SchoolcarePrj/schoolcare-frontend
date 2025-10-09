import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { Main } from "../-components/Main";
import { TabsAnimated } from "@/components/animated/ui";

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
				<TabsAnimated.Root>
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
				</TabsAnimated.Root>
			</section>
		</Main>
	);
}

export default SchoolsPage;
