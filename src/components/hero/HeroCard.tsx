import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface DreamOutcome {
  title: string;
  description: string;
  cta: string;
}

interface HeroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  backContent: string;
  features: string[];
  dreamOutcome: DreamOutcome;
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}

export default function HeroCard({
  icon: Icon,
  title,
  description,
  backContent,
  features,
  dreamOutcome,
  isExpanded,
  onClick,
  index
}: HeroCardProps) {
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
      className="relative h-[450px] cursor-pointer perspective-1000"
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
          <div className="h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4">{backContent}</h3>
            
            <ul className="space-y-3 mb-4">
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

            <div className="mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 20 }}
                transition={{ delay: isExpanded ? 0.5 : 0 }}
                className="bg-purple-500/10 rounded-lg p-4 backdrop-blur-sm border border-purple-500/20 mb-4"
              >
                <h4 className="text-lg font-bold text-white mb-2">{dreamOutcome.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{dreamOutcome.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cta-button w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 group"
                >
                  <span>{dreamOutcome.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}