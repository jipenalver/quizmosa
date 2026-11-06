import type { BufferGeometry, Material, MeshBasicMaterial } from 'three'
import { wordmarkMosa, wordmarkQuiz } from '@/components/common/logoPaths'

const logoWidth = 971
const logoHeight = 180
const wordmarkOffset = 219
const orange = '#E0441D'

// Timeline in milliseconds. With the fade, the whole intro lasts 7 seconds.
const bubbleDuration = 1200
const dotsStart = 900
const dotsEnd = 3600
const lettersStart = 2400
const letterDuration = 640
const letterStagger = 120
export const creditDelay = 4000
export const introDuration = 6000
export const fadeDuration = 1000

const progress = (now: number, start: number, duration: number) =>
  Math.min(1, Math.max(0, (now - start) / duration))

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

const easeOutBack = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2

// Three loads here, so the landing page does not wait for it.
export async function startHomeIntro(canvas: HTMLCanvasElement, isDark: boolean) {
  const [THREE, { SVGLoader }] = await Promise.all([
    import('three'),
    import('three/addons/loaders/SVGLoader.js'),
  ])

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10)

  const geometries: BufferGeometry[] = []
  const materials: Material[] = []

  const material = (color: string, opacity = 1) => {
    const next = new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    })
    materials.push(next)
    return next
  }

  const mesh = (geometry: BufferGeometry, meshMaterial: MeshBasicMaterial) => {
    geometries.push(geometry)
    return new THREE.Mesh(geometry, meshMaterial)
  }

  // The logo uses SVG coordinates, so the group flips y and sits centered.
  const logo = new THREE.Group()
  scene.add(logo)

  const bubble = new THREE.Group()
  bubble.position.set(80, 80, 0)
  logo.add(bubble)

  const bubbleMaterial = material(orange)
  bubble.add(mesh(new THREE.CircleGeometry(80, 64), bubbleMaterial))

  const tail = new THREE.Shape()
  tail.moveTo(72, 35)
  tail.lineTo(88, 88)
  tail.lineTo(37, 70)
  tail.closePath()
  bubble.add(mesh(new THREE.ShapeGeometry(tail), bubbleMaterial))

  const dotMaterial = material('#FFFFFF')
  const dots = [-34, 0, 34].map((x) => {
    const dot = mesh(new THREE.CircleGeometry(12, 32), dotMaterial)
    dot.position.set(x, 0, 0)
    dot.renderOrder = 1
    dot.scale.setScalar(0)
    bubble.add(dot)
    return dot
  })

  // Each glyph part becomes its own mesh around its center, so it can drop into place.
  const svgPaths = (color: string, d: string) =>
    new SVGLoader()
      .parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`)
      .paths.flatMap((path) => SVGLoader.createShapes(path).map((shape) => ({ shape, color })))

  const letters = [
    ...svgPaths(isDark ? '#FFFFFF' : '#17181E', wordmarkQuiz),
    ...svgPaths(orange, wordmarkMosa),
  ]
    .map(({ shape, color }) => {
      const geometry = new THREE.ShapeGeometry(shape, 16)
      geometry.computeBoundingBox()
      const center = new THREE.Vector3()
      geometry.boundingBox?.getCenter(center)
      geometry.translate(-center.x, -center.y, 0)

      const letterMaterial = material(color, 0)
      const letter = mesh(geometry, letterMaterial)
      letter.position.set(center.x + wordmarkOffset, center.y, 0)
      logo.add(letter)
      return { letter, letterMaterial, restY: center.y, x: center.x }
    })
    .sort((a, b) => a.x - b.x)

  const resize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (width === 0 || height === 0) return

    renderer.setSize(width, height, false)
    camera.left = -width / 2
    camera.right = width / 2
    camera.top = height / 2
    camera.bottom = -height / 2
    camera.updateProjectionMatrix()

    const scale = Math.min((width * 0.84) / logoWidth, (height * 0.3) / logoHeight, 0.9)
    logo.scale.set(scale, -scale, 1)
    logo.position.set((-logoWidth / 2) * scale, (logoHeight / 2) * scale, 0)
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  const startedAt = performance.now()
  let frame = 0

  const render = () => {
    const now = performance.now() - startedAt

    bubble.scale.setScalar(easeOutBack(progress(now, 0, bubbleDuration)))

    dots.forEach((dot, index) => {
      const start = dotsStart + index * 130
      const appear = easeOutBack(progress(now, start, 350))
      // A travelling bump, like a typing indicator. It settles before the dots stop.
      const cycle = ((now - start) % 800) / 800
      const isTyping = now > start + 350 && now < dotsEnd
      const bump = isTyping && cycle < 0.5 ? Math.sin(cycle * 2 * Math.PI) : 0

      dot.scale.setScalar(appear * (1 + bump * 0.2))
      dot.position.y = bump * 12
    })

    letters.forEach(({ letter, letterMaterial, restY }, index) => {
      const eased = easeOutCubic(
        progress(now, lettersStart + index * letterStagger, letterDuration),
      )

      letterMaterial.opacity = eased
      letter.position.y = restY + (1 - eased) * -70
    })

    renderer.render(scene, camera)
    frame = requestAnimationFrame(render)
  }

  frame = requestAnimationFrame(render)

  return () => {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    geometries.forEach((geometry) => geometry.dispose())
    materials.forEach((item) => item.dispose())
    renderer.dispose()
    renderer.forceContextLoss()
  }
}
