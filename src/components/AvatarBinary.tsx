import { useEffect, useRef } from "react"

type BinaryGlyph = {
  sx: number
  sy: number
  tx: number
  ty: number
  char: "0" | "1"
  phase: number
}

export default function AvatarParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let disposed = false
    let rafId = 0
    let loadedImage: HTMLImageElement | null = null
    let glyphs: BinaryGlyph[] = []

    let cw = 0
    let ch = 0
    let dpr = 1

    let bootStart = 0
    const bootDuration = 1300
    let isReady = false

    let fontSize = 10

    const randBit = (): "0" | "1" => (Math.random() < 0.5 ? "0" : "1")

    const resizeCanvas = () => {
      if (!container) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      cw = Math.max(1, Math.floor(container.clientWidth))
      ch = Math.max(1, Math.floor(container.clientHeight || container.clientWidth))

      canvas.style.width = `${cw}px`
      canvas.style.height = `${ch}px`
      canvas.width = Math.floor(cw * dpr)
      canvas.height = Math.floor(ch * dpr)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
    }

    const rebuildGlyphsFromImage = () => {
      if (!loadedImage) return

      const off = document.createElement("canvas")
      const octx = off.getContext("2d")
      if (!octx) return

      const srcW = loadedImage.naturalWidth || loadedImage.width
      const srcH = loadedImage.naturalHeight || loadedImage.height

      const maxProc = 420
      const scale = Math.min(maxProc / srcW, maxProc / srcH, 1)
      const pw = Math.max(1, Math.floor(srcW * scale))
      const ph = Math.max(1, Math.floor(srcH * scale))

      off.width = pw
      off.height = ph

      octx.clearRect(0, 0, pw, ph)
      octx.filter = "blur(1px)"
      octx.drawImage(loadedImage, 0, 0, pw, ph)
      octx.filter = "none"

      const { data } = octx.getImageData(0, 0, pw, ph)

      const step = window.innerWidth < 768 ? 8 : 5
      const threshold = 16

      // Fit portrait into current canvas while preserving aspect
      let drawW = cw * 0.86
      let drawH = drawW * (ph / pw)
      if (drawH > ch * 0.9) {
        drawH = ch * 0.9
        drawW = drawH * (pw / ph)
      }

      const ox = (cw - drawW) * 0.5
      const oy = (ch - drawH) * 0.5

      const cellW = (drawW / pw) * step
      const cellH = (drawH / ph) * step
      fontSize = Math.max(8, Math.min(18, Math.min(cellW, cellH) * 0.92))

      const next: BinaryGlyph[] = []

      for (let y = 0; y < ph; y += step) {
        for (let x = 0; x < pw; x += step) {
          const i = (y * pw + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]
          if (a < 8) continue

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b
          if (brightness <= threshold) continue

          const tx = ox + (x / pw) * drawW
          const ty = oy + (y / ph) * drawH

          next.push({
            sx: Math.random() * cw,
            sy: Math.random() * ch,
            tx,
            ty,
            char: randBit(),
            phase: Math.random() * Math.PI * 2,
          })
        }
      }

      glyphs = next
      bootStart = performance.now()
      isReady = true
    }

    const image = new Image()
    image.onload = () => {
      if (disposed) return
      loadedImage = image
      rebuildGlyphsFromImage()
    }
    image.src = "/hologram2.png"

    const draw = (now: number) => {
      if (disposed) return
      rafId = requestAnimationFrame(draw)

      ctx.clearRect(0, 0, cw, ch)
      if (!isReady || glyphs.length === 0) return

      const p = Math.min(1, (now - bootStart) / bootDuration)
      const ease = 1 - Math.pow(1 - p, 3)

      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
      ctx.shadowColor = "rgba(34, 211, 238, 0.55)"
      ctx.shadowBlur = 8

      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i]

        const x = g.sx + (g.tx - g.sx) * ease
        const y = g.sy + (g.ty - g.sy) * ease

        // Idle flicker after boot
        if (p >= 1 && Math.random() < 0.008) {
          g.char = g.char === "0" ? "1" : "0"
        }

        const alphaBase = p < 1 ? 0.25 + ease * 0.55 : 0.8
        const pulse = 0.08 * Math.sin(now * 0.004 + g.phase)
        const alpha = Math.max(0.2, Math.min(1, alphaBase + pulse))

        ctx.fillStyle = `rgba(34, 211, 238, ${alpha.toFixed(3)})`
        ctx.fillText(g.char, x, y)
      }
    }

    resizeCanvas()
    rafId = requestAnimationFrame(draw)

    const onResize = () => {
      resizeCanvas()
      rebuildGlyphsFromImage()
    }

    window.addEventListener("resize", onResize)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative z-10 w-full aspect-square">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}