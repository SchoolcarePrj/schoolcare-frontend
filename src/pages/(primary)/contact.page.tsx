import { IconBox } from "@/components/common";
import AiImage from "../../assets/images/AiImage.png";

function ContactUs() {
	return (
		<div className="flex flex-col gap-7 md:flex-row lg:gap-36">
			<div className="md:w-[45%]">
				<img src={AiImage} alt="" />

				<div className="sm:hidden md:block">
					<div
						className="my-8 flex items-center justify-between rounded-lg border
							border-[hsl(0,0%,78%)] bg-white p-3"
					>
						<div>
							<p>You can email us here</p>
							<p className="font-semibold">schoolcare.office@gmail.com</p>
						</div>
						<IconBox icon="ri-arrow-right-line" />
					</div>

					<div
						className="my-8 flex items-center justify-between rounded-lg border
							border-[hsl(0,0%,78%)] bg-white p-3"
					>
						<div>
							<p>Give us a call on</p>

							<p className="font-semibold"> +234 9038 7468 94</p>
						</div>
						<IconBox icon="ri-arrow-right-line" />
					</div>

					<p className="sm:hidden md:block">Follow Us on Social Media</p>
					<div className="mt-2 flex text-[24px] sm:hidden md:block">
						<IconBox icon="ri-facebook-circle-fill" />
						<IconBox icon="ri-twitter-x-fill" />
						<IconBox icon="ri-linkedin-box-fill" />
						<IconBox icon="ri-instagram-fill" />
					</div>
				</div>
			</div>

			<div>
				<p className="font-semibold sm:my-6">
					Fill out the form below, one of our team members will get back to you shortly
				</p>
				<div
					className="mt-4 rounded-lg border-2 border-[hsl(0,0%,78%)] bg-white px-4 py-7 md:order-2
						md:pb-16 lg:h-[80vh] lg:w-[100%] lg:px-8 lg:py-8"
				>
					<h1 className="font-semibold">Name*</h1>

					<input
						type="text"
						placeholder="Enter your name"
						className="w-[100%] rounded-lg border border-[hsl(0,0%,78%)] p-3 outline-hidden"
					/>

					<div className="my-3 gap-4 sm:flex">
						<div>
							<h1 className="font-semibold">Email*</h1>
							<input
								type="text"
								placeholder="Enter your Email"
								className="rounded-lg border border-[hsl(0,0%,78%)] p-2 outline-hidden sm:w-[100%]"
							/>
						</div>

						<div>
							<h1 className="font-semibold">Phone*</h1>
							<input
								type="text"
								placeholder="Enter your Phone"
								className="rounded-lg border border-[hsl(0,0%,78%)] p-2 outline-hidden sm:w-[100%]"
							/>
						</div>
					</div>

					<h1 className="font-semibold">Subject*</h1>

					<input
						type="text"
						placeholder="Enter your subject"
						className="w-[100%] rounded-lg border border-[hsl(0,0%,78%)] p-3 outline-hidden"
					/>

					<h1 className="mt-4 font-semibold">Message*</h1>

					<input
						type="text"
						placeholder="Enter your message"
						className="w-[100%] rounded-lg border border-[hsl(0,0%,78%)] pb-20 pl-3 outline-hidden"
					/>

					<button type="submit" className="my-3 mt-10 rounded-lg bg-cosBlue p-2 text-cosWhite">
						Send Message
					</button>
				</div>
			</div>

			<div className="md:hidden">
				<div
					className="my-8 flex items-center justify-between rounded-lg border-2 border-[hsl(0,0%,78%)]
						p-3 px-4"
				>
					<div>
						<p>You can email us here</p>
						<p className="font-semibold">schoolcare.office@gmail.com</p>
					</div>
					<IconBox icon="ri-arrow-right-line" />
				</div>

				<div className="flex items-center justify-between rounded-lg border-2 p-3 px-4 md:w-[100%]">
					<div>
						<p>Give us a call on</p>

						<p className="font-semibold"> +234 9038 7468 94 </p>
					</div>
					<IconBox icon="ri-arrow-right-line" />
				</div>

				<p className="">Follow Us on Social Media</p>
				<div className="mt-2 flex gap-3 text-[24px]">
					<IconBox icon="ri-facebook-circle-fill" />
					<IconBox icon="ri-twitter-x-fill" />
					<IconBox icon="ri-linkedin-box-fill" />
					<IconBox icon="ri-instagram-fill" />
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
