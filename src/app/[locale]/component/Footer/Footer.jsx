"use client";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const hiddenPath = ["/dashBoard"];

  if (hiddenPath.some((p) => pathname.includes(p))) {
    return null;
  }

  const headline = "FITLIFE COACH";
  const bgImage = "/about/marque.jpg";

  const t = useTranslations("footer");

  const footerLinks = [
    {
      title: t("about.title"),
      links: t.raw("about.links"),
    },
    {
      title: t("programs.title"),
      links: t.raw("programs.links"),
    },
    {
      title: t("quickLinks.title"),
      links: t.raw("quickLinks.links"),
    },
  ];

  const socialLinks = t.raw("social");

  // console.log(pathname);

  return (
    <footer className="bg-[#1A3438] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 border-b border-white/20 pb-12">
          {/* Columns from data */}
          {footerLinks.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h4 className="text-lg md:text-xl font-bold uppercase mb-4 md:mb-6">
                {column.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-[#C0F948] transition-colors text-sm md:text-base"
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
            <h4 className="text-lg md:text-xl font-bold uppercase mb-4 md:mb-6">
              Newsletter
            </h4>
            <p className="text-sm md:text-base leading-relaxed mb-4 text-gray-200">
              Sign up for exclusive product launches, promotions, and unique
              experiences.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email..."
                className="w-full p-3 bg-[#27484B] rounded-md border-none focus:outline-none focus:ring-2 focus:ring-[#C0F948] text-white placeholder-gray-400 text-sm md:text-base"
              />
              <button
                type="submit"
                className="w-full bg-[#7CCF00] hover:bg-[#6ABA00] text-[#1A3438] font-bold py-3 px-6 rounded-md uppercase transition-colors text-sm md:text-base"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 pb-6 text-white text-sm md:text-base font-semibold uppercase gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-center sm:text-left">
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
        className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               whitespace-nowrap text-white font-extrabold 
               text-[20vw] sm:text-[10vw] md:text-[12vw] uppercase flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 16, // smoother speed
            ease: "linear",
          }}
        >
          <div>
            {headline}&nbsp;&nbsp;&nbsp;{headline}&nbsp;&nbsp;&nbsp;{headline}
            &nbsp;&nbsp;&nbsp;{headline}
          </div>
        </motion.div>
      </div>

      {/* copyright */}
      <div className="bg-[#1A3438] text-white text-center font-medium text-sm sm:text-lg md:text-xl py-6 px-6">
        Copyright <span className="text-lime-400">© 2025</span> Guildy. All
        rights reserved
      </div>
    </footer>
  );
}
