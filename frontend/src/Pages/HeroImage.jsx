import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-realistic-technology-particle-background_52683-33063.jpg')",
      }}
    >
  
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

     
      <div className="relative text-center text-white px-4 sm:px-6 md:px-8 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 animate-fadeIn">
          Tech Talks
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-10 opacity-90">
          Join the future of technology discussions 🚀
        </p>

      
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium rounded-2xl bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
