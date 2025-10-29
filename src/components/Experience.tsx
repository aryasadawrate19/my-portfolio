import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 font-mono">
          <span className="text-cyan-400">{"<"}</span>
          Experience
          <span className="text-cyan-400">{"/>"}</span>
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <Briefcase className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Summer Intern — <span className="text-cyan-400">Nataraj Services</span>
              </h3>
              <p className="text-slate-400 text-sm">Oct 2023 – Dec 2023</p>
              <p className="text-slate-400 text-sm">
                <a
                  href="mailto:contact@natarajservices.in"
                  className="text-cyan-400 hover:underline"
                >
                  contact@natarajservices.in
                </a>
              </p>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed">
            Developed a comprehensive payroll system for government employees using{" "}
            <span className="text-cyan-400 font-mono">C#</span> and{" "}
            <span className="text-cyan-400 font-mono">.NET 3.5</span>, automating
            salary management, allowances, deductions, and tax calculations. Scaled
            the solution across multiple head offices and sub-offices in{" "}
            <span className="text-cyan-400">Chhatrapati Sambhajinagar ZP</span>,
            streamlining payroll processes and improving overall efficiency.
          </p>
        </div>
      </div>
    </section>
  );
}
