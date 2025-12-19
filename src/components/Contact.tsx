import { useState } from "react";
import { Linkedin, Github, Mail, Send, Terminal } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        "service_s6hy5au",
        "template_8glwc9u",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Transmission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 md:mb-20 tracking-tighter"
        >
          INITIATE<span className="text-slate-500">_CONTACT</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* === SYSTEM DIRECTORY (Left/Top) === */}
          <div className="order-2 md:order-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-500" />
              Direct Channels
            </h3>
            <p className="text-slate-500 mb-8 md:mb-10 font-light leading-relaxed text-sm md:text-base">
              Available for collaborations on intelligent systems. 
              Average response latency: &lt; 24 hours.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "LinkedIn", value: "Connect professionally", icon: Linkedin, href: "https://www.linkedin.com/in/arya-sadawrate-894a0a305" },
                { label: "GitHub", value: "Review codebase", icon: Github, href: "https://github.com/aryasadawrate19" },
                { label: "Email", value: "work.aarya12@gmail.com", icon: Mail, href: "mailto:work.aarya12@gmail.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-sm hover:border-cyan-500/50 transition-all group"
                >
                  <link.icon className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-bold tracking-tight">{link.label}</p>
                    <p className="text-slate-600 text-[9px] font-mono uppercase tracking-widest truncate">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* === UPLINK FORM (Right/Bottom) === */}
          <div className="bg-slate-900/20 border border-slate-800 p-6 md:p-8 rounded-sm order-1 md:order-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-2">
                    {field}_id
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-sm text-white focus:border-cyan-500 outline-none transition-all font-mono text-sm"
                    placeholder={`Enter ${field}...`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] mb-2">
                  payload_content
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-sm text-white focus:border-cyan-500 outline-none transition-all font-mono text-sm resize-none"
                  placeholder="Type message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-white text-black font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "idle" && <><Send className="w-4 h-4" /> Execute Send</>}
                {status === "sending" && "Transmitting..."}
                {status === "sent" && "Data Received"}
                {status === "error" && "Error in Uplink"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}