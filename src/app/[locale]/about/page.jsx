'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import ImpactSection from './ImpactSection';
import FeaturesGrid from './Features';
import TeamSwiper from './TeamMembers';

// Section animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Page = () => {
  return (
    <div className="space-y-20 overflow-hidden">
      {/* Hero Section (animates on load) */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>

      {/* Impact Section (animates on scroll) */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <ImpactSection />
      </motion.div>

      {/* Features Grid (animates on scroll) */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FeaturesGrid />
      </motion.div>

      {/* Team Swiper (animates on scroll) */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <TeamSwiper />
      </motion.div>
    </div>
  );
};

export default Page;
