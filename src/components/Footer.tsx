export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-slate-500 text-sm font-mono">
          <span className="text-cyan-400">{'{'}</span>
          Built by Arya — still debugging life.
          <span className="text-cyan-400">{'}'}</span>
        </p>
        <p className="text-slate-600 text-xs mt-2">
          Powered by caffeine, bad variable names, and mild existential dread.
        </p>
      </div>
    </footer>
  );
}
