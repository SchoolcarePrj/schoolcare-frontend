import { AccordionFaqs } from "../(home)/-components/AccordionFaqs";

function FaQ() {
	return (
		<main
			className="flex flex-col items-center gap-6 px-6 py-[20px_40px] lg:gap-[52px] lg:px-[80px]
				lg:py-[60px_100px]"
		>
			<h3 className="text-center font-bold lg:text-[32px]">Frequently Asked Questions</h3>

			<AccordionFaqs />
		</main>
	);
}

export default FaQ;
