"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useTranslations } from "next-intl";

export function Reviews() {
  const t= useTranslations("home.testimonials");

  const testimonials = [
    {
      quote: t("testimonial1.quote"),
      name: t("testimonial1.name"),
      designation: t("testimonial1.designation"),
      rating: 5,
      src: "https://i.ibb.co.com/HDJvKnN6/photo-1438761681033-6461ffad8d80.jpg",
    },
    {
     quote: t("testimonial2.quote"),
      name: t("testimonial2.name"),
      designation: t("testimonial2.designation"),
      rating: 5,
      src: "https://i.ibb.co.com/5WyHxmpq/photo-1535713875002-d1d0cf377fde.jpg",
    },
    {
      quote: t("testimonial3.quote"),
      name: t("testimonial3.name"),
      designation: t("testimonial3.designation"),
      rating: 4,
      src: "https://i.ibb.co.com/KcShFDBf/photo-1623582854588-d60de57fa33f.jpg",
    },
    {
       quote: t("testimonial4.quote"),
      name: t("testimonial4.name"),
      designation: t("testimonial4.designation"),
      rating: 5,
      src: "https://i.ibb.co.com/yFCq5TKx/photo-1624561172888-ac93c696e10c.jpg",
    },
    {
       quote: t("testimonial5.quote"),
      name: t("testimonial5.name"),
      designation: t("testimonial5.designation"),
      rating: 5,
      src: "https://i.ibb.co.com/vC8XKTXQ/photo-1636041293178-808a6762ab39.jpg",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
