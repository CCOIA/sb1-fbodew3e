import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Sparkles } from 'lucide-react';

export default function HeroCTA() {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-32 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-3xl" />
      
      <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
        
        <div className="relative p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2
              }}
              className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Testez Notre Agent IA Gratuitement
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Recevez un appel de démonstration de notre agent vocal intelligent
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-2 text-sm text-purple-300 text-left"
                  >
                    Pour que l'IA puisse vous appeler par votre prénom
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <input
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                </motion.div>

                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-lg flex items-center justify-center space-x-3 transform transition-all duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Recevoir l'appel de démonstration</span>
                </motion.button>
              </div>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-6 text-sm text-gray-400"
            >
              Notre agent vous appellera dans les prochaines minutes
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}