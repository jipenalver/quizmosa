import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'

export function useHomeView() {
  const router = useRouter()

  // States
  const joinCode = ref('')
  const refVForm = ref<VForm | null>(null)

  // Trigger Validators
  const onFormSubmit = async () => {
    const result = await refVForm.value?.validate()
    if (!result?.valid) return

    router.push({ name: 'Join', params: { code: joinCode.value.trim().toUpperCase() } })
  }

  // Expose State and Actions
  return { joinCode, refVForm, onFormSubmit }
}
