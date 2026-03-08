import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      
      <div className="relative z-10 w-full max-w-5xl px-6 py-12 md:py-24">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-2xl text-center flex flex-col items-center">
          
          
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full">
            The Community for Developers
          </span>

          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Tech Talks<span className="text-blue-500">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            The pulse of innovation. Connect, share, and discover the future of 
            technology discussions in a space built for enthusiasts.
          </p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate("/login")}
              className="group relative w-full sm:w-48 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-blue-500/40"
            >
              Start Reading
            </button>
            
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-48 px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Join the Hub
            </button>
          </div>

          
          
        </div>
      </div>

      
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
};

export default Hero;