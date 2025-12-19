import { GraduationCap, CheckCircle2, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in CS (AI & ML)',
    institution: 'Vishwakarma Institute of Technology',
    period: '2024 – 2027',
    status: 'ACTIVE_TRAINING',
    score: 'CURRENT',
    description: "Specializing in Deep Learning and Intelligent Systems. Focus: Neural Architectures.",
  },
  {
    degree: 'Diploma in AI & ML',
    institution: 'Government Polytechnic',
    period: '2021 – 2024',
    status: 'COMPLETED',
    score: '91.53%',
    description: "Foundation in computational theory. Graduated in the 99th percentile.",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-12 md:mb-20 tracking-tighter text-center md:text-right"
        >
          <span className="text-slate-500">KNOWLEDGE_</span>BASE
        </motion.h2>

        <div className="grid gap-6 md:gap-8">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 bg-slate-900/40 border border-slate-800 rounded-sm hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Score Badge: Relative on mobile, Absolute on Desktop */}
              <div className="md:absolute top-0 right-0 p-4 border-b md:border-b-0 border-slate-800 md:p-6 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start">
                 <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest md:mb-1">Success_Rate</span>
                 <span className="text-xl md:text-2xl font-bold text-cyan-400 font-mono tracking-tighter">
                   {edu.score}
                 </span>
              </div>

              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-800 border border-slate-700 flex items-center justify-center rounded-sm group-hover:border-cyan-500 transition-colors">
                  <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-cyan-500" />
                </div>
              </div>

              <div className="flex-grow md:pr-24">
                <div className="mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">{edu.degree}</h3>
                  <p className="text-cyan-500 font-mono text-sm mt-1">{edu.institution}</p>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-mono uppercase border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {edu.status}
                  </span>
                </div>

                <p className="text-slate-400 font-light text-sm leading-relaxed mt-6 border-l-2 border-slate-800 pl-4 italic">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}