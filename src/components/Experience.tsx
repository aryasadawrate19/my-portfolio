import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "Nataraj Services",
    role: "Summer Intern",
    period: "Oct 2023 – Dec 2023",
    description: "Developed a comprehensive payroll system for government employees using C# and .NET 3.5. Scaled the solution across Chhatrapati Sambhajinagar ZP head offices.",
    tech: ["C#", ".NET", "SQL"],
  },
  // Add more experiences here as you get them
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-slate-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 font-mono text-center"
        >
          <span className="text-cyan-400">{"<"}</span>
          Experience
          <span className="text-cyan-400">{"/>"}</span>
        </motion.h2>

        <div className="relative border-l border-slate-800 ml-4 md:ml-10 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />
              
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-cyan-500/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {exp.role} <span className="text-cyan-400">@ {exp.company}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}