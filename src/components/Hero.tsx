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

  // ✍️ Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // 🌌 REINSTATED: Original Sophisticated Particle logic
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

    const nodeCount = 45;
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
    canvas.addEventListener("pointermove", onPointerMove);

    let rafId = 0;
    let isVisible = document.visibilityState === "visible";

    const animateParticles = () => {
      if (!isVisible) {
        rafId = requestAnimationFrame(animateParticles);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        const dxm = mouseX - node.x;
        const dym = mouseY - node.y;
        const distToMouse2 = dxm * dxm + dym * dym;

        // Mouse repulsion
        if (distToMouse2 < 200 * 200) {
          node.x -= dxm * 0.003;
          node.y -= dym * 0.003;
        }

        if (node.x < 0 || node.x > window.innerWidth) node.vx *= -1;
        if (node.y < 0 || node.y > window.innerHeight) node.vy *= -1;

        const pulseSize = 2 + Math.sin(node.pulse) * 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize);
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist2 = dx * dx + dy * dy;
          const maxDist = 180;
          const maxDist2 = maxDist * maxDist;
          if (dist2 < maxDist2) {
            const opacity = 0.2 * (1 - dist2 / maxDist2);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(animateParticles);
    };

    const onVisibility = () => { isVisible = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", onVisibility);
    rafId = requestAnimationFrame(animateParticles);

    const handleResize = () => {
      setCanvasSize();
      nodes.forEach((n) => {
        n.x = Math.min(n.x, window.innerWidth);
        n.y = Math.min(n.y, window.innerHeight);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // 🌀 REINSTATED: Original Tilt and Floating loop for Lottie
  useEffect(() => {
    const el = lottieRef.current;
    if (!el) return;

    let tiltX = 0;
    let tiltY = 0;
    let floatY = 0;
    let frame = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;
      tiltX = x * 15;
      tiltY = y * 15;
    };

    const animateLottie = () => {
      frame += 0.02;
      floatY = Math.sin(frame) * 10; 

      el.style.transform = `
        perspective(1000px)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
        translateY(${floatY}px)
      `;
      requestAnimationFrame(animateLottie);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const rafId = requestAnimationFrame(animateLottie);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      
      {/* 1. The Particle Web Canvas (Neural Network) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* 2. The Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.12]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
          backgroundSize: '45px 45px' 
        }} 
      />
      
      {/* 3. Vignette Fade for Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_95%)] z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between">
        
        {/* --- LEFT: Content --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 font-mono text-xs mb-6 backdrop-blur-sm uppercase tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
            System Online
          </div>

          <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter leading-[0.85] text-white uppercase">
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
              <span className="inline-block w-1.5 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-cyan-400 transition-all flex items-center gap-2">
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
          ref={lottieRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.15 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center mt-16 md:mt-0 relative will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Cyan Glow */}
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full" />
          
          <div className="w-full max-w-[580px] relative z-10 filter contrast-[1.05] drop-shadow-2xl">
            <Lottie animationData={devAnimation} loop={true} className="w-full h-auto" />
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}