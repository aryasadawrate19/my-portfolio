import { Gamepad2, Code2, Globe, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white mb-16 tracking-tighter"
        >
          SYSTEM<span className="text-slate-500">_MANIFEST</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Intro (The Developer) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-slate-900/20 border border-slate-800 p-8 rounded-sm hover:border-slate-600 transition-colors group relative overflow-hidden"
          >
             <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 bg-cyan-500" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Core Architecture</span>
             </div>
             <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">The Developer</h3>
             <p className="text-slate-400 leading-relaxed text-lg font-light">
               I build things that make machines slightly less clueless. My work sits somewhere between clean math and messy human behaviour — and I enjoy that awkward intersection far too much.
             </p>
          </motion.div>

          {/* Box 2: Location (The Terminal Style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 border border-slate-800 p-8 rounded-sm flex flex-col items-center justify-center text-center relative group overflow-hidden"
          >
             <Globe className="w-10 h-10 text-cyan-500 mb-4 group-hover:rotate-12 transition-transform duration-500" />
             <h3 className="text-white font-bold tracking-tight">Pune, India</h3>
             <p className="text-slate-500 font-mono text-[10px] uppercase mt-2 tracking-widest">Base of Operations</p>
             <div className="mt-4 pt-4 border-t border-slate-800 w-full">
                <span className="text-slate-600 font-mono text-[9px]">COORD: 18.5204° N, 73.8567° E</span>
             </div>
          </motion.div>

          {/* Box 3: Stack (Vertical) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="row-span-2 bg-slate-900/20 border border-slate-800 p-8 rounded-sm flex flex-col justify-between group hover:border-cyan-500/30 transition-all"
          >
             <div>
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-sm flex items-center justify-center mb-6">
                   <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Full Stack + AI</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                   I don't just build models; I build the infrastructure that serves them. From <span className="text-cyan-400">React</span> frontends to <span className="text-cyan-400">Flask</span> backends.
                </p>
             </div>
             
             <div className="flex flex-wrap gap-2 mt-8">
                {['ML', 'GenAI', 'DevEng'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded-sm text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
             </div>
          </motion.div>

          {/* Box 4: Gaming / Interest (Kept the Humor) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/20 border border-slate-800 p-8 rounded-sm hover:border-purple-500/30 transition-colors group relative overflow-hidden"
          >
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 tracking-tight">
                <Zap className="w-4 h-4 text-purple-400" />
                Offline Mode
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed font-light">
                When I’m not poking at code, I’m either neck-deep in some story game or heroically losing ten matches in a row in <span className="text-purple-400">Chess</span> or <span className="text-purple-400">Valorant</span> to people who allegedly have lives. And if not that, I’m off playing <span className="text-purple-400">basketball</span>, pretending that last brick was absolutely tactical.
             </p>
          </motion.div>

          {/* Box 5: Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/20 border border-slate-800 p-8 rounded-sm flex items-center justify-between group hover:border-emerald-500/30 transition-all"
          >
             <div>
                <h3 className="text-4xl font-bold text-white tracking-tighter">04+</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Deployments</p>
             </div>
             <div className="w-12 h-12 bg-slate-800 rounded-sm flex items-center justify-center">
                <Cpu className="w-6 h-6 text-emerald-500" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}