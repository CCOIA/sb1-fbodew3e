import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Bot } from 'lucide-react';
import Scene3D from './Scene3D';
import HeroCTA from './hero/HeroCTA';
import TrustSection from './hero/TrustSection';
import HeroCard from './hero/HeroCard';

export default function Hero() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-cta');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroCards = [
    {
      icon: Phone,
      title: 'Appels Entrants',
      description: 'Service client 24/7',
      backContent: 'Créez votre propre adjointe',
      features: [
        'Réponse instantanée',
        'Gestion des demandes',
        'Suivi personnalisé'
      ],
      dreamOutcome: {
        title: "Libérez votre temps",
        description: "Gagnez jusqu'à 40h par mois en automatisant vos appels entrants",
        cta: "Commencez maintenant"
      }
    },
    {
      icon: MessageSquare,
      title: 'Appels Sortants',
      description: 'Prospection intelligente',
      backContent: 'Créez votre propre preneur de rendez-vous',
      features: [
        'Qualification des leads',
        'Prise de rendez-vous',
        'Suivi commercial'
      ],
      dreamOutcome: {
        title: "Multipliez vos résultats",
        description: "Augmentez vos conversions de 300% avec la prospection automatisée",
        cta: "Boostez vos ventes"
      }
    },
    {
      icon: Bot,
      title: 'IA Avancée',
      description: 'Conversations naturelles',
      backContent: 'Créez votre deuxième vous-même',
      features: [
        'Apprentissage continu',
        'Personnalisation avancée',
        'Adaptation en temps réel'
      ],
      dreamOutcome: {
        title: "Soyez partout à la fois",
        description: "Votre double numérique travaille 24/7 pendant que vous vous concentrez sur l'essentiel",
        cta: "Créez votre double"
      }
    }
  ];

  return (
    <div id="accueil" className="relative min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Scene3D />
      </div>
      
      <div className="relative z-10 pt-32 pb-16 sm:pt-40 lg:pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
              <span className="block">Solutions Vocales IA</span>
              <span className="block text-purple-500 mt-2">Pour Votre Entreprise</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              Transformez vos communications avec nos agents vocaux alimentés par l'IA.
              Solutions intelligentes pour appels entrants et sortants.
            </p>
            
            <div className="mt-10 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToDemo}
                className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Voir la démo
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {heroCards.map((card, index) => (
              <HeroCard
                key={index}
                {...card}
                index={index}
                isExpanded={expandedIndex === index}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          <div className="mt-20">
            <TrustSection />
          </div>
          
          <div id="demo-cta" className="mt-20">
            <HeroCTA />
          </div>
        </div>
      </div>
    </div>
  );
}