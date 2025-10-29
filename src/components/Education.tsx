import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Technology in Computer Science (AIML)',
    institution: 'Vishwakarma Institute of Technology, Pune',
    period: 'Aug 2024 – Present',
    status: 'In Progress',
  },
  {
    degree: 'Diploma in Artificial Intelligence and Machine Learning',
    institution: 'Government Polytechnic, Chhatrapati Sambhajinagar',
    period: 'Jun 2021 – Jun 2024',
    status: '91.53%',
  },
  {
    degree: 'SSC',
    institution: 'Podar International School, CBSE, Chhatrapati Sambhajinagar',
    period: 'Jun 2021',
    status: '94%',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 font-mono">
          <span className="text-cyan-400">{'<'}</span>
          Education
          <span className="text-cyan-400">{' />'}</span>
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-cyan-500/10 rounded-lg mt-1">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-slate-400 mb-1">{edu.institution}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-500 font-mono">{edu.period}</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full font-semibold">
                      {edu.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
