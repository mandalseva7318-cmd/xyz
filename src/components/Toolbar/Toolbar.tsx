import React from 'react';
import { Info, Trash2, Zap } from 'lucide-react';
import { CompressionMode, CompressionSettings } from '../../types';

interface ToolbarProps {
  settings: CompressionSettings;
  onSettingsChange: (settings: CompressionSettings) => void;
  onCompressAll: () => void;
  onDeleteAll: () => void;
  hasImages: boolean;
  isCompressing: boolean;
}

const TARGET_SIZES = [10, 20, 30, 50, 75, 100, 150, 200, 300, 500, 750, 1000];
const TARGET_UNITS = ['KB', 'MB'] as const;

const Toolbar: React.FC<ToolbarProps> = ({
  settings,
  onSettingsChange,
  onCompressAll,
  onDeleteAll,
  hasImages,
  isCompressing,
}) => {
  const setMode = (mode: CompressionMode) => {
    onSettingsChange({ ...settings, mode });
  };

  const setQuality = (quality: number) => {
    onSettingsChange({ ...settings, slider: { quality } });
  };

  const setTargetSize = (targetSize: number) => {
    onSettingsChange({ ...settings, size: { ...settings.size, targetSize } });
  };

  const setTargetUnit = (targetUnit: 'KB' | 'MB') => {
    onSettingsChange({ ...settings, size: { ...settings.size, targetUnit } });
  };

  const getQualityLabel = (q: number) => {
    if (q >= 80) return 'High Quality';
    if (q >= 60) return 'Good Quality';
    if (q >= 40) return 'Medium Quality';
    if (q >= 20) return 'Low Quality';
    return 'Very Low';
  };

  const getSliderColor = (q: number) => {
    if (q >= 70) return '#22c55e';
    if (q >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-white border border-[#DADADA] rounded-xl shadow-sm overflow-hidden">
      {/* Mode Tabs */}
      <div className="flex border-b border-[#DADADA]">
        <button
          onClick={() => setMode('slider')}
          className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 ${
            settings.mode === 'slider'
              ? 'bg-[#0066CC] text-white'
              : 'bg-[#F5F5F5] text-[#555] hover:bg-[#EBEBEB]'
          }`}
        >
          Slider Mode
        </button>
        <button
          onClick={() => setMode('size')}
          className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 border-l border-[#DADADA] ${
            settings.mode === 'size'
              ? 'bg-[#0066CC] text-white'
              : 'bg-[#F5F5F5] text-[#555] hover:bg-[#EBEBEB]'
          }`}
        >
          Target Size
        </button>
      </div>

      <div className="p-4">
        {/* Slider Mode */}
        {settings.mode === 'slider' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#222]">Compression Level</span>
              <div className="relative group">
                <Info className="w-4 h-4 text-[#999] cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#222] text-white text-xs rounded-lg p-2.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                  Lower percentage = smaller file size but lower quality. Higher = better quality but larger file.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#222]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={1}
                  max={99}
                  value={settings.slider.quality}
                  onChange={e => setQuality(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${getSliderColor(settings.slider.quality)} 0%, ${getSliderColor(settings.slider.quality)} ${settings.slider.quality}%, #E5E7EB ${settings.slider.quality}%, #E5E7EB 100%)`,
                  }}
                />
              </div>
              <div className="flex items-center border border-[#DADADA] rounded-lg overflow-hidden">
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={settings.slider.quality}
                  onChange={e => {
                    const v = Math.min(99, Math.max(1, Number(e.target.value)));
                    setQuality(v);
                  }}
                  className="w-12 text-center text-sm font-bold text-[#222] py-1.5 outline-none border-none"
                />
                <span className="text-sm text-[#666] pr-2">%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{
                  color: getSliderColor(settings.slider.quality),
                  backgroundColor: getSliderColor(settings.slider.quality) + '18',
                }}
              >
                {getQualityLabel(settings.slider.quality)}
              </span>
              <div className="flex gap-1 text-xs text-[#999]">
                <span>Smaller</span>
                <span>←→</span>
                <span>Better</span>
              </div>
            </div>
          </div>
        )}

        {/* Size Mode */}
        {settings.mode === 'size' && (
          <div className="space-y-4">
            <span className="text-sm font-semibold text-[#222]">Compress image to target size</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#555]">Compress to</span>
              <select
                value={settings.size.targetSize}
                onChange={e => setTargetSize(Number(e.target.value))}
                className="flex-1 border border-[#DADADA] rounded-lg px-3 py-2 text-sm text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] cursor-pointer"
              >
                {TARGET_SIZES.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <select
                value={settings.size.targetUnit}
                onChange={e => setTargetUnit(e.target.value as 'KB' | 'MB')}
                className="border border-[#DADADA] rounded-lg px-3 py-2 text-sm text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-[#0066CC] cursor-pointer"
              >
                {TARGET_UNITS.map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-[#888]">
              Note: Target size compression may not be exact for very small targets.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onCompressAll}
            disabled={!hasImages || isCompressing}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              !hasImages || isCompressing
                ? 'bg-[#DADADA] text-[#999] cursor-not-allowed'
                : 'bg-[#0066CC] hover:bg-[#0052A3] text-white shadow-sm hover:shadow-md active:scale-[0.98]'
            }`}
          >
            <Zap className={`w-4 h-4 ${isCompressing ? 'animate-spin' : ''}`} />
            {isCompressing ? 'Compressing...' : 'Compress All'}
          </button>
          <button
            onClick={onDeleteAll}
            disabled={!hasImages || isCompressing}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-200 ${
              !hasImages || isCompressing
                ? 'border-[#DADADA] text-[#CCC] cursor-not-allowed'
                : 'border-[#DADADA] text-[#666] hover:border-red-300 hover:text-red-500 hover:bg-red-50 active:scale-[0.98]'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
