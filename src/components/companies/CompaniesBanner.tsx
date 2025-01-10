import React from 'react';
import { motion } from 'framer-motion';
import CompanyLogo from './CompanyLogo';

const companies = [
  {
    name: 'Microsoft',
    description: 'Azure AI & GPT-4',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
    color: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Google',
    description: 'Google Cloud AI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    color: 'from-red-400 to-yellow-400'
  },
  {
    name: 'Amazon',
    description: 'AWS AI Services',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    color: 'from-orange-400 to-orange-600'
  },
  {
    name: 'IBM',
    description: 'Watson AI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg',
    color: 'from-blue-600 to-blue-800'
  },
  {
    name: 'Meta',
    description: 'AI Research',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg',
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Salesforce',
    description: 'Einstein AI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg',
    color: 'from-sky-400 to-blue-500'
  }
];

export default function CompaniesBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
                'radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.15), transparent 70%)',
                'radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.15), transparent 70%)',
                'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <h2 className="text-3xl font-bold text-white mb-4">
            Si les grands le font, faites-le aussi!
          </h2>
          <p className="text-xl text-gray-300">
            Rejoignez les leaders qui transforment leur industrie
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
          
          {/* Animated grid pattern */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '50px 50px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Enhanced gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Scrolling content */}
          <div className="relative overflow-hidden py-12">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-50%' }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: "linear",
                },
              }}
              className="flex gap-12 whitespace-nowrap px-6"
            >
              {[...companies, ...companies].map((company, index) => (
                <CompanyLogo 
                  key={`${company.name}-${index}`} 
                  {...company} 
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}