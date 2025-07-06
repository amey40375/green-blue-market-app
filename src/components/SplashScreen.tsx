
import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);

  useEffect(() => {
    // Animate logo appearance
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Animate slogan appearance
    const sloganTimer = setTimeout(() => {
      setShowSlogan(true);
    }, 1500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(sloganTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#002D62] via-[#004080] to-[#00B894] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-12 w-8 h-8 bg-white/25 rounded-full animate-bounce delay-500"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className={`mb-8 transform transition-all duration-1000 ${
          showLogo 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-white drop-shadow-lg animate-pulse">ARVIN</span>
            <span className="text-[#00FFC2] drop-shadow-lg animate-pulse delay-300">trade</span>
          </h1>
          
          {/* Logo decoration */}
          <div className="flex justify-center items-center mt-4">
            <div className="w-16 h-1 bg-gradient-to-r from-white to-[#00FFC2] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#00FFC2] rounded-full mx-3 animate-bounce"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-white to-[#00FFC2] rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Slogan */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          showSlogan 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-5 opacity-0'
        }`}>
          <p className="text-white/90 text-lg font-medium leading-relaxed max-w-xs mx-auto drop-shadow-md">
            Tempatnya Jual Beli Aman
            <br />
            <span className="text-[#00FFC2] font-semibold">No Tipu Tipu</span>
          </p>
        </div>

        {/* Loading indicator */}
        <div className={`mt-12 transform transition-all duration-500 delay-1000 ${
          showSlogan ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-white/60 text-sm mt-3 font-medium">Memuat aplikasi...</p>
        </div>
      </div>

      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-700"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#00FFC2] rounded-full animate-ping delay-1200"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-[#00FFC2] rounded-full animate-ping delay-900"></div>
    </div>
  );
};

export default SplashScreen;
