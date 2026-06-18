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

const colorVariants = ['cyan', 'pink', 'lime', 'violet', 'yellow', 'orange', 'red'] as const;

export function SlideGrid({ slides, onSlideClick }: SlideGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {slides.map((slide, index) => (
        <SlideCard
          key={slide.id}
          slide={slide}
          onClick={() => onSlideClick(slide.id)}
          colorVariant={colorVariants[index % colorVariants.length]}
        />
      ))}
    </div>
  );
}
