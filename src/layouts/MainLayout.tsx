import React from 'react';
import Navbar from '../components/Navbar';
import SpaceBackground from '../components/background/SpaceBackground';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-black min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}