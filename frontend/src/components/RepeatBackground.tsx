import React from 'react';
import Background from '@assets/icons/background.png';

const RepeatBackground = () => {
  return (
    <div
      className="fixed inset-0"
      style={{
        backgroundImage: `url(${Background.src})`,
        backgroundSize: '400px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 0.2,
        zIndex: -1,
      }}
    />
  );
};

export default RepeatBackground;
