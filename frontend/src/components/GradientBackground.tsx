import React from 'react';
import { isPerfReviewType } from '@constants/common';

const GradientColor = {
  perfReview: {
    fromColor: '#ff80b5',
    toColor: '#9089fc',
  },
  selfReview: {
    fromColor: '#bbf7d0',
    toColor: '#166534',
  },
};

const GradientBackground = React.memo(
  ({ reviewType }: { reviewType: string }) => {
    return (
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center opacity-5"
        />
      </div>
    );
  }
);

GradientBackground.displayName = 'GradientBackground';

export default GradientBackground;
