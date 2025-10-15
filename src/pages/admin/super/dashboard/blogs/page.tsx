import { ForWithWrapper, IconBox } from "@/components/common";
import { Card, Form } from "@/components/ui";
import { Heading } from "../-components/Heading";
import { Main } from "../-components/Main";

const allBlogs = [
	{
		description:
			"Success in secondary school isn’t always about being the smartest student in the class—it’s about being consistent. Many students wait until exams are close before they start reading, but this often leads to stress and poor performance",
		id: 1,
		publishedAt: "20th, March",
		publishedBy: "Grace International School",
		title: "The Power of Consistency in Your Studies",
	},
	{
		description:
			"Success in secondary school isn’t always about being the smartest student in the class—it’s about being consistent. Many students wait until exams are close before they start reading, but this often leads to stress and poor performance",
		id: 2,
		publishedAt: "20th, March",
		publishedBy: "Grace International School",
		title: "The Power of Consistency in Your Studies",
	},
	{
		description:
			"Success in secondary school isn’t always about being the smartest student in the class—it’s about being consistent. Many students wait until exams are close before they start reading, but this often leads to stress and poor performance",
		id: 3,
		publishedAt: "20th, March",
		publishedBy: "Grace International School",
		title: "The Power of Consistency in Your Studies",
	},
];

function BlogsPage() {
	return (
		<Main className="gap-6">
			<header className="flex flex-col gap-6">
				<article className="flex justify-between">
					<Heading title="Blogs Management" description="Manage all school blogs" />

					<button
						type="button"
						className="flex h-[56px] w-full max-w-[125px] items-center justify-center gap-1
							rounded-[8px] border border-school-blue-500 font-medium text-school-blue-500"
					>
						<IconBox icon="ic:round-plus" className="size-6" />
						Add blog
					</button>
				</article>

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
							placeholder="Search blogs..."
							className="text-base font-medium placeholder:text-[hsl(0,0%,52%)]"
						/>
					</Form.InputGroup>
				</form>
			</header>

			<ForWithWrapper
				as="section"
				each={allBlogs}
				className="flex flex-col gap-4"
				renderItem={(item) => <BlogCard key={item.id} item={item} />}
			/>
		</Main>
	);
}

export default BlogsPage;

function BlogCard(props: { item: (typeof allBlogs)[number] }) {
	const { item } = props;

	return (
		<Card.Root className="gap-0.5 rounded-[24px] border border-[hsl(0,0%,84%)] bg-white px-12 py-9">
			<Card.Header>
				<Card.Title className="text-[24px] font-medium">{item.title}</Card.Title>
			</Card.Header>

			<Card.Content>
				<Card.Description className="max-w-[798px] text-base text-[hsl(0,0%,52%)]">
					{item.description}...
				</Card.Description>
			</Card.Content>

			<Card.Footer className="flex items-center justify-between py-2.5">
				<article className="flex gap-6.5">
					<figure className="flex items-center gap-2">
						<IconBox icon="hugeicons:school" className="size-3 text-[hsl(0,0%,52%)]" />
						<figcaption className="flex gap-2">
							Published by: <span>{item.publishedBy}</span>
						</figcaption>
					</figure>

					<figure className="flex items-center gap-2">
						<IconBox icon="formkit:date" className="size-3 text-[hsl(0,0%,52%)]" />
						<figcaption className="flex gap-2">
							Publish Date: <span>{item.publishedAt}</span>
						</figcaption>
					</figure>
				</article>

				<div className="flex gap-3">
					<Card.Action
						className="rounded-[8px] border border-school-dark-blue-500 p-2.5
							text-school-dark-blue-500"
					>
						View
					</Card.Action>
					<Card.Action
						className="rounded-[8px] border border-school-red-500 p-2.5 text-school-red-500"
					>
						Delete
					</Card.Action>
				</div>
			</Card.Footer>
		</Card.Root>
	);
}
