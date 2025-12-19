// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left">
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Arya Sadawrate // Build_v1.0.4
          </p>
          <p className="text-slate-700 text-[9px] font-mono mt-1">
            Powered by caffeine and mild existential dread.
          </p>
        </div>
        
        <div className="flex gap-8">
          {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
            <a key={platform} href="#" className="text-slate-600 hover:text-cyan-500 text-[10px] font-mono uppercase tracking-widest transition-colors">
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}