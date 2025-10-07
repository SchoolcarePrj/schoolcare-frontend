import { IconBox } from "@/components/common";
import { Form } from "@/components/ui";
import { Main } from "../-components/Main";

function SchoolsPage() {
	return (
		<Main>
			<header className="flex flex-col gap-6">
				<div>
					<h1 className="text-[24px] font-medium">Schools Management</h1>
					<p className="text-[hsl(0,0%,52%)]">Manage and monitor all educational institutions</p>
				</div>

				<form>
					<Form.InputGroup
						className="h-[60px] items-center gap-2 rounded-[36px] border border-[hsl(0,0%,84%)]
							bg-white px-4 focus-visible:outline-hidden"
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
		</Main>
	);
}

export default SchoolsPage;
