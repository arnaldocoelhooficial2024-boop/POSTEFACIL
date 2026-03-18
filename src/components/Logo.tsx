import React from 'react';
import { Share2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-3xl' : 'text-5xl';
  const subtitleSize = size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-xs' : 'text-sm';
  const padding = size === 'sm' ? 'p-1.5' : size === 'md' ? 'p-2' : 'p-3';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`bg-gradient-to-br from-[#d4af37] to-[#e6c258] ${padding} rounded-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/20`}>
        <Share2 className={`${iconSize} text-black`} />
      </div>
      <div className="flex flex-col justify-center">
        <span className={`font-sans font-bold tracking-tight text-white ${titleSize} leading-none`}>
          PostaFácil
        </span>
        <span className={`font-serif italic text-[#d4af37] ${subtitleSize} tracking-[0.2em] uppercase mt-1`}>
          Beauty
        </span>
      </div>
    </div>
  );
}
