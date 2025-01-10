import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BenefitCard from './BenefitCard';
import { benefitsData } from './benefitsData';

export default function BenefitsCards() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {benefitsData.map((benefit, index) => (
        <BenefitCard
          key={benefit.id}
          {...benefit}
          index={index}
          isExpanded={expandedIndex === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </motion.div>
  );
}