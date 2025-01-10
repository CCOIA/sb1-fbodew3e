import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadingState } from './loading/hooks/useLoadingState';
import InitializationPhase from './loading/phases/InitializationPhase';
import CountdownPhase from './loading/phases/CountdownPhase';
import TransitionPhase from './loading/phases/TransitionPhase';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = memo(function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { phase, progress } = useLoadingState(onLoadingComplete);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {phase === 'initialization' && <InitializationPhase key="init" />}
        {phase === 'countdown' && <CountdownPhase key="countdown" />}
        {phase === 'launch' && <TransitionPhase key="transition" progress={progress} />}
      </AnimatePresence>
    </motion.div>
  );
});

export default LoadingScreen;