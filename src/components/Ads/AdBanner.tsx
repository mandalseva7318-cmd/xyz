import React from 'react';

interface AdBannerProps {
  size?: 'leaderboard' | 'rectangle' | 'responsive';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ size = 'responsive', className = '' }) => {
  const dimensions = {
    leaderboard: 'h-[90px] max-w-[728px]',
    rectangle: 'h-[250px] max-w-[300px]',
    responsive: 'h-[90px]',
  };

  return (
    <div
      className={`${dimensions[size]} w-full mx-auto bg-[#F9F9F9] border border-dashed border-[#DDD] rounded-lg flex items-center justify-center ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-center">
        <div className="text-[10px] uppercase tracking-widest text-[#CCC] font-medium">Advertisement</div>
        {/* Google AdSense code would go here */}
        {/* <ins className="adsbygoogle" ... /> */}
      </div>
    </div>
  );
};

export default AdBanner;
