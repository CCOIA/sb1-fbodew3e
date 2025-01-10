import React from 'react';
import BenefitsContainer from './benefits/BenefitsContainer';
import IntegrationTimeline from './timeline/IntegrationTimeline';

export default function Benefits() {
  return (
    <section className="min-h-screen bg-black/50 backdrop-blur-sm relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BenefitsContainer />
        <IntegrationTimeline />
      </div>
    </section>
  );
}