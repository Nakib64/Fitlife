"use client";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations("footer");

  if (pathname.includes("dashBoard")) {
    return ;
  }

  const headline = "FITLIFE COACH";
  const bgImage = "/about/marque.jpg";

  

  const socialLinks = t.raw("social");

  // console.log(pathname);

  return (
    <footer className="bg-[#1A3438] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
      

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 pb-6 text-white text-sm md:text-base font-semibold uppercase gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-center sm:text-left">
            <span>CALL US: (880) 1315168075</span>
            <span>EMAIL: nafiz2282@gmail.com</span>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <Link
                key={social.title}
                href={social.link}
                className="hover:text-[#C0F948] transition-colors"
              >
                {social.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* marquee */}
      <div
        className="relative w-full h-[20vh] xl:h-[40vh] overflow-hidden"
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
