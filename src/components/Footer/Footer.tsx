import React from 'react';
import { Zap, Shield, Globe, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#DADADA] mt-auto">
      {/* Features row */}
      <div className="border-b border-[#DADADA] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <Shield className="w-5 h-5 text-[#0066CC]" />, title: '100% Secure', desc: 'Processed in your browser' },
              { icon: <Zap className="w-5 h-5 text-[#0066CC]" />, title: 'Lightning Fast', desc: 'Compress in seconds' },
              { icon: <Globe className="w-5 h-5 text-[#0066CC]" />, title: 'No Login Required', desc: 'Free & instant access' },
              { icon: <Cpu className="w-5 h-5 text-[#0066CC]" />, title: 'AI Powered', desc: 'Smart compression engine' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#222]">{item.title}</div>
                  <div className="text-xs text-[#888] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0066CC] rounded-md flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-sm font-bold text-[#222]">CompressPro AI</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#888]">
            <a href="#" className="hover:text-[#0066CC] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#0066CC] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#0066CC] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#0066CC] transition-colors">Blog</a>
          </div>

          <p className="text-xs text-[#AAA]">
            © {new Date().getFullYear()} CompressPro AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
