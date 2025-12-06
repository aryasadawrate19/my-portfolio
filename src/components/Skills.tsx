import { motion } from 'framer-motion';
import { 
  SiPython, SiCplusplus, SiMysql, SiPytorch, SiTensorflow, 
  SiScikitlearn, SiLangchain, SiPandas, SiNumpy, SiPlotly, 
  SiGit, SiGithub, SiDocker, SiPostman, SiJupyter 
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { VscVscode } from "react-icons/vsc"; 

const skills = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "LangChain", icon: SiLangchain, color: "#FFFFFF" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "Plotly", icon: SiPlotly, color: "#3F4F75" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">{'<'}</span>
            Skills
            <span className="text-cyan-400">{' />'}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            The technical arsenal I use to build intelligent systems.
          </p>
        </motion.div>

        {/* Grid of Skills */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-opacity-50 hover:shadow-lg"
                style={{ 
                    '--hover-color': skill.color 
                } as React.CSSProperties}
              >
                {/* Hover Glow Effect */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl bg-[var(--hover-color)] blur-xl" 
                />
                
                <div className="relative z-10 p-3 bg-slate-800/50 rounded-lg group-hover:bg-slate-800 transition-colors">
                    <Icon className="w-8 h-8 text-slate-400 group-hover:text-[var(--hover-color)] transition-colors duration-300" />
                </div>
                
                <span className="text-slate-300 font-mono text-sm group-hover:text-white transition-colors relative z-10">
                    {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Tools Marquee / Smaller list for extra tools */}
        <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-center text-slate-500 font-mono mb-8 text-sm uppercase tracking-widest">
                Other Tools & Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
                 {[
                    { Icon: SiJupyter, name: "Jupyter" },
                    { Icon: SiPostman, name: "Postman" },
                    { Icon: VscVscode, name: "VS Code" },
                    { Icon: SiGithub, name: "GitHub" },
                    { Icon: FaDatabase, name: "SQLite" },
                 ].map((tool, i) => (
                    <div key={i} className="flex items-center gap-2 group cursor-default">
                        <tool.Icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm">{tool.name}</span>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </section>
  );
}