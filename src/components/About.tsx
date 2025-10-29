import { Sparkles, Code, Lightbulb } from 'lucide-react';

const highlights = [
  {
    icon: Sparkles,
    title: 'Intelligent Design',
    description: 'Turning algorithms into experiences that almost make sense.',
  },
  {
    icon: Code,
    title: 'Technical Depth',
    description: 'From RAG pipelines to CNNs — the usual dark magic of AI.',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solver',
    description: 'Bridging clean math with messy human behaviour (and surviving).',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4 font-mono">
            <span className="text-cyan-400">{'<'}</span>
            About
            <span className="text-cyan-400">{' />'}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: About text */}
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p className="relative pl-4 border-l-2 border-cyan-500/50">
              I build things that make machines slightly less clueless. My work sits somewhere
              between clean math and messy human behaviour — and I enjoy that awkward intersection
              far too much.
            </p>
            <p className="relative pl-4 border-l-2 border-blue-500/50">
              When I’m not debugging neural networks, I’m probably questioning why they were
              designed to be so dramatic in the first place.
            </p>
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-cyan-400 font-semibold text-xl">
                AI/ML developer.<br />
                I make machines smarter — and occasionally myself dumber in the process.<br />
                Still figuring out who’s learning faster.
              </p>
            </div>
          </div>

          {/* Right column: Highlights */}
          <div className="space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
