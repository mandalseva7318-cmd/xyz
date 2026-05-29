import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current) {
      const script1 = document.createElement('script');
      script1.type = 'text/javascript';
      script1.innerHTML = `
        atOptions = {
          'key' : '795271412decdf657de674f570ac8719',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const script2 = document.createElement('script');
      script2.type = 'text/javascript';
      script2.src =
        'https://www.highperformanceformat.com/795271412decdf657de674f570ac8719/invoke.js';
      script2.async = true;

      adRef.current.appendChild(script1);
      adRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div
      className={`
        w-full
        max-w-[728px]
        h-[90px]
        mx-auto
        overflow-hidden
        rounded-lg
        ${className}
      `}
      aria-label="Advertisement"
    >
      <div ref={adRef} />
    </div>
  );
};

export default AdBanner;
