"use client";

import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

const stats = [
  { key: "activeMembers", value: 128, suffix: "K+" },
  { key: "caloriesBurnt", value: 415, suffix: "K+" },
  { key: "hoursTrained", value: 10, suffix: "M+" },
  { key: "certifiedTrainers", value: 25, suffix: "K+" }
];

const ImpactSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const t = useTranslations("about.impact");

  return (
    <section
      ref={ref}
      className="relative w-full h-screen rounded-4xl max-w-7xl overflow-hidden mx-auto"
    >
      <Image
        src="/about/aboutImpact.jpg"
        alt="impact background"
        fill
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
          {t("title")}
        </h2>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-12">
          {t("subtitle")}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center">
              <h4 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-lime-400">
                {inView ? <CountUp end={stat.value} duration={2} /> : 0}
                {stat.suffix}
              </h4>
              <p className="text-white font-semibold mt-2 text-sm md:text-base lg:text-lg">
                {t(`stats.${stat.key}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
