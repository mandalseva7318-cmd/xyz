import React, { useState } from 'react';
import { Download, X, AlertCircle, Loader2, ArrowDown } from 'lucide-react';
import { ImageFile } from '../../types';
import { formatBytes, getSavingsPercent } from '../../utils/compression';
import { downloadSingle } from '../../utils/download';

interface ImageCardProps {
  image: ImageFile;
  onRemove: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onRemove }) => {
  const [imgError, setImgError] = useState(false);

  const savings = image.compressedSize != null
    ? getSavingsPercent(image.originalSize, image.compressedSize)
    : 0;

  const getSavingsColor = (pct: number) => {
    if (pct >= 60) return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (pct >= 30) return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (pct > 0) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { text: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200' };
  };

  const colors = getSavingsColor(savings);

  return (
    <div
      className="bg-white border border-[#DADADA] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group animate-fadeIn flex flex-col"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      {/* Image Preview */}
      <div className="relative bg-[#F5F5F5] aspect-[4/3] overflow-hidden">
        {!imgError ? (
          <img
            src={image.compressedUrl || image.previewUrl}
            alt={image.file.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#CCC]">
            <div className="text-center">
              <div className="text-4xl mb-1">🖼️</div>
              <span className="text-xs">Preview unavailable</span>
            </div>
          </div>
        )}

        {/* Status overlay */}
        {image.status === 'compressing' && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-[#0066CC] animate-spin" />
            <div className="w-3/4">
              <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0066CC] rounded-full transition-all duration-300"
                  style={{ width: `${image.progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-[#666] mt-1">{image.progress}%</p>
            </div>
          </div>
        )}

        {/* Done badge */}
        {image.status === 'done' && savings > 0 && (
          <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${colors.text} ${colors.bg} ${colors.border}`}>
            <ArrowDown className="w-3 h-3" />
            {savings}% smaller
          </div>
        )}

        {/* Remove button */}
        <button
          onClick={() => onRemove(image.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-red-50 border border-[#DADADA] hover:border-red-300 rounded-full flex items-center justify-center text-[#999] hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Remove image"
          title="Remove"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {/* File name */}
        <p className="text-xs font-medium text-[#333] truncate" title={image.file.name}>
          {image.file.name}
        </p>

        {/* Size Info */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex-1">
            <div className="text-[#999] text-[10px] uppercase tracking-wide">Original</div>
            <div className="font-semibold text-[#444]">{formatBytes(image.originalSize)}</div>
          </div>

          {image.status === 'done' && image.compressedSize != null && (
            <>
              <div className="text-[#DADADA]">→</div>
              <div className="flex-1">
                <div className="text-[#999] text-[10px] uppercase tracking-wide">Compressed</div>
                <div className={`font-bold ${colors.text}`}>{formatBytes(image.compressedSize)}</div>
              </div>
            </>
          )}

          {image.status === 'idle' && (
            <div className="flex-1 text-right">
              <span className="text-[10px] text-[#BBB] uppercase tracking-wide">Awaiting</span>
            </div>
          )}

          {image.status === 'error' && (
            <div className="flex-1 text-right">
              <span className="text-[10px] text-red-400 uppercase tracking-wide">Error</span>
            </div>
          )}
        </div>

        {/* Progress bar (idle state) */}
        {image.status === 'idle' && (
          <div className="h-1 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div className="h-full w-0 bg-[#0066CC] rounded-full" />
          </div>
        )}

        {/* Done progress bar */}
        {image.status === 'done' && (
          <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(5, 100 - savings)}%`,
                background: savings >= 60 ? '#22c55e' : savings >= 30 ? '#0066CC' : '#f59e0b',
              }}
            />
          </div>
        )}

        {/* Status / Action */}
        <div className="mt-auto pt-1">
          {image.status === 'done' && (
            <button
              onClick={() => downloadSingle(image)}
              className="w-full flex items-center justify-center gap-1.5 bg-[#0066CC] hover:bg-[#0052A3] text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          )}

          {image.status === 'error' && (
            <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-2 py-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{image.error || 'Compression failed'}</span>
            </div>
          )}

          {image.status === 'idle' && (
            <div className="flex items-center gap-1.5 text-xs text-[#AAA] py-1.5">
              <div className="w-1.5 h-1.5 bg-[#DDD] rounded-full" />
              Ready to compress
            </div>
          )}

          {image.status === 'compressing' && (
            <div className="flex items-center gap-1.5 text-xs text-[#0066CC] py-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Compressing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
