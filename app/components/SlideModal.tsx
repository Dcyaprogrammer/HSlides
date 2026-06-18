'use client';

import React, { useCallback, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn, copyToClipboard } from '@/lib/utils';
import { ActionButton } from './ActionButton';

interface Slide {
  id: string;
  title: string;
  sourceUrl: string;
  githubUrl: string;
  prompt?: string;
}

interface SlideModalProps {
  slide: Slide | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SlideModal({ slide, isOpen, onClose }: SlideModalProps) {
  const handleCopyPrompt = useCallback(async () => {
    if (!slide?.prompt) return;

    const success = await copyToClipboard(slide.prompt);
    if (success) {
      // You could add a toast notification here
      console.log('Prompt copied to clipboard');
    }
  }, [slide]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!slide || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border-4 border-black shadow-brutal-lg max-w-5xl w-full p-6 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 border-2 border-black bg-yellow hover:shadow-brutal"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 pr-12">
          {slide.title}
        </h2>

        {/* Iframe container */}
        <div className="aspect-video border-3 border-black bg-gray-100 mb-6">
          <iframe
            src={slide.sourceUrl}
            className="w-full h-full"
            title={slide.title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>

        {/* Action buttons grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionButton
            href={slide.sourceUrl}
            variant="cyan"
          >
            View Full
          </ActionButton>

          <ActionButton
            href={slide.githubUrl}
            variant="pink"
          >
            GitHub
          </ActionButton>

          {slide.prompt && (
            <ActionButton
              onClick={handleCopyPrompt}
              variant="lime"
            >
              Copy Prompt
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
}
