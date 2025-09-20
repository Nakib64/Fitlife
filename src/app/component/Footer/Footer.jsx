'use client'
import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "About",
    links: ["About", "Our Story", "Trainers", "Mission", "Why Us"],
  },
  {
    title: "Programs",
    links: [
      "Advanced Step",
      "Hot Yoga",
      "Flexible Strength",
      "Road Drills",
      "Body Dance Cardio",
      "Athletic Training",
    ],
  },
  {
    title: "Quick Links",
    links: ["Blog", "Locations", "Contact", "Careers", "FAQs"],
  },
];

const socialLinks = ["FACEBOOK", "INSTAGRAM", "YOUTUBE", "TWITTER"];

export default function Footer() {
  const headline = "FITLIFE COACH";
  const bgImage = "/about/marque.jpg";

  return (
    <footer className="bg-[#1A3438] text-white pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white border-opacity-20 pb-12">
          {/* Columns from data */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h4 className="text-xl font-bold uppercase mb-6 text-white">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-[#C0F948] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="flex flex-col">
            <h4 className="text-xl font-bold uppercase mb-6 text-white">
              Newsletter
            </h4>
            <p className="text-base leading-relaxed mb-4">
              Sign up for exclusive product launches, promotions, and unique
              experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-grow p-3 bg-[#27484B] rounded-md border-none focus:outline-none focus:ring-2 focus:ring-[#C0F948] text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#C0F948] text-[#1A3438] font-bold py-3 px-6 rounded-md uppercase hover:bg-[#aae03b] transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 text-white font-bold uppercase">
          <div className="flex flex-col sm:flex-row mb-4 sm:mb-0 space-y-2 sm:space-y-0 sm:space-x-8">
            <span>CALL US: (094) 123 - 456 88</span>
            <span>EMAIL: SUPPORT@EXAMPLE.COM</span>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social}
                href="#"
                className="hover:text-[#C0F948] transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* marquee */}
      <div
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
      </div>

      {/* copyright */}
      <div className="bg-[#1A3438] text-white text-center font-bold text-xl pt-10 px-8 font-sans">
        Copyright <span className="text-lime-400">© 2025</span> Guildy. All
        rights reserved
      </div>
    </footer>
  );
}
