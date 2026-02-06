import { IconBox } from "@/components/common";
import { For } from "@/components/common/For";
import { Accordion } from "@/components/ui";

const FAQs = [
	{
		answer:
			"We have made the process very easy for you. Simply visit the schoolcare.com.ng homepage and click on the Register School button to get started.",
		question: "How do I sign up for my school?",
	},
	{
		answer:
			"Registration and use of schoolcare is totally FREE. However, to cover additional services like the result-checking scratch card model, blog posts/promotions, and system maintenance, schoolcare charges 800 naira per student per term.",
		question: "How Much Does It Cost To Use SchoolCare?",
	},
	{
		answer:
			"Yes. All we need is temporary permission to access your website, and we will make the necessary changes to integrate the Schoolcare system into it.",
		question: "Can I Use SchoolCare With My Existing School's Website?",
	},
	{
		answer:
			"SchoolCare is a school management system that allows you to register your school for free. After registration, your school will be verified and given an independent portal where you can seamlessly compute students' results and track their academic performance in real time.",
		question: "How does SchoolCare work?",
	},
	{
		answer:
			"To access your result, kindly request a result-checking PIN from your school admin (provided at a minimal cost). This PIN, along with your registration number, will be required to view your results.",
		question: "Can I get a printed copy or official transcript of my result?",
	},
	{
		answer:
			"Yes. Once you view your result, you can always print a hard copy by clicking the “Print” button.",
		question: "Can I get a printed copy of my results?",
	},
	{
		answer:
			"SchoolCare uses a cloud-based database, so your results will remain available online for as long as the school retains them on the platform.",
		question: "How long will my result be available online?",
	},
];

function AccordionFaqs() {
	return (
		<Accordion.Root type="single" collapsible={true} className="flex w-full flex-col gap-3">
			<For
				each={FAQs}
				renderItem={(faq) => (
					<Accordion.Item
						key={faq.question}
						value={faq.question}
						className="rounded-[8px] border border-[hsl(0,0%,78%)] lg:rounded-[12px] lg:border-[3px]"
					>
						<Accordion.Trigger withIcon={false} className="p-4 lg:p-9 lg:text-base">
							{faq.question}

							<div data-icon="true" className="relative flex items-center pr-4">
								<IconBox
									icon="material-symbols:add-2"
									className="absolute size-3 origin-center transition-all duration-200 in-data-[state=open]:rotate-90
										in-data-[state=open]:opacity-0 lg:size-6"
								/>
								<IconBox
									icon="material-symbols:remove"
									className="absolute size-3 origin-center transition-all duration-200 in-data-[state=close]:opacity-100
										in-data-[state=open]:rotate-90 lg:size-6"
								/>
							</div>
						</Accordion.Trigger>

						<Accordion.Content className="flex flex-col gap-4 text-balance lg:gap-6">
							<hr className="h-px border-none bg-[hsl(0,0%,78%)] lg:h-[3px]" />

							<p className="px-4 pb-4 text-[12px] lg:px-9 lg:pb-6 lg:text-[14px]">{faq.answer}</p>
						</Accordion.Content>
					</Accordion.Item>
				)}
			/>
		</Accordion.Root>
	);
}

export { AccordionFaqs };
