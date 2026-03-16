import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false);
  const resumeMenuRef = useRef<HTMLDivElement>(null);

  const resumeOptions = [
    {
      href: "/Aarya_Sadawrate_VIT_CV.pdf",
      label: "SDE Resume",
      description: "Software engineering focus",
    },
    {
      href: "/Aarya_Sadawrate_VIT_GenAI.pdf",
      label: "GenAI Resume",
      description: "Generative AI focus",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isResumeMenuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(event.target as Node)) {
        setIsResumeMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsResumeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isResumeMenuOpen]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsResumeMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-900 py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* === LEFT: PHOTO & NAME === */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/photo.jpg"
              alt="Arya"
              className="w-10 h-10 rounded-sm object-cover border border-slate-800 group-hover:border-cyan-500 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-white font-bold tracking-tighter text-lg md:text-xl group-hover:text-cyan-400 transition-colors uppercase">
            Arya
          </span>
        </a>

        {/* === DESKTOP NAV === */}
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

          <div className="relative" ref={resumeMenuRef}>
            <button
              type="button"
              onClick={() => setIsResumeMenuOpen((open) => !open)}
              className="px-6 py-2.5 bg-white text-black font-bold text-[11px] tracking-[0.15em] uppercase hover:bg-cyan-400 transition-all"
              aria-haspopup="menu"
              aria-expanded={isResumeMenuOpen}
            >
              Resume
            </button>

            {isResumeMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 border border-slate-800 bg-slate-950/95 p-2 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
                {resumeOptions.map((resume) => (
                  <a
                    key={resume.href}
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsResumeMenuOpen(false)}
                    className="block border border-transparent px-4 py-3 text-left transition-all hover:border-cyan-500 hover:bg-slate-900"
                  >
                    <span className="block text-[11px] font-bold tracking-[0.18em] text-white uppercase">
                      {resume.label}
                    </span>
                    <span className="mt-1 block text-[10px] font-mono tracking-[0.14em] text-slate-400 uppercase">
                      {resume.description}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
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
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-900 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-10 flex flex-col gap-8 backdrop-blur-3xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 tracking-[0.3em] uppercase transition-colors"
            >
              <span className="text-cyan-500 mr-2 text-[10px]">//</span>
              {link.label}
            </a>
          ))}
          <div className="border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-center font-mono text-xs tracking-widest text-white">
              DOWNLOAD_RESUME.EXE
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {resumeOptions.map((resume) => (
                <a
                  key={resume.href}
                  href={resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="border border-slate-800 px-4 py-3 text-center font-mono text-[11px] tracking-[0.22em] text-slate-200 uppercase transition-colors hover:border-cyan-500 hover:text-white"
                >
                  {resume.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}