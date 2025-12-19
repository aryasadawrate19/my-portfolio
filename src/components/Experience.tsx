// src/components/Experience.tsx
import { Calendar, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Nataraj Services",
    role: "Software Engineering Intern",
    period: "Oct 2023 – Dec 2023",
    description: "Architected a payroll system for municipal government infrastructure using C# and .NET. Managed full-cycle deployment across regional head offices.",
    tech: ["C#", ".NET", "SQL"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white mb-16 tracking-tighter"
        >
          EXPERIENCE<span className="text-slate-500">_LOG</span>
        </motion.h2>

        <div className="relative border-l border-slate-800 ml-4 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-10 group"
            >
              {/* Git-style Branch Node */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-cyan-500 transition-colors duration-500" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {exp.role} <span className="text-cyan-500 font-mono text-lg">@ {exp.company}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> {exp.period}
                  </div>
                </div>
              </div>
              
              <p className="text-slate-400 font-light leading-relaxed max-w-2xl mb-6">
                {exp.description}
              </p>

              <div className="flex gap-3 flex-wrap">
                {exp.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded-sm uppercase group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}