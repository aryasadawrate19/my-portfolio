import { Code2, Globe, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 md:mb-16 tracking-tighter"
        >
          SYSTEM<span className="text-slate-500">_MANIFEST</span>
        </motion.h2>

        {/* Grid: 1 column on mobile, 3 on medium screens+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* Box 1: Intro (The Developer) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-slate-900/20 border border-slate-800 p-6 md:p-8 rounded-sm hover:border-slate-600 transition-colors group relative overflow-hidden"
          >
             <div className="flex items-center gap-2 mb-6">
                <div className="h-2 w-2 bg-cyan-500" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">Core Architecture</span>
             </div>
             <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">The Developer</h3>
             <p className="text-slate-400 leading-relaxed text-base md:text-lg font-light">
               I build things that make machines slightly less clueless. My work sits somewhere between clean math and messy human behaviour — and I enjoy that awkward intersection far too much.
             </p>
          </motion.div>

          {/* Box 2: Location */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 border border-slate-800 p-6 md:p-8 rounded-sm flex flex-col items-center justify-center text-center relative group overflow-hidden"
          >
             <Globe className="w-8 h-8 md:w-10 md:h-10 text-cyan-500 mb-4 group-hover:rotate-12 transition-transform duration-500" />
             <h3 className="text-white font-bold tracking-tight">Pune, India</h3>
             <p className="text-slate-500 font-mono text-[10px] uppercase mt-2 tracking-widest">Base of Operations</p>
             <div className="mt-4 pt-4 border-t border-slate-800 w-full hidden sm:block">
                <span className="text-slate-600 font-mono text-[9px]">COORD: 18.5204° N, 73.8567° E</span>
             </div>
          </motion.div>

          {/* Box 3: Stack (Span 2 rows only on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:row-span-2 bg-slate-900/20 border border-slate-800 p-6 md:p-8 rounded-sm flex flex-col justify-between group hover:border-cyan-500/30 transition-all"
          >
             <div>
                <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-sm flex items-center justify-center mb-6">
                   <Code2 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight">Full Stack + AI</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                   I don't just build models; I build the infrastructure that serves them. From <span className="text-cyan-400">React</span> to <span className="text-cyan-400">Flask</span>.
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

          {/* Box 4: Gaming */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/20 border border-slate-800 p-6 md:p-8 rounded-sm hover:border-purple-500/30 transition-colors group relative overflow-hidden"
          >
             <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 tracking-tight">
                <Zap className="w-4 h-4 text-purple-400" />
                Offline Mode
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed font-light">
                When I’m not coding, I’m busy losing at <span className="text-purple-400">Chess</span>, getting immersed in <span className="text-purple-400">gaming</span>, or playing <span className="text-purple-400">Basketball</span>—pretending every brick was a tactical masterclass.
             </p>
          </motion.div>

          {/* Box 5: Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/20 border border-slate-800 p-6 md:p-8 rounded-sm flex items-center justify-between group hover:border-emerald-500/30 transition-all"
          >
             <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">5+</h3>
                <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mt-1">Deployments</p>
             </div>
             <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-sm flex items-center justify-center">
                <Cpu className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}