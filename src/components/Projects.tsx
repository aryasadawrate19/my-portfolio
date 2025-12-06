import { Brain, Stethoscope, ExternalLink, Github, Terminal, Glasses, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AINux',
    icon: Terminal,
    description: 'AI-augmented development environment on Debian. Embeds an intelligent agent into the OS to interpret intent, automate workflows, and provide real-time CLI assistance without a GUI.',
    highlights: [
      'Hybrid Arch: Go Core Daemon + PyTorch Agent',
      'High-performance IPC via Unix Domain Sockets',
      'Modular Go Plugin system for tool integration',
      'Git-based environment state snapshotting',
    ],
    tags: ['Go', 'Python', 'PyTorch', 'Debian', 'IPC', 'System Design'],
    github: "https://github.com/aryasadawrate19/AINux-Proto",
    demo: "#"
  },
  {
    title: 'OrthoLens',
    icon: Glasses,
    description: 'Real-time AR system for medical assistance. Overlays diagnostic indicators and anatomical guidance onto live camera feeds using local ML inference.',
    highlights: [
      'Live Camera Feed + ML Inference (PyTorch)',
      'AR Rendering (Unity/WebXR) with Spatial Anchors',
      'Real-time Condition Detection & Virtual Overlays',
      'Interactive Gesture & Voice Controls',
    ],
    tags: ['AR', 'Unity', 'PyTorch', 'Computer Vision', 'Medical'],
    github: "#",
    demo: "#"
  },
  {
    title: 'VisionAid',
    icon: Eye,
    description: 'Offline assistive device for the visually impaired. Fuses computer vision and ultrasonic sensors on a Raspberry Pi to provide navigation, object recognition, and safety alerts.',
    highlights: [
      'Edge AI: YOLO (Objects/Currency) + HOG (Faces)',
      'Offline Speech (Vosk) & Haptic/Audio Feedback',
      'Multithreaded Sensor Fusion (Camera + Ultrasonic)',
      'GPS-based Emergency SOS & SMTP Alerting',
    ],
    tags: ['Raspberry Pi', 'YOLO', 'Edge AI', 'IoT', 'Python', 'OpenCV'],
    github: "#",
    demo: "#"
  },
  {
    title: 'ReqAuto',
    icon: Brain,
    description: 'AI-powered platform to auto-generate and manage software requirements from natural language input.',
    highlights: [
      'Local DeepSeek & Llama 3 via Ollama',
      'NLP-based classification & prioritization',
      'Contextual accuracy validation',
    ],
    tags: ['LangChain', 'Ollama', 'Python', 'RAG'],
    github: "#", 
    demo: "#"
  },
  {
    title: 'VerifyMD',
    icon: Stethoscope,
    description: 'AI-powered assistant for orthopedic doctors to analyze X-rays with conversational interaction.',
    highlights: [
      'ResNet CNN (~93% accuracy)',
      'Google Gemini + LangChain',
      'FAISS Vector Retrieval',
    ],
    tags: ['PyTorch', 'ResNet', 'Gemini', 'FAISS'],
    github: "#",
    demo: "#"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        {/* Background Gradients */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">{'<'}</span>
            Projects
            <span className="text-cyan-400">{' />'}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
             From OS-level agents to embedded assistive tech — building intelligent systems that matter.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-md flex flex-col"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 group-hover:border-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                            <Icon className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div className="flex gap-3">
                            <a href={project.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href={project.demo} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all">
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-mono bg-cyan-950/30 text-cyan-300 rounded-full border border-cyan-900/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}