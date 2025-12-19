import { motion } from 'framer-motion';
import { 
  SiPython, SiCplusplus, SiMysql, SiPytorch, SiTensorflow, 
  SiScikitlearn, SiLangchain, SiPandas, SiNumpy, SiPlotly, 
  SiGit, SiGithub, SiDocker, SiPostman, SiFramer, SiWix, SiCanva
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const skillCategories = [
  {
    title: "Intelligence & Analysis",
    description: "Neural architectures & data.",
    className: "md:col-span-8",
    skills: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
      { name: "LangChain", icon: SiLangchain, color: "#00A3E0" },
      { name: "Pandas", icon: SiPandas, color: "#150458" },
    ]
  },
  {
    title: "Languages",
    description: "Foundations of logic.",
    className: "md:col-span-4",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Java", icon: FaJava, color: "#007396" },
    ]
  },
  {
    title: "Infrastructure",
    description: "Deployment & pipelines.",
    className: "md:col-span-7",
    skills: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
    ]
  },
  {
    title: "Rapid Prototyping",
    description: "Design systems.",
    className: "md:col-span-5",
    skills: [
      { name: "Framer", icon: SiFramer, color: "#0055FF" },
      { name: "Wix", icon: SiWix, color: "#FFFFFF" },
      { name: "Canva", icon: SiCanva, color: "#00C4CC" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            TECHNICAL <span className="text-slate-500">_STACK</span>
          </h2>
          <p className="text-slate-500 mt-4 font-mono text-[10px] md:text-sm uppercase tracking-[0.2em]">
            Optimized for performance and intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: catIndex * 0.05 }}
              viewport={{ once: true }}
              className={`p-6 md:p-8 bg-slate-900/20 border border-slate-800 rounded-sm relative overflow-hidden group ${category.className}`}
            >
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2 tracking-tight">{category.title}</h3>
                <p className="text-slate-500 text-[9px] md:text-xs font-mono uppercase tracking-widest mb-6 md:mb-8">{category.description}</p>
                
                <div className="flex flex-wrap gap-6 md:gap-8 justify-start">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex flex-col items-center gap-2 group/skill">
                      <skill.icon 
                        className="w-6 h-6 md:w-8 md:h-8 text-slate-600 transition-all duration-300 transform group-hover/skill:scale-110" 
                        onMouseEnter={(e) => (e.currentTarget.style.color = skill.color)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                      />
                      <span className="text-[8px] md:text-[10px] font-mono text-slate-500 opacity-0 group-hover/skill:opacity-100 transition-opacity uppercase tracking-tighter">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-slate-800 transition-all duration-500 group-hover:w-full group-hover:bg-cyan-500/50" />
            </motion.div>
          ))}

          {/* Environment Log with Horizontal Scroll on Mobile */}
          <motion.div 
             className="md:col-span-12 p-4 md:p-6 bg-slate-900/10 border border-slate-900 rounded-sm flex items-center gap-6 overflow-x-auto no-scrollbar grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          >
            <span className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-[0.3em] whitespace-nowrap">
              Environment: WSL2 // Ubuntu // VS Code // Jupyter // NumPy // Plotly // Linux_Kernel_6.x
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}