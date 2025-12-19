// src/components/Navigation.tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* === LEFT: PHOTO & NAME === */}
        <a href="/" className="flex items-center gap-4 group">
          <img
            src="/photo.jpg"
            alt="Arya Sadawrate"
            className="w-11 h-11 rounded-sm object-cover border border-slate-800 group-hover:border-cyan-500 transition-all duration-300 shadow-xl shadow-black/50"
          />
          <span className="text-white font-bold tracking-tighter text-xl group-hover:text-cyan-400 transition-colors uppercase">
            Arya
          </span>
        </a>

        {/* === RIGHT: NAV LINKS + RESUME === */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-mono text-slate-400 hover:text-white transition-all tracking-[0.2em] uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="/Aarya_Sadawrate_VIT.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-white text-black font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-cyan-400 transition-all"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* === MOBILE MENU === */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950 border-b border-slate-900 px-6 py-10 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 backdrop-blur-3xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-sm font-mono text-slate-400 hover:text-cyan-400 tracking-[0.3em] uppercase transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Aarya_Sadawrate_VIT.pdf"
            className="text-center py-4 border border-slate-800 text-white font-mono text-xs tracking-widest bg-slate-900/50"
          >
            RESUME.PDF
          </a>
        </div>
      )}
    </nav>
  );
}