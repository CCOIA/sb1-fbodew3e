import React from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import BenefitsCards from './BenefitsCards';

export default function BenefitsContainer() {
  const { scrollYProgress } = useScroll();
  
  const yOffset = useTransform(scrollYProgress, 
    [0.4, 0.6], 
    [100, 0]
  );
  
  const opacity = useTransform(scrollYProgress,
    [0.4, 0.5, 0.6],
    [0, 1, 1]
  );

  const scale = useTransform(scrollYProgress,
    [0.4, 0.5, 0.6],
    [0.8, 1, 1]
  );

  return (
    <motion.div
      style={{
        opacity,
        y: yOffset,
        scale,
      }}
      className="relative z-10"
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Avantages Clés
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Découvrez comment notre IA transforme votre entreprise
        </motion.p>
      </div>

      <BenefitsCards />
    </motion.div>
  );
}