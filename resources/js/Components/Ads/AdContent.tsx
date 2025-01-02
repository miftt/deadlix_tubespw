import { Sparkles } from 'lucide-react';

interface AdContentProps {
  imageUrl: string;
}

export default function AdContent({ imageUrl }: AdContentProps) {
  return (
    <div className="relative h-full">
      <img 
        src={imageUrl} 
        alt="Advertisement"
        className="w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="animate-fade-in-up">
            <Sparkles className="w-12 h-12 text-amber-400 mb-4 animate-pulse" />
            <h2 className="text-4xl font-bold mb-4 text-center">
              Unlock Premium Experience
            </h2>
            <p className="text-xl mb-8 text-gray-300 text-center max-w-lg">
              Enjoy ad-free streaming, exclusive content, and more!
            </p>
            <div className="flex justify-center">
              <a 
                href="/premium" 
                className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg overflow-hidden transition-all duration-300 hover:from-red-500 hover:to-red-600"
              >
                <span className="absolute inset-0 w-full h-full bg-black/20 transform translate-y-full transition-transform group-hover:translate-y-0"></span>
                <span className="relative">Get Premium Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}