import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight, Github, Linkedin } from "lucide-react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import devAnimation from "../assets/Developer.json";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText = "I build intelligent systems that sit at the intersection of clean math and messy human behaviour.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const setCanvasSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    // Reduce node count on mobile for performance
    const nodeCount = window.innerWidth < 768 ? 25 : 45;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      pulse: Math.random() * Math.PI * 2,
    }));

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("pointermove", onPointerMove);

    let rafId = 0;
    const animateParticles = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        const dxm = mouseX - node.x;
        const dym = mouseY - node.y;
        const distToMouse2 = dxm * dxm + dym * dym;

        if (distToMouse2 < 150 * 150) {
          node.x -= dxm * 0.003;
          node.y -= dym * 0.003;
        }

        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

        const pulseSize = 2 + Math.sin(node.pulse) * 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = 150;
          if (dist2 < maxDist * maxDist) {
            const opacity = 0.15 * (1 - dist2 / (maxDist * maxDist));
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.stroke();
          }
        }
      });
      rafId = requestAnimationFrame(animateParticles);
    };

    rafId = requestAnimationFrame(animateParticles);
    window.addEventListener("resize", setCanvasSize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-24 pb-12">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      
      <div className="absolute inset-0 z-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* --- LEFT: Content --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 font-mono text-[10px] mb-6 backdrop-blur-sm uppercase tracking-widest">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            System Online
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.1] md:leading-[0.85] text-white uppercase">
            ARYA <br className="hidden md:block" />
            <span className="text-slate-500">SADAWRATE</span>
          </h1>

          <div className="mt-6 md:mt-8 space-y-4">
            <h2 className="text-lg md:text-2xl text-cyan-400 font-mono flex items-center justify-center md:justify-start gap-3">
              <span className="hidden md:block h-px w-8 bg-cyan-500/50" />
              AI/ML Engineer
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-light min-h-[80px] md:min-h-[60px]">
              {displayText}
              <span className="inline-block w-1 h-4 bg-cyan-400 ml-1 animate-pulse" />
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#projects" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
              View Work <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex gap-2">
              <a href="https://github.com/aryasadawrate19" target="_blank" rel="noreferrer" className="p-4 border border-slate-800 text-slate-400 hover:text-white transition-all backdrop-blur-sm">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/arya-sadawrate-894a0a305" target="_blank" rel="noreferrer" className="p-4 border border-slate-800 text-slate-400 hover:text-white transition-all backdrop-blur-sm">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: 3D Lottie Content --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center order-1 md:order-2"
        >
          <div className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] relative">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full" />
            <Lottie animationData={devAnimation} loop={true} className="relative z-10 w-full h-auto" />
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 hidden md:block"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}