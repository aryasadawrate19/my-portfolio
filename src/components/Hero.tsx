import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Lottie from "lottie-react";
import devAnimation from "../assets/Developer.json";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText =
    "Building intelligent systems that understand more than they're told.";

  // ✍️ Typing animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 🌌 Particle background
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

      ctx.fillStyle = "rgba(15, 23, 42, 0.15)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

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
            const opacity = 0.3 * (1 - dist2 / maxDist2);
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
      tiltX = x * 12; // more responsive
      tiltY = y * 12;
    };

    const animate = () => {
      frame += 0.02;
      floatY = Math.sin(frame) * 10; // floating motion

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
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-between overflow-hidden pt-20 md:pt-0">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 z-0" />

      {/* --- Left Text --- */}
      <div className="relative z-10 md:w-1/2 px-8 text-left space-y-6">
        <div>
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight animate-gradient">
            Arya Sadawrate
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mt-2 rounded-full" />
        </div>

        <p className="text-cyan-400 text-lg font-mono">AI/ML Student | Developer</p>

        <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
          {displayText}
          <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
        </p>

        <div className="flex gap-4 pt-4">
          <a
            href="#projects"
            className="group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a
            href="#contact"
            className="group px-6 py-3 border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* --- Right Lottie Animation with tilt and float --- */}
      <div
        ref={lottieRef}
        className="relative z-10 md:w-1/2 flex justify-center items-center px-6 mt-12 md:mt-0 transition-transform duration-300 ease-out will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Lottie
          animationData={devAnimation}
          loop={true}
          className="w-[28rem] h-[28rem] drop-shadow-lg"
        />
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cyan-400 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
