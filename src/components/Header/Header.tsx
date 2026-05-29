import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#DADADA] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center group-hover:bg-[#0052A3] transition-colors">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="font-bold text-[17px] text-[#222222] tracking-tight">CompressPro</span>
            <span className="font-bold text-[17px] text-[#0066CC] tracking-tight ml-0.5">AI</span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-[#444] hover:text-[#0066CC] transition-colors font-medium">Image Compressor</a>
          <a href="#" className="text-sm text-[#888] hover:text-[#0066CC] transition-colors">Image Converter</a>
          <a href="#" className="text-sm text-[#888] hover:text-[#0066CC] transition-colors">Image Resizer</a>
          <a href="#" className="text-sm text-[#888] hover:text-[#0066CC] transition-colors">More Tools</a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
            Free &amp; Secure
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
