'use client';

import React, { useEffect } from 'react';
import AuthWrapper from '@app/AuthWrapper';

export default function About() {
  useEffect(() => {
    console.log('use effect called in about')
  }, [])
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-600">About Page</h1>
        <p className="mt-4 text-xl">This is a sample about page.</p>
      </div>
    </AuthWrapper>
  );
}
