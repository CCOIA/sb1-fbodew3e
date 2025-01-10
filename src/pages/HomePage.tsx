import React from 'react';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import TestimonialsBanner from '../components/testimonials/TestimonialsBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <TestimonialsBanner />
    </>
  );
}