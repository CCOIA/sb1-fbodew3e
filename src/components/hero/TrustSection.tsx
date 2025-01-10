import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, Building2 } from 'lucide-react';
import PlanetBadge from './trust/PlanetBadge';

export default function TrustSection() {
  const trustItems = [
    {
      icon: Building2,
      title: "Entreprise locale",
      description: "100% Québécoise",
      flag: true,
      color: "from-blue-400 via-cyan-300 to-teal-400",
      texture: "noise-1",
      rings: true,
      atmosphere: {
        color: "#67E8F9",
        intensity: 0.5
      },
      glow: {
        color: "#22D3EE",
        intensity: 0.8
      }
    },
    {
      icon: Shield,
      title: "Chiffrement E2E",
      description: "Sécurité maximale",
      color: "from-emerald-400 via-green-300 to-lime-400",
      texture: "noise-2",
      moons: 2,
      atmosphere: {
        color: "#4ADE80",
        intensity: 0.6
      },
      glow: {
        color: "#22C55E",
        intensity: 0.8
      }
    },
    {
      icon: Lock,
      title: "RGPD & LPRPDE",
      description: "Confidentialité",
      color: "from-amber-400 via-yellow-300 to-orange-400",
      texture: "noise-3",
      rings: true,
      atmosphere: {
        color: "#FCD34D",
        intensity: 0.5
      },
      glow: {
        color: "#F59E0B",
        intensity: 0.8
      }
    },
    {
      icon: Award,
      title: "ISO 27001",
      description: "Certifiée",
      color: "from-fuchsia-400 via-pink-300 to-rose-400",
      texture: "noise-4",
      moons: 1,
      atmosphere: {
        color: "#F472B6",
        intensity: 0.6
      },
      glow: {
        color: "#EC4899",
        intensity: 0.8
      }
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {trustItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Enhanced glow effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full opacity-20 blur-2xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <PlanetBadge {...item} index={index} />
        </motion.div>
      ))}
    </div>
  );
}