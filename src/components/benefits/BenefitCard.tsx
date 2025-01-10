import React from 'react';
import { motion } from 'framer-motion';
import { Phone, TrendingUp, Bot, ArrowRight } from 'lucide-react';

// Icons mapping
const icons = {
  Phone,
  TrendingUp,
  Bot
};

interface BenefitCardProps {
  title: string;
  description: string;
  icon: keyof typeof icons;
  features: string[];
  stats: {
    value: string;
    label: string;
  };
  action: {
    text: string;
    description: string;
  };
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}

export default function BenefitCard({
  title,
  description,
  icon,
  features,
  stats,
  action,
  isExpanded,
  onClick,
  index
}: BenefitCardProps) {
  const Icon = icons[icon];

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-cta');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.cta-button')) {
      e.stopPropagation();
      scrollToDemo();
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      className="relative h-[500px] cursor-pointer perspective-1000"
      initial={{ opacity: 0, rotateY: -360, scale: 0.5 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.3,
        duration: 1.5
      }}
    >
      <motion.div
        className="absolute inset-0 transform-style-3d"
        animate={{ rotateY: isExpanded ? 180 : 0, z: isExpanded ? 50 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
        whileHover={{ scale: isExpanded ? 1 : 1.05, transition: { duration: 0.3 } }}
        onClick={handleCardClick}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur-xl border border-purple-500/10 p-8 flex flex-col items-center justify-center backface-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)'
          }}
          initial={false}
          animate={{ rotateY: 0, opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.3 + 0.3, type: "spring", stiffness: 80, damping: 15 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-4 bg-purple-500/10 rounded-full blur-xl" />
            <Icon className="w-16 h-16 text-purple-400 relative z-10" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
          <p className="text-gray-300 text-center text-lg">{description}</p>
          
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3 + 0.5 }}
          >
            <p className="text-purple-400 text-sm">Cliquez pour plus de détails</p>
          </motion.div>
        </motion.div>

        {/* Back of card */}
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-900/30 to-black/80 backdrop-blur-xl border border-purple-500/10 p-6 transform-style-3d backface-hidden overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)'
          }}
          initial={false}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isExpanded ? 1 : 0, scale: isExpanded ? 1 : 0.8 }}
              transition={{ delay: isExpanded ? 0.2 : 0 }}
              className="text-center mb-4"
            >
              <h3 className="text-4xl font-bold text-white mb-1">{stats.value}</h3>
              <p className="text-purple-300 text-sm">{stats.label}</p>
            </motion.div>

            <h4 className="text-lg font-semibold text-white mb-3">Caractéristiques</h4>
            <ul className="space-y-2 mb-4 flex-grow">
              {features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                  transition={{ delay: isExpanded ? 0.3 + idx * 0.1 : 0 }}
                  className="text-gray-300 flex items-center text-sm"
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                  <span className="leading-tight">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
              transition={{ delay: isExpanded ? 0.4 : 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cta-button w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 mt-auto"
            >
              <span>{action.text}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}