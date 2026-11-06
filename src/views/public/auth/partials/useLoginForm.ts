import { formActionDefault } from '@/utils/helpers/constants'
import { handleFormError } from '@/utils/helpers/forms'
import { useAuthUserStore } from '@/stores/authUser'
import { useRoute, useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'
import { ref } from 'vue'

export function useLoginForm() {
  const route = useRoute()
  const router = useRouter()

  const authUserStore = useAuthUserStore()

  // States
  const formDataDefault = {
    email: '',
    password: '',
  }
  const formData = ref({ ...formDataDefault })
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref<VForm | null>(null)
  const isPasswordVisible = ref(false)

  // Only follow redirects inside this app.
  const redirectPath = () => {
    const { redirect } = route.query
    return typeof redirect === 'string' && /^\/(?![/\\])/.test(redirect) ? redirect : '/dashboard'
  }

  // Actions
  const onSubmit = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      await authUserStore.signIn(formData.value.email, formData.value.password)

      router.replace(redirectPath())
    } catch (error) {
      const { message, status } = handleFormError(error)
      formAction.value = {
        ...formActionDefault,
        formMessage: message,
        formStatus: status,
        formAlert: true,
      }
      formData.value.password = ''
    } finally {
      formAction.value.formProcess = false
    }
  }

  // Trigger Validators
  const onFormSubmit = async () => {
    const result = await refVForm.value?.validate()
    if (result?.valid) onSubmit()
  }

  // Expose State and Actions
  return { formData, formAction, refVForm, isPasswordVisible, onFormSubmit }
}
