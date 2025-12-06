import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight, Github, Linkedin } from "lucide-react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import devAnimation from "../assets/Developer.json";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText =
    "I make machines smarter — and occasionally myself dumber in the process. Still figuring out who’s learning faster.";
  // ✍️ Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) clearInterval(interval);
    }, 40); // Slightly faster typing speed
    return () => clearInterval(interval);
  }, []);

  // 🌌 Particle background logic
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

    const animate = () => {
      if (!isVisible) {
        rafId = requestAnimationFrame(animate);
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
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)"); // Cyan-400
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

      rafId = requestAnimationFrame(animate);
    };

    const onVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    rafId = requestAnimationFrame(animate);

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

  // 🌀 Tilt and floating animation for Lottie
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
      tiltX = x * 15; // Increased tilt slightly
      tiltY = y * 15;
    };

    const animate = () => {
      frame += 0.02;
      floatY = Math.sin(frame) * 8; 

      el.style.transform = `
        perspective(1000px)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
        translateY(${floatY}px)
        scale(1.05)
      `;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between h-full">
        
        {/* --- Left Text Content --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 text-left space-y-6 md:pr-10 mt-12 md:mt-0"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 font-mono text-sm mb-2 backdrop-blur-md">
            👋 Hello, I am
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none text-white font-mono">
            Arya <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
              Sadawrate
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl text-slate-300 font-light">
            <span className="font-semibold text-cyan-400">AI/ML Student</span> & Developer
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed max-w-xl h-14 md:h-auto">
            {displayText}
            <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="group px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 flex items-center justify-center gap-2"
            >
              View Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex gap-4 items-center justify-center sm:justify-start">
              <a
                href="https://github.com/aryasadawrate19"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 border border-slate-700 rounded-lg hover:border-cyan-500 hover:bg-slate-800/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/arya-sadawrate-894a0a305"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 border border-slate-700 rounded-lg hover:border-blue-500 hover:bg-slate-800/50 text-slate-300 hover:text-blue-400 transition-all duration-300 backdrop-blur-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* --- Right Lottie Animation --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          ref={lottieRef}
          className="md:w-1/2 flex justify-center items-center perspective-container will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
             {/* Glow effect behind the animation */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />
            
            <Lottie
              animationData={devAnimation}
              loop={true}
              className="w-full h-full relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}