import { useEffect, useRef } from "react"
import * as THREE from "three"

type Props = {
  state?: "idle" | "thinking" | "speaking"
  speechEnergy?: number
}

export default function AvatarParticles({ state = "idle", speechEnergy = 0 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 320

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const uniforms = {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0, 0) },
      interactionStrength: { value: 0.0 },
      pointSize: { value: 1.35 },
    }

    let rafId = 0
    let disposed = false
    let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial> | null = null

    let halfW = 120
    let halfH = 120
    const mouseTarget = new THREE.Vector2(0, 0)

    const vertexShader = `
      uniform float time;
      uniform vec2 mouse;
      uniform float interactionStrength;
      uniform float pointSize;

      attribute vec3 color;
      attribute float aPhase;
      attribute float aBrightness;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec3 p = position;

        float scan = sin((p.y + time * 40.0) * 0.03) * 0.6;
        p.z += scan;

        // Layered holographic motion (GPU)
        float t = time;
        float ambient = sin(t * 0.75 + p.x * 0.045 + p.y * 0.04 + aPhase) * 1.25;
        float depthOsc = sin(t * 1.35 + p.x * 0.02 - p.y * 0.025) * 0.9;
        float breathe = 1.0 + sin(t * 0.8) * 0.012;

        p.xy *= breathe;
        p.x += sin(t * 0.55 + p.y * 0.03 + aPhase) * 0.22;
        p.y += cos(t * 0.5 + p.x * 0.028 + aPhase) * 0.18;
        p.z += ambient + depthOsc;

        // Mouse repulsion field (subtle)
        vec2 delta = p.xy - mouse;
        float dist = length(delta) + 0.0001;
        float falloff = exp(-dist * dist * 0.006);
        float force = interactionStrength * falloff * 7.0;
        p.xy += normalize(delta) * force;

        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float pulse = 1.0 + sin(time * 1.5) * 0.05;
        gl_PointSize = pointSize * pulse * (300.0 / -mvPosition.z);

        vColor = color * (0.85 + p.z * 0.015);
        vAlpha = 0.6 + aBrightness * 0.4;
      }
    `

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec2 c = gl_PointCoord - vec2(0.5);
        float d = length(c);

        float core = smoothstep(0.45, 0.0, d);
        float glow = smoothstep(0.6, 0.0, d) * 0.35;

        float a = (core + glow) * vAlpha;
        if (a <= 0.01) discard;

        gl_FragColor = vec4(vColor, a);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const setSize = () => {
      const size = Math.max(120, Math.min(260, mount.clientWidth || 160))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    setSize()

    const isMobile = window.innerWidth < 768
    const sampleStep = 1

    const loader = new THREE.TextureLoader()
    loader.load(
      "/hologram2.png",
      (texture) => {
        if (disposed) {
          texture.dispose()
          return
        }

        const image = texture.image as HTMLImageElement
        const offscreen = document.createElement("canvas")
        const ctx = offscreen.getContext("2d")
        if (!ctx) {
          texture.dispose()
          return
        }

        const maxSize = 420
        const scale = Math.min(maxSize / image.width, maxSize / image.height, 1)
        const width = Math.max(1, Math.floor(image.width * scale))
        const height = Math.max(1, Math.floor(image.height * scale))
        halfW = width * 0.5
        halfH = height * 0.5

        offscreen.width = width
        offscreen.height = height

        ctx.clearRect(0, 0, width, height)
        ctx.filter = "blur(1px)"
        ctx.drawImage(image, 0, 0, width, height)
        ctx.filter = "none"

        const { data } = ctx.getImageData(0, 0, width, height)

        const positions: number[] = []
        const colors: number[] = []
        const phases: number[] = []
        const brightnessAttr: number[] = []

        for (let y = 0; y < height; y += sampleStep) {
          for (let x = 0; x < width; x += sampleStep) {
            const i = (y * width + x) * 4
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            const a = data[i + 3]
            if (a < 10) continue

            const brightness = 0.299 * r + 0.587 * g + 0.114 * b
            if (brightness <= 10) continue

            const brightnessNorm = brightness / 255
            const px = x - width / 2
            const py = -(y - height / 2)
            const pz = brightness * 0.01

            const jitter = 0.05
            const jx = (Math.random() - 0.5) * jitter
            const jy = (Math.random() - 0.5) * jitter

            positions.push(px + jx, py + jy, pz)

            const intensity = 0.35 + brightnessNorm * 0.9
            colors.push(0.08 * intensity, 0.75 * intensity, 1.0 * intensity)

            phases.push(Math.random() * Math.PI * 2)
            brightnessAttr.push(brightnessNorm)
          }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
        geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
        geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1))
        geometry.setAttribute("aBrightness", new THREE.Float32BufferAttribute(brightnessAttr, 1))

        points = new THREE.Points(geometry, material)
        points.scale.set(1.2, 1.2, 1.2)
        points.frustumCulled = false
        scene.add(points)

        texture.dispose()
      },
      undefined,
      () => {}
    )

    const onPointerMove = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      const nx = (ev.clientX - rect.left) / rect.width
      const ny = (ev.clientY - rect.top) / rect.height

      mouseTarget.x = (nx - 0.5) * (halfW * 2)
      mouseTarget.y = -(ny - 0.5) * (halfH * 2)

      uniforms.interactionStrength.value = 1.0
    }

    const onPointerLeave = () => {
      uniforms.interactionStrength.value = 0.0
    }

    const animate = () => {
      if (disposed) return

      rafId = requestAnimationFrame(animate)
      uniforms.time.value = performance.now() * 0.001

      uniforms.mouse.value.lerp(mouseTarget, 0.1)
      uniforms.interactionStrength.value +=
        ((uniforms.interactionStrength.value > 0 ? 1 : 0) -
          uniforms.interactionStrength.value) *
        0.08

      renderer.render(scene, camera)
    }

    rafId = requestAnimationFrame(animate)

    window.addEventListener("resize", setSize)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerleave", onPointerLeave)

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", setSize)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)

      if (points) {
        points.geometry.dispose()
        scene.remove(points)
      }

      material.dispose()
      renderer.dispose()

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="relative z-10 w-full aspect-square"
      data-avatar-state={state}
      data-speech-energy={speechEnergy}
    />
  )
}