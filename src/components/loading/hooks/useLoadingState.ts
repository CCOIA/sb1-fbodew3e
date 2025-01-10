import { useState, useEffect, useCallback } from 'react';

export type LoadingPhase = 'initialization' | 'countdown' | 'launch';

export function useLoadingState(onComplete: () => void) {
  const [phase, setPhase] = useState<LoadingPhase>('initialization');
  const [progress, setProgress] = useState(0);

  const advancePhase = useCallback(() => {
    setPhase(current => {
      switch (current) {
        case 'initialization':
          return 'countdown';
        case 'countdown':
          return 'launch';
        default:
          return current;
      }
    });
  }, []);

  // Handle phase transitions
  useEffect(() => {
    if (phase === 'initialization') {
      const timer = setTimeout(advancePhase, 1500);
      return () => clearTimeout(timer);
    }
    
    if (phase === 'countdown') {
      const timer = setTimeout(advancePhase, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, advancePhase]);

  // Handle progress during launch phase
  useEffect(() => {
    if (phase === 'launch') {
      let progressValue = 0;
      const interval = setInterval(() => {
        if (progressValue >= 100) {
          clearInterval(interval);
          onComplete();
          return;
        }
        progressValue += 2;
        setProgress(progressValue);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  return { phase, progress };
}