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
    {href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-sm border-b border-slate-800"
          : "bg-transparent"
      }`}
    >
      {/* Full-width container for proper edge alignment */}
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3">
        {/* === LEFT: LOGO / NAME === */}
        <a href="/" className="flex items-center gap-3 group">
        <img
            src="/photo.jpg"
            alt="Arya Sadawrate"
            className="w-14 h-14 rounded-full object-cover border border-cyan-500/40 shadow-md shadow-cyan-500/40 transition-transform group-hover:scale-105"
        />
        <span className="text-slate-100 font-semibold tracking-wide font-mono text-lg group-hover:text-cyan-400 transition-colors">
            Arya
        </span>
        </a>


        {/* === RIGHT: NAV LINKS + RESUME BUTTON === */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                {link.label}
              </a>
            ))}

            {/* === Resume Button with Glow === */}
            <a
              href="/Aarya_Sadawrate_VIT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-cyan-500 text-cyan-400 font-mono text-sm
                transition-all duration-300
                hover:text-slate-900
                hover:bg-cyan-400
                hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]
                shadow-[0_0_6px_rgba(34,211,238,0.3)]
                hover:scale-105"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU === */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full px-4 py-4 border-t border-slate-800 bg-slate-950/90 backdrop-blur-sm">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-slate-300 hover:text-cyan-400 transition-colors font-mono text-sm py-2"
              >
                {link.label}
              </a>
            ))}

            {/* === Mobile Resume Button with Glow === */}
            <a
              href="/Aarya_Sadawrate_VIT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-cyan-400 border border-cyan-500/40 rounded-md px-4 py-2 text-center
                hover:bg-cyan-500/10
                hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]
                transition-all font-mono text-sm"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
