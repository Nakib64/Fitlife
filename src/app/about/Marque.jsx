"use client";

import { motion } from "framer-motion";

export default function HeadlineMarquee() {
	const headline = "FITLIFE COACH";
	const bgImage = "/about/marque.jpg";

	return (
		<section
			className="relative w-full h-[40vh] overflow-hidden"
			style={{
				backgroundImage: `url(${bgImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-no-repeat  bg-opacity-40">
				{/* <img src="/about/marque.jpg" alt="" className='object-cover ' /> */}

				<motion.div
					className="absolute whitespace-nowrap items-center text-white font-extrabold text-[10vw] md:text-[12vw] lg:text-[14vw] uppercase flex"
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						repeat: Infinity,
						repeatType: "loop",
						duration: 20, // adjust for speed
						ease: "linear",
					}}
				>
					<div>
						{headline}&nbsp;&nbsp;&nbsp;{headline}&nbsp;&nbsp;&nbsp;{headline}
						&nbsp;&nbsp;&nbsp;{headline}
					</div>
					{/* Repeat the text to make seamless scrolling */}
				</motion.div>
			</div>
		</section>
	);
}
