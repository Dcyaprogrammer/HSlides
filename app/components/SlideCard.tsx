import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Slide {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SlideCardProps {
  slide: Slide;
  onClick: () => void;
  colorVariant: 'cyan' | 'pink' | 'lime' | 'violet' | 'yellow' | 'orange' | 'red';
}

export function SlideCard({ slide, onClick, colorVariant }: SlideCardProps) {
  const colorClasses = {
    cyan: 'from-cyan to-violet',
    pink: 'from-pink to-yellow',
    lime: 'from-lime to-orange',
    violet: 'from-violet to-cyan',
    yellow: 'from-yellow to-pink',
    orange: 'from-orange to-lime',
    red: 'from-red to-yellow',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'card-brutal cursor-pointer p-4',
        'group hover:z-10'
      )}
    >
      <div className="relative aspect-video mb-3 overflow-hidden border-3 border-black bg-gradient-to-br">
        <div
          className={cn(
            'absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity',
            colorClasses[colorVariant]
          )}
        />
        <Image
          src={slide.thumbnail}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700 transition-colors">
        {slide.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {slide.description}
      </p>
    </div>
  );
}
