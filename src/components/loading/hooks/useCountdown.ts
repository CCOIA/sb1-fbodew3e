import { useState, useEffect } from 'react';

export function useCountdown(startFrom: number) {
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return count;
}