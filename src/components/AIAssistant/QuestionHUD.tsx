import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  onAsk: (question: string) => void
}

export default function QuestionHUD({ onAsk }: Props) {
  const questions = [
    "What projects have I built?",
    "What is AInux?",
    "What technologies do I work with?",
    "What areas of AI interest me?",
    "What inspired me to work in AI?",
    "What kind of developer am I?",
    "What problems do I like solving?",
    "What am I currently studying?",
    "What do I want to build in the future?"
  ]

  const [index, setIndex] = useState(0)

  const prev = () => {
    setIndex((i) => (i === 0 ? questions.length - 1 : i - 1))
  }

  const next = () => {
    setIndex((i) => (i === questions.length - 1 ? 0 : i + 1))
  }

  const prevQ = questions[(index - 1 + questions.length) % questions.length]
  const nextQ = questions[(index + 1) % questions.length]

  return (
    <div className="relative w-full max-w-[420px] flex items-center justify-between">

      {/* HUD arc background */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[120%] h-20 border-t border-cyan-500/20 rounded-full pointer-events-none" />

      {/* Left navigation */}
      <button
        onClick={prev}
        className="p-2 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Questions */}
      <div className="relative w-full flex flex-col items-center">

        {/* Previous question */}
        <div className="text-xs text-slate-500 mb-2 opacity-40 text-center max-w-[320px]">
          {prevQ}
        </div>

        {/* Active question */}
        <motion.div
          key={questions[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => onAsk(questions[index])}
          className="cursor-pointer px-6 py-3 border border-cyan-400/40 bg-slate-900/70 backdrop-blur text-sm text-cyan-300 text-center hover:border-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition max-w-[320px]"
        >
          {questions[index]}
        </motion.div>

        {/* Next question */}
        <div className="text-xs text-slate-500 mt-2 opacity-40 text-center max-w-[320px]">
          {nextQ}
        </div>

      </div>

      {/* Right navigation */}
      <button
        onClick={next}
        className="p-2 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </div>
  )
}