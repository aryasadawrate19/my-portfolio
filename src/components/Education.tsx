// src/components/Education.tsx (Updated for Visibility)
import { GraduationCap, CheckCircle2, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Computer Science (AI & ML)',
    institution: 'Vishwakarma Institute of Technology, Pune',
    period: '2024 – 2027',
    status: 'ACTIVE_TRAINING',
    score: 'CURRENT',
    description: "Specializing in Deep Learning and Intelligent Systems. Focus: Neural Architectures & Industry Integration.",
  },
  {
    degree: 'Diploma in AI & Machine Learning',
    institution: 'Government Polytechnic, Chhatrapati Sambhajinagar',
    period: '2021 – 2024',
    status: 'COMPLETED',
    score: '91.53%',
    description: "Foundation in computational theory and algorithmic design. Graduated in the 99th percentile.",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 bg-slate-900/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold text-white mb-20 tracking-tighter text-right"
        >
          <span className="text-slate-500">KNOWLEDGE_</span>BASE
        </motion.h2>

        <div className="grid gap-8">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="group relative flex flex-col md:flex-row gap-8 p-8 bg-slate-900/40 border border-slate-800 rounded-sm hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* The Score Badge - Now highly visible in the top right */}
              <div className="absolute top-0 right-0 p-4">
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Success_Rate</span>
                    <span className="text-2xl font-bold text-cyan-400 font-mono tracking-tighter">
                      {edu.score}
                    </span>
                 </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-slate-800 border border-slate-700 flex items-center justify-center rounded-sm group-hover:border-cyan-500 transition-colors">
                  <GraduationCap className="w-6 h-6 text-slate-400 group-hover:text-cyan-500" />
                </div>
              </div>

              <div className="flex-grow pr-20"> {/* Added padding so text doesn't hit the score */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{edu.degree}</h3>
                  <p className="text-cyan-500 font-mono text-sm mt-1">{edu.institution}</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-3 h-3" /> {edu.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono uppercase border border-emerald-500/20">
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