import React, { useRef } from 'react';
import { Plus } from 'lucide-react';

interface AddMoreButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const ACCEPTED_TYPES = '.jpg,.jpeg,.png,.webp,.gif,.bmp';

const AddMoreButton: React.FC<AddMoreButtonProps> = ({ onFilesSelected, disabled }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full min-h-[160px] sm:min-h-[200px] rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer group ${
        disabled
          ? 'border-[#EBEBEB] bg-[#FAFAFA] cursor-not-allowed'
          : 'border-[#DADADA] bg-white hover:border-[#0066CC] hover:bg-[#F8FBFF]'
      }`}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
        aria-label="Add more images"
      />
      <div
        className={`w-14 h-14 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-200 ${
          disabled
            ? 'border-[#DDD] text-[#CCC]'
            : 'border-[#DADADA] text-[#AAA] group-hover:border-[#0066CC] group-hover:text-[#0066CC] group-hover:scale-110 group-hover:bg-blue-50'
        }`}
      >
        <Plus className="w-7 h-7" />
      </div>
      <span
        className={`mt-2.5 text-xs font-medium transition-colors ${
          disabled ? 'text-[#CCC]' : 'text-[#999] group-hover:text-[#0066CC]'
        }`}
      >
        Add More
      </span>
    </div>
  );
};

export default AddMoreButton;
