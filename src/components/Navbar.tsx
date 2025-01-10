import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mic2, Phone } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const scale = useTransform(
    scrollY,
    [0, 50],
    [1, 0.95]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-cta');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      style={{ background: headerBackground }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto"
    >
      <motion.div
        style={{ scale }}
        className={`
          relative px-6 py-3
          bg-black/40 backdrop-blur-md
          rounded-full border border-purple-500/20
          transition-all duration-300
          ${isScrolled ? 'shadow-[0_8px_32px_rgba(139,92,246,0.3)]' : ''}
        `}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic2 className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold text-white">VoiceAI</span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToDemo}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              bg-gradient-to-r from-purple-600 to-purple-800
              hover:from-purple-700 hover:to-purple-900
              text-white px-4 py-2 rounded-full
              flex items-center gap-2
              transition-colors duration-300
              cursor-pointer
            "
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Essayer Gratuitement</span>
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl -z-10" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/5 to-transparent" />
      </motion.div>
    </motion.header>
  );
}