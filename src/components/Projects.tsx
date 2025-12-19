import { Brain, Stethoscope, ExternalLink, Github, Terminal, Glasses, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AINux',
    icon: Terminal,
    description: 'AI-augmented development environment on Debian. Embeds an intelligent agent into the OS to interpret intent, automate workflows, and provide real-time CLI assistance.',
    highlights: [
      'Hybrid Arch: Go Core Daemon + PyTorch Agent',
      'High-performance IPC via Unix Domain Sockets',
      'Git-based environment state snapshotting',
    ],
    tags: ['Go', 'Python', 'PyTorch', 'Debian'],
    github: "https://github.com/aryasadawrate19/AINux-Proto",
    demo: "https://github.com/aryasadawrate19/AINux-Proto" // Updated to repo if no demo exists
  },
  {
    title: 'OrthoLens',
    icon: Glasses,
    description: 'Real-time AR system for medical assistance. Overlays diagnostic indicators and anatomical guidance onto live camera feeds using local ML inference.',
    highlights: [
      'Live Camera Feed + ML Inference (PyTorch)',
      'AR Rendering (Unity/WebXR) with Spatial Anchors',
      'Interactive Gesture & Voice Controls',
    ],
    tags: ['AR', 'Unity', 'PyTorch', 'CV'],
    github: "https://github.com/aryasadawrate19/OrthoLens",
    demo: "https://github.com/aryasadawrate19/OrthoLens"
  },
  {
    title: 'VisionAid',
    icon: Eye,
    description: 'Offline assistive device for the visually impaired. Fuses computer vision and ultrasonic sensors on a Raspberry Pi for navigation and object recognition.',
    highlights: [
      'Edge AI: YOLO (Objects) + HOG (Faces)',
      'Offline Speech (Vosk) & Haptic Feedback',
      'Multithreaded Sensor Fusion',
    ],
    tags: ['Raspberry Pi', 'YOLO', 'IoT', 'Python'],
    github: "https://github.com/aryasadawrate19/vision_aid",
    demo: "https://github.com/aryasadawrate19/vision_aid"
  },
  {
    title: 'VerifyMD',
    icon: Stethoscope,
    description: 'AI-powered assistant for orthopedic doctors to analyze X-rays with conversational interaction and vector-based knowledge retrieval.',
    highlights: [
      'ResNet CNN (~93% accuracy)',
      'Google Gemini + LangChain',
      'FAISS Vector Retrieval',
    ],
    tags: ['PyTorch', 'ResNet', 'Gemini', 'FAISS'],
    github: "https://github.com/aryasadawrate19/VerifyMD",
    demo: "https://github.com/aryasadawrate19/VerifyMD"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl font-bold text-white tracking-tighter font-sans">
            SELECTED <span className="text-slate-500 text-4xl block md:inline md:ml-2">SYSTEMS_</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
            From OS-level agents to embedded assistive tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
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
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-red-500/50 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-amber-500/50 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-emerald-500/50 transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    {project.title}.exe
                  </span>
                </div>

                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-8">
                    <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-sm">
                      <Icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div className="flex gap-4">
                      {/* FIXED GITHUB LINK */}
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 hover:text-white transition-colors p-1"
                        onClick={(e) => e.stopPropagation()} // Prevents event bubbling
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      {/* FIXED DEMO LINK */}
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 hover:text-white transition-colors p-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 h-auto lg:h-20">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-8">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-[11px] font-mono text-slate-500 uppercase tracking-tight">
                        <span className="w-1 bg-cyan-500 h-1" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-4 bg-slate-900/30 border-t border-slate-800 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5 rounded-sm uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-colors"
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