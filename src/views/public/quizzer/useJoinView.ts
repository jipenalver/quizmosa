import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'
import { useAuthUserStore } from '@/stores/authUser'
import { hasQuizzerProfile, useCreateQuizzer, useJoinSession } from '@/stores/quizzers'
import { formActionDefault } from '@/utils/helpers/constants'
import { handleFormError } from '@/utils/helpers/forms'

const displayNameKey = 'display-name'

function readDisplayName() {
  try {
    return localStorage.getItem(displayNameKey) ?? ''
  } catch {
    return ''
  }
}

function storeDisplayName(name: string) {
  try {
    localStorage.setItem(displayNameKey, name)
  } catch {
    // Blocked storage only means typing the name again next time.
  }
}

export function useJoinView() {
  const route = useRoute()
  const router = useRouter()

  const authUserStore = useAuthUserStore()
  const createQuizzer = useCreateQuizzer()
  const joinSession = useJoinSession()

  // States
  const step = ref<'loading' | 'failed' | 'profile' | 'join'>('loading')
  const profile = ref({ fullName: '', alias: '' })
  const joinForm = ref({
    code: typeof route.params.code === 'string' ? route.params.code.toUpperCase() : '',
    displayName: readDisplayName(),
  })
  const formAction = ref({ ...formActionDefault })
  const refProfileForm = ref<VForm | null>(null)
  const refJoinForm = ref<VForm | null>(null)

  const showError = (error: unknown) => {
    const { message, status } = handleFormError(error)
    formAction.value = {
      ...formActionDefault,
      formMessage: message,
      formStatus: status,
      formAlert: true,
    }
  }

  // Actions
  const onLoad = async () => {
    step.value = 'loading'
    formAction.value = { ...formActionDefault }

    try {
      await authUserStore.ensureSession()
      step.value = (await hasQuizzerProfile()) ? 'join' : 'profile'
    } catch (error) {
      showError(error)
      step.value = 'failed'
    }
  }

  onMounted(onLoad)

  const onProfileSubmit = async () => {
    const result = await refProfileForm.value?.validate()
    const userId = authUserStore.userId
    if (!result?.valid || !userId) return

    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      const fullName = profile.value.fullName.trim()
      const alias = profile.value.alias.trim()

      await createQuizzer.mutateAsync({
        user_id: userId,
        full_name: fullName,
        alias: alias || null,
      })

      joinForm.value.displayName ||= alias || fullName
      step.value = 'join'
    } catch (error) {
      showError(error)
    } finally {
      formAction.value.formProcess = false
    }
  }

  const onJoinSubmit = async () => {
    const result = await refJoinForm.value?.validate()
    if (!result?.valid) return

    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      const code = joinForm.value.code.trim().toUpperCase()
      const displayName = joinForm.value.displayName.trim()

      await joinSession.mutateAsync({ code, displayName })
      storeDisplayName(displayName)
      router.replace({ name: 'Play', params: { code } })
    } catch (error) {
      showError(error)
    } finally {
      formAction.value.formProcess = false
    }
  }

  // Expose State and Actions
  return {
    step,
    profile,
    joinForm,
    formAction,
    refProfileForm,
    refJoinForm,
    onLoad,
    onProfileSubmit,
    onJoinSubmit,
  }
}
