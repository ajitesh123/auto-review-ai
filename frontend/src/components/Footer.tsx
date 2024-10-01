import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-2">
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
