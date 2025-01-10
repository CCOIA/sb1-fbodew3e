import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <MainLayout>
          <HomePage />
        </MainLayout>
      )}
    </AnimatePresence>
  );
}

export default App;