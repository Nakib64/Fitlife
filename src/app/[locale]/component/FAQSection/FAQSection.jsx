"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, BarChart, Apple, CreditCard, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQSection() {
  const t = useTranslations("home.faq"); // assuming JSON key: "faq"

  return (
    <section className="bg-[#f3f4f7] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-gray-800 via-slate-700 to-blue-600 text-transparent bg-clip-text animate-gradient">
            {t("header")}
          </h2>
          <p className="mt-4 mb-7 text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("subheader")}
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="faq1">
            <AccordionTrigger className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#8fce11]" />
              {t("faq1_question")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">{t("faq1_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq2">
            <AccordionTrigger className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-[#8fce11]" />
              {t("faq2_question")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">{t("faq2_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq3">
            <AccordionTrigger className="flex items-center gap-3">
              <Apple className="w-6 h-6 font-bold text-[#8fce11]" />
              {t("faq3_question")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">{t("faq3_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq4">
            <AccordionTrigger className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[#8fce11]" />
              {t("faq4_question")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">{t("faq4_answer")}</AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq5">
            <AccordionTrigger className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#8fce11]" />
              {t("faq5_question")}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">{t("faq5_answer")}</AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg mb-4">{t("cta_text")}</p>
          <button className="px-8 py-3 rounded-full bg-[#C8FF58] text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
            {t("cta_button")}
          </button>
        </div>
      </div>
    </section>
  );
}
