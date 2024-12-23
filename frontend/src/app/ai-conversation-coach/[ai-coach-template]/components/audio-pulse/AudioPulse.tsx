'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import c from 'classnames';

const lineCount = 3;

export type AudioPulseProps = {
  active: boolean;
  volume: number;
  hover?: boolean;
};

export default function AudioPulse({ active, volume, hover }: AudioPulseProps) {
  const lines = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let timeout: number | null = null;
    const update = () => {
      lines.current.forEach(
        (line, i) =>
          line?.style &&
          (line.style.height = `${Math.min(
            24,
            4 + volume * (i === 1 ? 400 : 60)
          )}px`)
      );
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => clearTimeout((timeout as number)!);
  }, [volume]);

  return (
    <div
      className={c(
        'flex w-6 justify-evenly items-center transition-all duration-500 h-1',
        'transition-opacity duration-300',
        {
          'opacity-100': active,
          'opacity-50': !active,
        }
      )}
    >
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              lines.current[i] = el;
            }}
            className={c(
              'bg-gradient-to-tr from-[#9c27b0] to-[#ff69b4]',
              'rounded-full w-1 min-h-1 transition-[height] duration-100',
              'bg-audio-200 animate-audio-gradient',
              { 'animate-hover': hover },
              active && 'bg-gradient-to-tr from-[#ff1493] to-[#9400d3]'
            )}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
