// src/components/Footer.tsx
import { Github, Linkedin } from 'lucide-react'; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      label: 'GitHub', 
      href: 'https://github.com/aryasadawrate19', 
      icon: <Github className="w-5 h-5 transition-all duration-300" />,
      hoverColor: 'group-hover:text-red-500' 
    },
    { 
      label: 'LinkedIn', 
      href: 'https://linkedin.com/in/arya-sadawrate-894a0a305/', 
      icon: <Linkedin className="w-5 h-5 transition-all duration-300" />,
      hoverColor: 'group-hover:text-cyan-400'
    },
    { 
      label: 'X / Twitter', 
      href: 'https://x.com/CalmChor12', 
      // Using custom SVG path for the actual X branding
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 fill-current transition-all duration-300" 
          aria-hidden="true"
        >
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
      hoverColor: 'group-hover:text-white'
    }
  ];

  return (
    <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* === BRANDING & SYSTEM LOGS === */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="h-1 w-1 bg-cyan-500" />
            <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
              &copy; {currentYear} Arya Sadawrate // Build_v1.0.4
            </p>
          </div>
          <p className="text-slate-700 text-[9px] font-mono uppercase tracking-widest ml-3 italic">
            Powered by caffeine and mild existential dread.
          </p>
        </div>
        
        {/* === SOCIAL UPLINKS === */}
        <div className="flex gap-10">
          {socialLinks.map((platform) => (
            <a 
              key={platform.label} 
              href={platform.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 transition-all"
            >
              <div className={`text-slate-600 ${platform.hoverColor} transition-all duration-300 transform group-hover:scale-110`}>
                {platform.icon}
              </div>
              <span className="text-slate-600 group-hover:text-slate-200 text-[9px] font-mono uppercase tracking-[0.2em] transition-colors">
                {platform.label}
              </span>
            </a>
          ))}
        </div>

      </div>
      
      {/* FINAL SYSTEM TERMINAL LINE */}
      <div className="mt-12 flex justify-center opacity-10">
        <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      </div>
    </footer>
  );
}