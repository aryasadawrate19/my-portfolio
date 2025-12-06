import { GraduationCap, Calendar, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Computer Science (AI & ML)',
    institution: 'Vishwakarma Institute of Technology, Pune',
    period: 'Aug 2024 – Present',
    status: 'Running',
    description: "Specializing in Deep Learning and Intelligent Systems. Active member of the Industry Connect Club.",
  },
  {
    degree: 'Diploma in AI & Machine Learning',
    institution: 'Government Polytechnic, Chhatrapati Sambhajinagar',
    period: 'Jun 2021 – Jun 2024',
    status: '91.53%',
    description: "Foundational studies in algorithms, data structures, and neural networks. Consistently ranked among top performers.",
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Podar International School, CBSE',
    period: 'Jun 2021',
    status: '94%',
    description: " excelled in Mathematics and Sciences.",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-slate-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-16 font-mono text-center"
        >
          <span className="text-cyan-400">{'<'}</span>
          Education
          <span className="text-cyan-400">{' />'}</span>
        </motion.h2>

        <div className="relative border-l border-slate-800 ml-4 md:ml-10 space-y-12">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />
              
              <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-cyan-500/5">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      {edu.degree}
                    </h3>
                    <p className="text-cyan-400 font-medium">{edu.institution}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-400 bg-green-900/20 px-3 py-1 rounded-full border border-green-500/30">
                        <Award className="w-3 h-3" />
                        {edu.status}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
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