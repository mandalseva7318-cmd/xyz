import React, { useRef } from 'react';
import { Upload, Trash2, Archive, CheckCircle2 } from 'lucide-react';
import { ImageFile } from '../../types';
import { downloadAllAsZip } from '../../utils/download';

interface BottomActionBarProps {
  images: ImageFile[];
  onFilesSelected: (files: File[]) => void;
  onDeleteAll: () => void;
  isCompressing: boolean;
}

const ACCEPTED_TYPES = '.jpg,.jpeg,.png,.webp,.gif,.bmp';

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  images,
  onFilesSelected,
  onDeleteAll,
  isCompressing,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const completedCount = images.filter(img => img.status === 'done').length;
  const hasCompleted = completedCount > 0;
  const hasImages = images.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDownloadZip = async () => {
    await downloadAllAsZip(images);
  };

  return (
    <div className="bg-white border-t border-[#DADADA] px-4 py-3 sm:py-3.5 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Select Images */}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED_TYPES}
            onChange={handleInputChange}
            className="hidden"
            aria-label="Select images"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isCompressing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 ${
              isCompressing
                ? 'border-[#DADADA] text-[#CCC] cursor-not-allowed bg-[#FAFAFA]'
                : 'border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white bg-white active:scale-[0.97]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Select Images</span>
            <span className="sm:hidden">Select</span>
          </button>

          {hasImages && (
            <span className="text-xs text-[#999]">
              {images.length} image{images.length !== 1 ? 's' : ''}
              {hasCompleted && (
                <span className="text-green-600 font-medium ml-1">
                  · {completedCount} compressed
                </span>
              )}
            </span>
          )}
        </div>

        {/* Right: Delete + Download ZIP */}
        <div className="flex items-center gap-2">
          {hasCompleted && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedCount} ready
            </div>
          )}

          <button
            onClick={onDeleteAll}
            disabled={!hasImages || isCompressing}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 ${
              !hasImages || isCompressing
                ? 'border-[#DADADA] text-[#CCC] cursor-not-allowed bg-[#FAFAFA]'
                : 'border-[#DADADA] text-[#666] hover:border-red-300 hover:text-red-500 hover:bg-red-50 active:scale-[0.97]'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete All</span>
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={!hasCompleted || isCompressing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              !hasCompleted || isCompressing
                ? 'bg-[#DADADA] text-[#999] cursor-not-allowed'
                : 'bg-[#0066CC] hover:bg-[#0052A3] text-white shadow-sm hover:shadow-md active:scale-[0.97]'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span>Download ZIP</span>
            {hasCompleted && (
              <span className="bg-white/25 text-white text-[10px] font-bold rounded px-1">
                {completedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomActionBar;
