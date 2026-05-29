import React from 'react';
import { TrendingDown, HardDrive, Files, Zap } from 'lucide-react';
import { ImageFile } from '../../types';
import { formatBytes, getSavingsPercent } from '../../utils/compression';

interface StatsBannerProps {
  images: ImageFile[];
}

const StatsBanner: React.FC<StatsBannerProps> = ({ images }) => {
  const completed = images.filter(img => img.status === 'done' && img.compressedSize != null);
  if (completed.length === 0) return null;

  const totalOriginal = completed.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressed = completed.reduce((sum, img) => sum + (img.compressedSize || 0), 0);
  const totalSavings = totalOriginal - totalCompressed;
  const avgSavings = getSavingsPercent(totalOriginal, totalCompressed);

  return (
    <div className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] rounded-xl p-4 text-white shadow-md animate-fadeIn">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 fill-white" />
        <span className="text-sm font-bold">Compression Summary</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/15 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Files className="w-3.5 h-3.5 opacity-80" />
          </div>
          <div className="text-xl font-bold">{completed.length}</div>
          <div className="text-[11px] opacity-80 mt-0.5">Images Compressed</div>
        </div>
        <div className="bg-white/15 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <HardDrive className="w-3.5 h-3.5 opacity-80" />
          </div>
          <div className="text-xl font-bold">{formatBytes(totalOriginal)}</div>
          <div className="text-[11px] opacity-80 mt-0.5">Original Size</div>
        </div>
        <div className="bg-white/15 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <HardDrive className="w-3.5 h-3.5 opacity-80" />
          </div>
          <div className="text-xl font-bold">{formatBytes(totalCompressed)}</div>
          <div className="text-[11px] opacity-80 mt-0.5">Compressed Size</div>
        </div>
        <div className="bg-white/15 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown className="w-3.5 h-3.5 opacity-80" />
          </div>
          <div className="text-xl font-bold text-green-300">{avgSavings}%</div>
          <div className="text-[11px] opacity-80 mt-0.5">Saved {formatBytes(totalSavings)}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
