"use client";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("about.aboutHero");

  return (
    <section className="relative">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] lg:h-screen">
        <Image
          src="/about/aboutHero.jpg"
          alt="hero section"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Blur Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white drop-shadow-lg leading-snug md:leading-tight lg:leading-tight">
            {t("headline")}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-200 font-semibold drop-shadow-md">
            {t("subHeadline")}
          </p>
        </div>
      </section>

      {/* Image Section with stable gap */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 px-4">
        <div className="flex justify-center px-4 lg:pr-16 lg:px-0">
          <img
            src="/about/aboutHero21.jpg"
            alt="aboutHero21"
            className="rounded-2xl w-full h-auto"
          />
        </div>
        <div className="flex justify-between flex-col py-8 md:py-12 lg:py-16">
          <div className="flex gap-2 sm:gap-4 items-center">
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-lime-400"></span>
            <p className="text-sm sm:text-base md:text-lg font-bold">
              {t("whoWeAre")}
            </p>
          </div>

          {/* title */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4 md:mt-6 leading-snug sm:leading-tight md:leading-tight">
            {t("title")}
          </h1>

          {/* description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-6">
            <div className="flex flex-col gap-6 md:gap-8">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-semibold">
                {t("description")}
              </h3>
              <div className="space-y-2 md:space-y-4 text-base sm:text-lg md:text-xl font-extrabold">
                <h3 className="flex gap-2 sm:gap-4">
                  <span className="text-lime-400">01.</span>
                  <p>{t("point1")}</p>
                </h3>
                <hr />
                <h3 className="flex gap-2 sm:gap-4">
                  <span className="text-lime-400">02.</span>
                  <p>{t("point2")}</p>
                </h3>
                <hr />
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/about/aboutHero22.jpg"
                alt="aboutHero22"
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
