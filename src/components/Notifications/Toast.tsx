import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-[#0066CC] text-white',
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 max-w-sm ${styles[type]} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <CheckCircle2 className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Toast;
