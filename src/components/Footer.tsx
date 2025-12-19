// src/components/Footer.tsx
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/aryasadawrate19', 
      icon: Github 
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/arya-sadawrate-894a0a305/', 
      icon: Linkedin 
    },
    { 
      label: 'X/Twitter', 
      href: 'https://github.com/aryasadawrate19', 
      icon: Twitter 
    }
  ];

  return (
    <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* === BRANDING & LEGAL-ISH === */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="h-1 w-1 bg-cyan-500" />
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
              &copy; {currentYear} Arya Sadawrate // Build_v1.0.4
            </p>
          </div>
          <p className="text-slate-700 text-[9px] font-mono uppercase tracking-widest ml-3">
            Powered by caffeine and mild existential dread.
          </p>
        </div>
        
        {/* === SOCIAL UPLINKS === */}
        <div className="flex gap-8">
          {socialLinks.map((platform) => (
            <a 
              key={platform.label} 
              href={platform.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <platform.icon className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 transition-colors" />
              <span className="text-slate-600 group-hover:text-white text-[9px] font-mono uppercase tracking-[0.2em] transition-colors">
                {platform.label}
              </span>
            </a>
          ))}
        </div>

      </div>
      
      {/* FINAL SYSTEM INDICATOR */}
      <div className="mt-12 flex justify-center opacity-20">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>
    </footer>
  );
}