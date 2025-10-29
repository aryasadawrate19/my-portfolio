import { Brain, Stethoscope, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'ReqAuto',
    icon: Brain,
    description: 'AI-powered platform to auto-generate and manage software requirements from natural language input.',
    highlights: [
      'Local instances of DeepSeek and Llama 3 with Ollama and LangChain',
      'NLP-based classification and prioritization',
      'Smart parser converting vague inputs into structured specifications',
      'Contextual accuracy and validation against standard frameworks',
    ],
    tags: ['LangChain', 'Ollama', 'DeepSeek', 'Llama 3', 'NLP', 'RAG'],
  },
  {
    title: 'VerifyMD',
    icon: Stethoscope,
    description: 'AI-powered assistant for orthopedic doctors to analyze X-rays with conversational interaction.',
    highlights: [
      'ResNet-based CNN with ~93% accuracy for detecting key focus areas',
      'Google Gemini + LangChain for conversational AI',
      'X-ray processing pipeline with FAISS-based vector retrieval',
      'Case similarity matching for diagnostic support',
    ],
    tags: ['PyTorch', 'ResNet', 'CNN', 'Gemini', 'LangChain', 'FAISS'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">{'<'}</span>
            Projects
            <span className="text-cyan-400">{' />'}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            From RAG-powered automation to medical AI assistants — building the future of intelligent systems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/5 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/20">
                        <Icon className="w-7 h-7 text-cyan-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed text-base">
                    {project.description}
                  </p>

                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-3 group/item">
                          <span className="text-cyan-400 mt-0.5 group-hover/item:scale-125 transition-transform">▸</span>
                          <span className="group-hover/item:text-white transition-colors">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-mono bg-slate-800/70 text-cyan-400 rounded-full border border-slate-700 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-700/50">
                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50 text-sm font-semibold">
                      <Github className="w-4 h-4" />
                      Code
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 text-sm font-semibold">
                      <ExternalLink className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
