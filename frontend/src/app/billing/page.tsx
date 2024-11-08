import React from 'react';
import AuthWrapper from '@app/AuthWrapper';

export default function Billing() {
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600">Billing Page</h1>
        <p className="mt-4 text-xl">This is a sample billing page.</p>
      </div>
    </AuthWrapper>
  );
}
