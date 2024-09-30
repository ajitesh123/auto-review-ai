import React from 'react';

export default function Header() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'Performance Review Appp';

  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-xl font-bold">{appName}</h1>
    </header>
  );
}
