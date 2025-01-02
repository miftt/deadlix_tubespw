import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import AdTimer from '@/Components/Ads/AdTimer';
import AdContent from '@/Components/Ads/AdContent';

interface AdOverlayProps {
  onClose?: () => void;
  onFinish: () => void;
  duration?: number;
  type?: string;
  onCloseWatch?: () => void;
}

export default function AdOverlay({ onClose, onFinish, duration = 10, type, onCloseWatch }: AdOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-[60] backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 scale-100 animate-fade-in">
        <AdContent imageUrl="/images/loginbg.PNG" />

        <div className="absolute top-4 right-4 flex items-center gap-4">
          {!canSkip && (
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="text-white/90">Ad ends in</span>
              <AdTimer timeLeft={timeLeft} duration={duration} />
            </div>
          )}
          
          {canSkip ? (
            <button
              onClick={onFinish}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 px-6 py-2 rounded-lg flex items-center gap-2 text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              Skip Ad <X size={20} />
            </button>
          ) : (
            <button
              onClick={type === 'watch' ? onCloseWatch : onClose}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}