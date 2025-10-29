import { Code2, Database, Brain, Sparkles, BarChart3, GitBranch, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['MySQL', 'SQLite'],
  },
  {
    title: 'ML & DL',
    icon: Brain,
    skills: ['Scikit-learn', 'PyTorch', 'TensorFlow', 'ResNet', 'CNNs'],
  },
  {
    title: 'Generative AI / RAG',
    icon: Sparkles,
    skills: ['LangChain', 'FAISS', 'Ollama', 'VectorDBs', 'Gemini'],
  },
  {
    title: 'Data Processing & Viz',
    icon: BarChart3,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
  },
  {
    title: 'Version Control',
    icon: GitBranch,
    skills: ['Git', 'GitHub'],
  },
  {
    title: 'Other Tools',
    icon: Wrench,
    skills: ['Jupyter', 'VS Code', 'Postman', 'Docker'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">{'<'}</span>
            Skills
            <span className="text-cyan-400">{' />'}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent systems from the ground up
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/5 transition-all duration-300" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm bg-slate-800/70 text-slate-300 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative group bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-700 rounded-xl p-8 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 group-hover:via-cyan-500/10 transition-all duration-300" />

          <div className="relative">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              Software Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {['Object-Oriented Programming', 'Agile Methodologies', 'REST APIs'].map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm bg-slate-800/70 text-slate-300 rounded-full border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-200 cursor-default font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
