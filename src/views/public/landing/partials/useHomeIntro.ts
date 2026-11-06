import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import { useTheme } from 'vuetify'
import { creditDelay, fadeDuration, introDuration, startHomeIntro } from './homeIntroScene'

export function useHomeIntro(canvas: Ref<HTMLCanvasElement | null>, onDone: () => void) {
  const theme = useTheme()

  // States
  const isLeaving = ref(false)
  const isCreditVisible = ref(false)
  let stopScene: (() => void) | null = null
  let isUnmounted = false
  let creditTimer: ReturnType<typeof setTimeout> | undefined
  let endTimer: ReturnType<typeof setTimeout> | undefined
  let fadeTimer: ReturnType<typeof setTimeout> | undefined

  // Actions
  const onSkip = () => {
    if (isLeaving.value) return

    clearTimeout(endTimer)
    isLeaving.value = true
    fadeTimer = setTimeout(onDone, fadeDuration)
  }

  const onKeydown = (event: KeyboardEvent) => {
    // Enter on the credit link should open it, not skip the intro.
    if (event.target instanceof HTMLAnchorElement && event.key !== 'Escape') return
    if (['Escape', 'Enter', ' '].includes(event.key)) onSkip()
  }

  onMounted(async () => {
    window.addEventListener('keydown', onKeydown)

    try {
      if (!canvas.value) throw new Error('Missing canvas')

      const stop = await startHomeIntro(canvas.value, theme.global.current.value.dark)

      // Skipping can unmount this while Three is still loading.
      if (isUnmounted) {
        stop()
        return
      }

      stopScene = stop
      creditTimer = setTimeout(() => {
        isCreditVisible.value = true
      }, creditDelay)
      endTimer = setTimeout(onSkip, introDuration)
    } catch {
      // No WebGL just means no intro.
      onDone()
    }
  })

  onBeforeUnmount(() => {
    isUnmounted = true
    clearTimeout(creditTimer)
    clearTimeout(endTimer)
    clearTimeout(fadeTimer)
    window.removeEventListener('keydown', onKeydown)
    stopScene?.()
  })

  // Expose State and Actions
  return { isLeaving, isCreditVisible, onSkip }
}
