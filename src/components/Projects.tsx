import { ExternalLink, Github, Terminal, Glasses, Eye, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AINux',
    icon: Terminal,
    description: 'AI-augmented development environment on Debian. Embeds an intelligent agent into the OS to interpret intent and automate workflows.',
    highlights: [
      'Hybrid Arch: Go Core + PyTorch Agent',
      'High-performance IPC via Unix Sockets',
      'Git-based state snapshotting',
    ],
    tags: ['Go', 'Python', 'PyTorch', 'Debian'],
    github: "https://github.com/aryasadawrate19/AINux-Proto",
    demo: "https://github.com/aryasadawrate19/AINux-Proto"
  },
  {
    title: 'OrthoLens',
    icon: Glasses,
    description: 'Real-time AR system for medical assistance. Overlays diagnostic indicators onto live camera feeds using local ML inference.',
    highlights: [
      'Live ML Inference (PyTorch)',
      'AR Rendering (Unity/WebXR)',
      'Gesture & Voice Controls',
    ],
    tags: ['AR', 'Unity', 'PyTorch', 'CV'],
    github: "https://github.com/aryasadawrate19/OrthoLens",
    demo: "https://github.com/aryasadawrate19/OrthoLens"
  },
  {
    title: 'VisionAid',
    icon: Eye,
    description: 'Offline assistive device for the visually impaired. Fuses computer vision and ultrasonic sensors on a Raspberry Pi.',
    highlights: [
      'Edge AI: YOLO + HOG',
      'Offline Speech (Vosk) Feedback',
      'Multithreaded Sensor Fusion',
    ],
    tags: ['Raspberry Pi', 'YOLO', 'IoT', 'Python'],
    github: "https://github.com/aryasadawrate19/vision_aid",
    demo: "https://github.com/aryasadawrate19/vision_aid"
  },
  {
    title: 'VerifyMD',
    icon: Stethoscope,
    description: 'AI-powered assistant for orthopedic doctors to analyze X-rays with conversational interaction and vector knowledge retrieval.',
    highlights: [
      'ResNet CNN (~93% accuracy)',
      'Google Gemini + LangChain',
      'FAISS Vector Retrieval',
    ],
    tags: ['PyTorch', 'ResNet', 'Gemini', 'FAISS'],
    github: "https://github.com/aryasadawrate19/VerifyMD",
    demo: "https://github.com/aryasadawrate19/VerifyMD"
  },
  {
    title: 'Vector Database Optimization System for LLM Retrieval Pipelines',
    icon: Terminal,
    description: 'End-to-end system for optimizing vector database performance in large language model retrieval pipelines through systematic benchmarking and parameter tuning.',
    highlights: [
      'HNSW Index Optimization for LLM Workloads',
      'Exact Search Baseline vs Approximate ANN Evaluation',
      'Latency, Recall, and Throughput Tradeoff Modeling',
    ],
    tags: ['Weaviate', 'HNSW', 'Vector Databases', 'LLM', 'Python'],
    github: 'https://github.com/aryasadawrate19/Vector-Database-Optimization-for-LLM-Applications',
    demo: 'https://github.com/aryasadawrate19/Vector-Database-Optimization-for-LLM-Applications',
  }

];

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            SELECTED <span className="text-slate-500 text-3xl md:text-4xl block md:inline md:ml-2">SYSTEMS_</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl text-sm md:text-base">
            From OS-level agents to embedded assistive tech.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/20 border border-slate-800 rounded-sm overflow-hidden flex flex-col hover:border-slate-600 transition-colors"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-red-500/50 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-amber-500/50 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-emerald-500/50 transition-colors" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    {project.title}.exe
                  </span>
                </div>

                <div className="p-6 md:p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="p-2.5 md:p-3 bg-slate-800/50 border border-slate-700 rounded-sm">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
                    </div>
                    <div className="flex gap-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-[10px] md:text-[11px] font-mono text-slate-500 uppercase tracking-tight">
                        <span className="w-1 bg-cyan-500 h-1 shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="px-6 md:px-8 py-4 bg-slate-900/30 border-t border-slate-800 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[8px] md:text-[9px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded-sm uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}