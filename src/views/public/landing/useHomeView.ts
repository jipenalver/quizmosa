import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'

const introSeenKey = 'intro-seen'

// Plays once per tab, and never for people who prefer reduced motion.
function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  try {
    if (sessionStorage.getItem(introSeenKey)) return false
    sessionStorage.setItem(introSeenKey, '1')
  } catch {
    // Blocked storage only means the intro can play again.
  }

  return true
}

export function useHomeView() {
  const router = useRouter()

  // States
  const isIntroVisible = ref(shouldPlayIntro())
  const joinCode = ref('')
  const refVForm = ref<VForm | null>(null)

  // Trigger Validators
  const onFormSubmit = async () => {
    const result = await refVForm.value?.validate()
    if (!result?.valid) return

    router.push({ name: 'Join', params: { code: joinCode.value.trim().toUpperCase() } })
  }

  // Expose State and Actions
  return { isIntroVisible, joinCode, refVForm, onFormSubmit }
}
