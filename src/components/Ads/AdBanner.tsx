import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  type?: 'banner' | 'rectangle' | 'socialbar';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  type = 'banner',
  className = '',
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = '';

    let script1 = document.createElement('script');
    let script2 = document.createElement('script');

    script1.type = 'text/javascript';
    script2.type = 'text/javascript';
    script2.async = true;

    // ===== Banner 728x90 =====
    if (type === 'banner') {
      script1.innerHTML = `
        atOptions = {
          'key' : '795271412decdf657de674f570ac8719',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      script2.src =
        'https://www.highperformanceformat.com/795271412decdf657de674f570ac8719/invoke.js';
    }

    // ===== Rectangle 300x250 =====
    if (type === 'rectangle') {
      script1.innerHTML = `
        atOptions = {
          'key' : '8c02732879151a6206994f68a0797cb4',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;

      script2.src =
        'https://www.highperformanceformat.com/8c02732879151a6206994f68a0797cb4/invoke.js';
    }

    // ===== Social Bar =====
    if (type === 'socialbar') {
      script1.innerHTML = `
        atOptions = {
          'key' : 'b59a237c119fdfb8c65afeb4da4f10cb',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;

      script2.src =
        'https://www.highperformanceformat.com/b59a237c119fdfb8c65afeb4da4f10cb/invoke.js';
    }

    adRef.current.appendChild(script1);
    adRef.current.appendChild(script2);
  }, [type]);

  const containerStyles = {
    banner: 'max-w-[728px] h-[90px]',
    rectangle: 'max-w-[300px] h-[250px]',
    socialbar: 'w-full h-[50px]',
  };

  return (
    <div
      className={`
        ${containerStyles[type]}
        w-full
        mx-auto
        overflow-hidden
        rounded-xl
        flex
        items-center
        justify-center
        ${className}
      `}
      aria-label="Advertisement"
    >
      <div ref={adRef} />
    </div>
  );
};

export default AdBanner;
