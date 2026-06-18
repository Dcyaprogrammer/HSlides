'use client';

import React, { useState } from 'react';
import slides from '@/data/slides.json';
import { SlideGrid } from './components/SlideGrid';
import { SlideModal } from './components/SlideModal';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sourceUrl: string;
  githubUrl: string;
  prompt?: string;
}

export default function HomePage() {
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  const selectedSlide = slides.find((s) => s.id === selectedSlideId) as Slide | undefined;

  const handleCloseModal = () => {
    setSelectedSlideId(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          HSlides
        </h1>
        <p className="text-xl text-gray-600">
          Discover beautiful HTML slide presentations from the community
        </p>
      </div>

      {/* Slide Grid */}
      <SlideGrid slides={slides} onSlideClick={setSelectedSlideId} />

      {/* Slide Modal */}
      <SlideModal
        slide={selectedSlide || null}
        isOpen={!!selectedSlideId}
        onClose={handleCloseModal}
      />
    </div>
  );
}
