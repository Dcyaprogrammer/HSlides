import React from 'react';
import Link from 'next/link';
import { ActionButton } from './ActionButton';

export function Header() {
  return (
    <header className="border-b-[2px] border-black bg-white">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          <h1 className="font-semibold tracking-tight">HSLIDES</h1>
        </Link>

        <nav className="flex gap-4">
          <ActionButton variant="cyan" href="/about">
            About
          </ActionButton>
          <ActionButton
            variant="pink"
            href="https://github.com/Dcyaprogrammer/HSlides"
          >
            GitHub
          </ActionButton>
        </nav>
      </div>
    </header>
  );
}
