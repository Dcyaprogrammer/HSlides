import React from 'react';
import { SlideCard } from './SlideCard';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SlideGridProps {
  slides: Slide[];
  onSlideClick: (id: string) => void;
}

const gradientVariants = ['aurora-1', 'aurora-2', 'aurora-3'] as const;

export function SlideGrid({ slides, onSlideClick }: SlideGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {slides.map((slide, index) => (
        <SlideCard
          key={slide.id}
          slide={slide}
          onClick={() => onSlideClick(slide.id)}
          colorVariant={gradientVariants[index % gradientVariants.length]}
        />
      ))}
    </div>
  );
}
