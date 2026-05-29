import React, { useState, useEffect } from 'react';
import { AlertCircle, X, Info } from 'lucide-react';

import Header from './components/Header/Header';
import Toolbar from './components/Toolbar/Toolbar';
import UploadZone from './components/Upload/UploadZone';
import AddMoreButton from './components/Upload/AddMoreButton';
import ImageCard from './components/Cards/ImageCard';
import StatsBanner from './components/Cards/StatsBanner';
import BottomActionBar from './components/Buttons/BottomActionBar';
import Footer from './components/Footer/Footer';
import AdBanner from './components/Ads/AdBanner';
import ContentSection from './components/SEO/ContentSection';
import Toast from './components/Notifications/Toast';

import { useCompression } from './hooks/useCompression';
import { CompressionSettings } from './types';

const DEFAULT_SETTINGS: CompressionSettings = {
  mode: 'slider',
  slider: { quality: 60 },
  size: { targetSize: 100, targetUnit: 'KB' },
};

const App: React.FC = () => {
  const {
    images,
    isCompressing,
    errors,
    addFiles,
    removeImage,
    deleteAll,
    compressAll,
    dismissErrors,
  } = useCompression();

  const [settings, setSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
  const [showTip, setShowTip] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [prevCompressing, setPrevCompressing] = useState(false);

  const hasImages = images.length > 0;

  const handleCompressAll = () => {
    compressAll(settings);
  };

  // Show toast when compression finishes
  useEffect(() => {
    if (prevCompressing && !isCompressing) {
      const done = images.filter(i => i.status === 'done').length;
      const failed = images.filter(i => i.status === 'error').length;
      if (done > 0) {
        setToast({
          message: `${done} image${done !== 1 ? 's' : ''} compressed successfully!${failed > 0 ? ` (${failed} failed)` : ''}`,
          type: done > 0 ? 'success' : 'error',
        });
      }
    }
    setPrevCompressing(isCompressing);
  }, [isCompressing]);

  // Dismiss tip after first compression
  useEffect(() => {
    if (isCompressing) setShowTip(false);
  }, [isCompressing]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
      <Header />

      {/* Toast notifications */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {/* Top Ad Banner */}
      <div className="py-3 px-4 sm:px-6 bg-white border-b border-[#DADADA]">
        <AdBanner size="leaderboard" />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-5 sm:py-6 space-y-4">

        {/* Page Title */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#222] tracking-tight">
            Image Compressor
          </h1>
          <p className="text-sm text-[#666] mt-1">
            Compress JPG, PNG, WEBP, GIF, BMP online — free, fast, and secure.
          </p>
        </div>

        {/* Error alerts */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              {errors.map((err, i) => (
                <p key={i} className="text-sm text-red-700">{err}</p>
              ))}
            </div>
            <button
              onClick={dismissErrors}
              className="w-6 h-6 flex items-center justify-center rounded-full text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
              aria-label="Dismiss errors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tip banner */}
        {showTip && !hasImages && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3 animate-fadeIn">
            <Info className="w-4 h-4 text-[#0066CC] shrink-0" />
            <p className="text-xs text-[#0066CC] flex-1">
              <strong>Tip:</strong> Use <strong>Slider Mode</strong> at 60% for the best balance of quality and compression. Or use <strong>Target Size</strong> to compress to an exact file size.
            </p>
            <button
              onClick={() => setShowTip(false)}
              className="w-5 h-5 flex items-center justify-center rounded-full text-blue-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main grid: Toolbar + Workspace */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Left: Toolbar */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4">
            <Toolbar
              settings={settings}
              onSettingsChange={setSettings}
              onCompressAll={handleCompressAll}
              onDeleteAll={deleteAll}
              hasImages={hasImages}
              isCompressing={isCompressing}
            />

            {/* Info box */}
            <div className="bg-white border border-[#DADADA] rounded-xl p-4 space-y-2.5">
              <h3 className="text-xs font-bold text-[#222] uppercase tracking-wider">Supported Formats</h3>
              <div className="flex flex-wrap gap-1.5">
                {['JPG', 'JPEG', 'PNG', 'WEBP', 'GIF', 'BMP'].map(fmt => (
                  <span key={fmt} className="text-[11px] font-semibold px-2 py-0.5 bg-[#F0F5FF] text-[#0066CC] border border-[#D6E4FF] rounded-md">
                    {fmt}
                  </span>
                ))}
              </div>
              <div className="border-t border-[#F0F0F0] pt-2.5 space-y-1.5 text-xs text-[#666]">
                <div className="flex justify-between">
                  <span>Max images:</span>
                  <span className="font-semibold text-[#333]">25 files</span>
                </div>
                <div className="flex justify-between">
                  <span>Max file size:</span>
                  <span className="font-semibold text-[#333]">25 MB each</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing:</span>
                  <span className="font-semibold text-green-600">In browser ✓</span>
                </div>
              </div>
            </div>

            {/* Compression quality guide */}
            <div className="bg-white border border-[#DADADA] rounded-xl p-4 space-y-2.5">
              <h3 className="text-xs font-bold text-[#222] uppercase tracking-wider">Quality Guide</h3>
              <div className="space-y-2">
                {[
                  { label: 'High Quality', range: '75–99%', color: 'bg-green-500', desc: 'Minimal compression' },
                  { label: 'Balanced', range: '50–74%', color: 'bg-blue-500', desc: 'Best for web' },
                  { label: 'Low Quality', range: '20–49%', color: 'bg-amber-500', desc: 'Max compression' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#333]">{item.label}</span>
                        <span className="text-[10px] text-[#999] font-mono">{item.range}</span>
                      </div>
                      <div className="text-[10px] text-[#AAA]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Ad */}
            <div className="hidden lg:block">
              <AdBanner size="rectangle" />
            </div>
          </div>

          {/* Right: Workspace */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* Stats Banner */}
            {images.some(img => img.status === 'done') && (
              <StatsBanner images={images} />
            )}

            {/* Upload zone or image grid */}
            {!hasImages ? (
              <UploadZone
                onFilesSelected={addFiles}
                imageCount={images.length}
                maxImages={25}
              />
            ) : (
              <div>
                {/* Image count header */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-[#666]">
                    <span className="font-semibold text-[#222]">{images.length}</span> image{images.length !== 1 ? 's' : ''} added
                    {images.filter(i => i.status === 'done').length > 0 && (
                      <span className="text-green-600 font-semibold">
                        {' '}· {images.filter(i => i.status === 'done').length} compressed
                      </span>
                    )}
                    {images.filter(i => i.status === 'error').length > 0 && (
                      <span className="text-red-500 font-semibold">
                        {' '}· {images.filter(i => i.status === 'error').length} failed
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#999]">{25 - images.length} slots remaining</p>
                </div>

                {/* Image grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      style={{ animationDelay: `${idx * 40}ms` }}
                      className="animate-fadeIn"
                    >
                      <ImageCard image={img} onRemove={removeImage} />
                    </div>
                  ))}

                  {/* Add More button */}
                  {images.length < 25 && (
                    <AddMoreButton
                      onFilesSelected={addFiles}
                      disabled={isCompressing}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Between sections Ad */}
        <AdBanner size="responsive" />

        {/* SEO Content */}
        <ContentSection />

      </main>

      {/* Bottom Action Bar (sticky) */}
      {hasImages && (
        <div className="sticky bottom-0 z-40">
          <BottomActionBar
            images={images}
            onFilesSelected={addFiles}
            onDeleteAll={deleteAll}
            isCompressing={isCompressing}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
