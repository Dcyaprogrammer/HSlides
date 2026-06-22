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
  colorVariant: 'aurora-1' | 'aurora-2' | 'aurora-3';
}

export function SlideCard({ slide, onClick, colorVariant }: SlideCardProps) {
  const gradientClasses = {
    'aurora-1': 'bg-aurora-1',
    'aurora-2': 'bg-aurora-2',
    'aurora-3': 'bg-aurora-3',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'card-brutal gradient-card cursor-pointer p-5',
        gradientClasses[colorVariant],
        'group hover:z-10'
      )}
    >
      <div className="relative z-10 aspect-video mb-3 overflow-hidden border-[2px] border-black bg-white">
        <Image
          src={slide.thumbnail}
          alt={slide.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-700 transition-colors">
          {slide.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {slide.description}
        </p>
      </div>
    </div>
  );
}
