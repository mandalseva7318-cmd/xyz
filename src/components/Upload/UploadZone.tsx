import React, { useRef, useState, useCallback } from 'react';
import { ImagePlus, Upload, CloudUpload } from 'lucide-react';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  imageCount: number;
  maxImages?: number;
}

const ACCEPTED_TYPES = '.jpg,.jpeg,.png,.webp,.gif,.bmp';

const UploadZone: React.FC<UploadZoneProps> = ({
  onFilesSelected,
  imageCount,
  maxImages = 25,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const remaining = maxImages - imageCount;
      const arr = Array.from(files).slice(0, remaining);
      if (arr.length > 0) onFilesSelected(arr);
    },
    [onFilesSelected, imageCount, maxImages]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${
        isDragging
          ? 'border-[#0066CC] bg-blue-50 scale-[1.01]'
          : 'border-[#DADADA] bg-white hover:border-[#0066CC] hover:bg-[#F8FBFF]'
      }`}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload images"
      />

      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <div className={`absolute inset-0 transition-opacity duration-300 ${isDragging ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-8 left-8 w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-5 px-6 text-center relative z-10">
        {/* Main upload icon / button */}
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isDragging
              ? 'bg-[#0066CC] scale-110 shadow-blue-200 shadow-lg'
              : 'bg-[#0066CC] group-hover:bg-[#0052A3] group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-100'
          }`}
        >
          {isDragging ? (
            <CloudUpload className="w-10 h-10 text-white animate-bounce" />
          ) : (
            <ImagePlus className="w-10 h-10 text-white" />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#222]">
            {isDragging ? 'Drop images here!' : 'Add Images to Compress'}
          </h2>
          <p className="text-sm text-[#666] max-w-xs">
            {isDragging
              ? 'Release to upload your images'
              : 'Drag & drop images here, or click to select files'}
          </p>
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          className="flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
        >
          <Upload className="w-4 h-4" />
          Select Images
        </button>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#999]">
          <span>JPG · PNG · WEBP · GIF · BMP</span>
          <span>·</span>
          <span>Max 25 images · 25MB each</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
