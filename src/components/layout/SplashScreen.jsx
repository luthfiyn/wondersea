import { Loader2 } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyan-50 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center animate-slide-up">
        {/* Logo App */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-white/50 blur-xl rounded-full transform scale-110"></div>
          <img 
            src="/icon.png" 
            alt="WonderSea Logo" 
            className="relative w-32 h-32 object-contain drop-shadow-xl animate-float"
          />
        </div>

        {/* Nama App */}
        <h1 className="text-4xl font-extrabold text-cyan-900 tracking-tight mb-2 drop-shadow-sm font-sans">
          Wondersea
        </h1>
        
        {/* Tagline */}
        <p className="text-cyan-700/80 font-medium text-sm tracking-widest uppercase mb-8">
          Jelajahi Bahari Indonesia
        </p>

        {/* Loading Spinner */}
        <div className="flex items-center gap-2 text-cyan-600 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50">
          <Loader2 className="animate-spin" size={18} />
          <span className="text-xs font-bold">Loading</span>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="absolute bottom-8 text-cyan-800/40 text-xs font-mono">
        v1.0.0 • WonderSea Indonesia
      </div>
    </div>
  );
}