import React from 'react';
import { CheckCircle2, Zap, Shield, Image, Download, Sliders } from 'lucide-react';

const ContentSection: React.FC = () => {
  return (
    <section className="bg-white border border-[#DADADA] rounded-xl p-6 space-y-8">
      {/* Main heading */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#222] mb-2">
          Free Online Image Compressor — Reduce File Size Instantly
        </h2>
        <p className="text-sm text-[#666] max-w-2xl mx-auto leading-relaxed">
          CompressPro AI is a powerful, browser-based image compression tool that lets you compress JPG, PNG, WEBP,
          GIF, and BMP images without any loss in visual quality — completely free, no login required.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: <Zap className="w-5 h-5 text-[#0066CC]" />,
            title: 'Lightning Fast Compression',
            desc: 'Compress images in seconds directly in your browser. No waiting for server uploads.',
          },
          {
            icon: <Shield className="w-5 h-5 text-[#0066CC]" />,
            title: '100% Private & Secure',
            desc: 'Your images never leave your device. All processing happens locally in your browser.',
          },
          {
            icon: <Image className="w-5 h-5 text-[#0066CC]" />,
            title: 'Multiple Formats Supported',
            desc: 'Compress JPG, PNG, WEBP, GIF, and BMP images with full format support.',
          },
          {
            icon: <Sliders className="w-5 h-5 text-[#0066CC]" />,
            title: 'Flexible Compression Modes',
            desc: 'Use slider mode for quality control or target size mode for exact file size goals.',
          },
          {
            icon: <Download className="w-5 h-5 text-[#0066CC]" />,
            title: 'Batch Download as ZIP',
            desc: 'Compress multiple images at once and download them all in a single ZIP file.',
          },
          {
            icon: <CheckCircle2 className="w-5 h-5 text-[#0066CC]" />,
            title: 'No Signup Required',
            desc: 'Start compressing immediately. No account, no login, completely free forever.',
          },
        ].map((feature, i) => (
          <div key={i} className="flex gap-3 p-4 bg-[#F8FBFF] rounded-lg border border-[#E8F0FB]">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-[#E8F0FB]">
              {feature.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#222] mb-0.5">{feature.title}</div>
              <div className="text-xs text-[#666] leading-relaxed">{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div>
        <h3 className="text-base font-bold text-[#222] mb-4">How to Compress Images Online</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Upload Images', desc: 'Click "Select Images" or drag & drop your JPG, PNG, or WEBP files.' },
            { step: '2', title: 'Choose Settings', desc: 'Use the slider to set quality (1–99%) or target a specific file size in KB/MB.' },
            { step: '3', title: 'Download Results', desc: 'Click "Compress All" then download individually or as a ZIP archive.' },
          ].map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {step.step}
              </div>
              <div>
                <div className="text-sm font-semibold text-[#222] mb-0.5">{step.title}</div>
                <div className="text-xs text-[#666] leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-base font-bold text-[#222] mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {[
            {
              q: 'Is it safe to compress images online?',
              a: 'Yes, completely. CompressPro AI processes all images locally in your browser using JavaScript. Your images are never uploaded to any server.',
            },
            {
              q: 'What image formats are supported?',
              a: 'We support JPG, JPEG, PNG, WEBP, GIF, and BMP formats. You can compress up to 25 images at once, each up to 25MB.',
            },
            {
              q: 'Will compression reduce image quality?',
              a: 'Our smart compression algorithm minimizes quality loss while maximizing size reduction. Use the slider at 60–80% for best balance of quality and file size.',
            },
            {
              q: 'Can I compress to a specific file size?',
              a: 'Yes! Use Target Size mode and select your desired output size in KB or MB. Perfect for email attachments or platform upload limits.',
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group border border-[#EBEBEB] rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between p-3.5 cursor-pointer text-sm font-semibold text-[#222] hover:bg-[#F8FBFF] transition-colors list-none">
                {faq.q}
                <span className="text-[#0066CC] group-open:rotate-45 transition-transform duration-200 text-lg leading-none ml-2">+</span>
              </summary>
              <div className="px-3.5 pb-3.5 text-xs text-[#666] leading-relaxed border-t border-[#EBEBEB] pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
