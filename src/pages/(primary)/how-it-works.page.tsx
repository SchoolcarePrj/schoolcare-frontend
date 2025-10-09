import { Image } from "@unpic/react";
import { howItWorksBgDesktop, howItWorksBgMobile } from "@/assets/images/primary";
import { For, IconBox } from "@/components/common";

const steps = [
	{
		description:
			"To begin using our system, please sign up with your school and access the school admin portal.",
		icon: "ri-login-circle-line",
		title: "Sign Up",
	},
	{
		description:
			"The school admin should log in to the school admin dashboard to register students. Please copy each student's  registration number and distribute it to them. Each  registration  number is a unique identifier assigned to a student, serving as their  identity.",
		icon: "ri-user-add-line",
		title: "Register Student(s)",
	},
	{
		description:
			"Log in to your school admin dashboard and add the ICT admin or teacher responsible for managing the school management system's admin section",
		icon: "ri:group-line",
		title: "Add Admin/Editor(s)",
	},
	{
		description:
			"Download the result sheets for each subject and distribute them to the respective teachers based on the subjects they teach.",
		icon: "ri:upload-cloud-2-line",
		title: "Download the Result Sheet",
	},
	{
		description:
			"After computing results, editors can publish them online using the account from step two. The school admin updates the status to ‘published' for student viewing. Note: Only the admin can change the status, not the editor.",
		icon: "solar:document-text-outline",
		title: "Publish Results",
	},
	{
		description:
			"After uploading results for each class, distribute result checking scratch cards to students. Get these cards from our reseller or directly from us, delivered promptly. Note: Each card is valid for one student per term and can check the result up to 5 times.",
		icon: "mage:qr-code",
		title: "Give Students Pin",
	},
];

function HowItWorks() {
	return (
		<main className="flex flex-col gap-10 lg:gap-[55px]">
			<section className="relative flex h-[214px] items-center justify-center lg:h-[300px]">
				<div className="flex flex-col items-center text-center text-white">
					<h1 className="text-[24px] font-semibold lg:text-[48px]">See How SchoolCare Works</h1>
					<p className="max-lg:max-w-[250px] lg:text-[24px]">
						Learn the Simple Steps Behind How SchoolCare Works
					</p>
				</div>

				<picture className="absolute inset-0 -z-1">
					<source media="(min-width: 1000px)" srcSet={howItWorksBgDesktop} />
					<Image
						layout="fullWidth"
						src={howItWorksBgMobile}
						fetchPriority="high"
						className="h-full rounded-[24px] object-cover"
					/>
				</picture>
			</section>

			<section className="grid gap-4 lg:grid-cols-3 lg:gap-8">
				<For
					each={steps}
					renderItem={(step) => (
						<article
							key={step.title}
							className="flex flex-col justify-center gap-1 rounded-[16px] border border-210-78-82
								px-4.5 py-9 lg:rounded-[24px] lg:border-2 lg:px-7 lg:py-12"
						>
							<IconBox icon={step.icon} className="size-5 text-school-blue-500 lg:size-7" />

							<h1 className="text-[14px] font-semibold lg:text-base">{step.title}</h1>

							<p className="text-[12px] lg:text-[14px]">{step.description}</p>
						</article>
					)}
				/>
			</section>
		</main>
	);
}

export default HowItWorks;
