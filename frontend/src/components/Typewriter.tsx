'use client';

import React from 'react';
import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 50,
  onComplete,
}) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    if (currentText.length < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentText.length]);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentText, text, speed, onComplete]);

  return <span>{currentText}</span>;
};

export default Typewriter;
