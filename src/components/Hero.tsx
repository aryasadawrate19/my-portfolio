import { useEffect, useState, useRef } from "react";
import { ArrowRight, Github, Linkedin, ChevronDown } from "lucide-react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import devAnimation from "../assets/Developer.json";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const lottieRef = useRef<HTMLDivElement>(null);
  const fullText = "I build intelligent systems that sit at the awkward intersection of clean math and messy human behaviour.";

  // Typing animation logic
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Interactive 3D tilt effect
  useEffect(() => {
    const el = lottieRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      // Applies the tilt based on mouse position
      el.style.transform = `perspective(1000px) rotateX(${y * 12}deg) rotateY(${x * 12}deg)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Background blueprint grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Radial fade for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/20 to-slate-950 z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        
        {/* --- LEFT: Typography focus --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs mb-6">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            Available for intelligent builds
          </div>

          <h1 className="text-6xl md:text-[5rem] font-bold tracking-tighter leading-[0.85] text-white uppercase">
            ARYA <br />
            <span className="text-slate-500">SADAWRATE</span>
          </h1>

          <div className="mt-8 space-y-4">
            <h2 className="text-xl md:text-2xl text-cyan-400 font-mono flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-500/50" />
              AI/ML Engineer
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-light min-h-[60px]">
              {displayText}
              <span className="inline-block w-1.5 h-5 bg-cyan-500 ml-1 animate-pulse align-middle" />
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-cyan-400 transition-all duration-300 flex items-center gap-2 group"
            >
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex gap-2">
              <a href="https://github.com/aryasadawrate19" target="_blank" className="p-4 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/arya-sadawrate-894a0a305" target="_blank" className="p-4 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: Visual content --- */}
        <motion.div
          ref={lottieRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1.1, // Enlarged for the new model
            y: [0, -20, 0] // Smooth floating bobbing
          }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="md:w-1/2 flex justify-center mt-16 md:mt-0 relative will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Subtle background glow */}
          <div className="absolute w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full" />
          
          <div className="w-full max-w-[550px] relative z-10 filter contrast-[1.05]">
            <Lottie 
              animationData={devAnimation} 
              loop={true} 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}