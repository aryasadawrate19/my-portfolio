import { Gamepad2, Code2, Globe, Cpu, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-12 font-mono text-center"
        >
          <span className="text-cyan-400">{'<'}</span>
          About Me
          <span className="text-cyan-400">{' />'}</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Intro (Large) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
             <h3 className="text-2xl font-bold text-white mb-4">The Developer</h3>
             <p className="text-slate-300 leading-relaxed text-lg">
               I build things that make machines slightly less clueless. My work sits somewhere between clean math and messy human behaviour — and I enjoy that awkward intersection far too much.;

             </p>
          </motion.div>

          {/* Box 2: Location (Map style) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
             {/* Map Background Placeholder */}
             <div className="absolute inset-0 bg-slate-950 opacity-50" />
             <div className="relative z-10 p-4 bg-slate-950/80 rounded-full backdrop-blur-sm border border-slate-700">
                <Globe className="w-8 h-8 text-cyan-400 animate-spin-slow" />
             </div>
             <h3 className="text-white font-bold mt-4 relative z-10">Pune, India</h3>
             <p className="text-slate-400 text-sm relative z-10">Base of Operations</p>
          </motion.div>

          {/* Box 3: Stack (Vertical) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="row-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/30 transition-colors flex flex-col justify-between group"
          >
             <div>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   <Code2 className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Full Stack + AI</h3>
                <p className="text-slate-400 text-sm">
                   I don't just build models; I build the infrastructure that serves them. From <span className="text-cyan-400">React</span> frontends to <span className="text-cyan-400">Flask</span> backends.
                </p>
             </div>
             {/* Added flex-wrap to handle the long tag */}
             <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Machine Learning</span>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Generative AI</span>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">Software Development & Engineering</span>
             </div>
          </motion.div>

          {/* Box 4: Gaming / Interest */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/30 transition-colors group relative overflow-hidden"
          >
             <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Gamepad2 className="w-32 h-32 text-purple-500" />
             </div>
             <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Offline Mode
             </h3>
             <p className="text-slate-400 text-sm leading-relaxed">
                When I’m not poking at code, I’m either neck-deep in some story game or heroically losing ten matches in a row in <span className="text-purple-400">Chess</span> or <span className="text-purple-400">Valorant</span> to people who allegedly have lives. And if not that, I’m off playing <span className="text-purple-400">basketball</span>, pretending that last brick was absolutely tactical.
             </p>
          </motion.div>

          {/* Box 5: Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-green-500/30 transition-colors flex items-center justify-between"
          >
             <div>
                <h3 className="text-3xl font-bold text-white">4+</h3>
                <p className="text-slate-400 text-sm">Major Projects</p>
             </div>
             <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <Cpu className="w-6 h-6 text-green-400" />
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}