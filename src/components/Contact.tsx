import { useState } from "react";
import { Linkedin, Github, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        "service_s6hy5au", // ✅ Your EmailJS Service ID
        "template_8glwc9u", // ✅ Your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // ✅ Your EmailJS Public Key (set this in .env)
      );

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });

      // Reset after 3s
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 font-mono">
          <span className="text-cyan-400">{"<"}</span>
          Contact
          <span className="text-cyan-400">{"/>"}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* === LEFT SIDE === */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Let's Connect
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Interested in collaborating on AI/ML projects, discussing
              intelligent systems, or just want to say hi? Feel free to reach
              out through any of these channels.
            </p>

            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/arya-sadawrate-894a0a305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-all duration-300 group"
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">LinkedIn</p>
                  <p className="text-slate-400 text-sm">Connect professionally</p>
                </div>
              </a>

              <a
                href="https://github.com/aryasadawrate19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-all duration-300 group"
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Github className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">GitHub</p>
                  <p className="text-slate-400 text-sm">Check out my code</p>
                </div>
              </a>

              <a
                href="mailto:work.aarya12@gmail.com"
                className="flex items-center gap-4 p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-cyan-500 transition-all duration-300 group"
              >
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-slate-400 text-sm">Drop me a line</p>
                </div>
              </a>
            </div>
          </div>

          {/* === RIGHT SIDE (FORM) === */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-mono text-cyan-400 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-mono text-cyan-400 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-mono text-cyan-400 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "idle" && (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
                {status === "sending" && "Transmitting..."}
                {status === "sent" && "Transmission received!"}
                {status === "error" && "Transmission failed!"}
              </button>

              {status === "sent" && (
                <p className="text-center text-sm text-cyan-400 font-mono">
                  Your query is in the training queue.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
