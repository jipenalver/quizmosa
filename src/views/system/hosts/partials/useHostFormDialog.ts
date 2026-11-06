import { computed, ref, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { VForm } from 'vuetify/components'
import { useQuestionnairesQuery } from '@/stores/questionnaires'
import { useCreateSession } from '@/stores/sessions'
import { formActionDefault, kindLabels } from '@/utils/helpers/constants'
import { handleFormError } from '@/utils/helpers/forms'

export function useHostFormDialog(isOpen: Ref<boolean>) {
  const router = useRouter()

  const questionnairesQuery = useQuestionnairesQuery()
  const createSession = useCreateSession()

  // States
  const questionnaireId = ref<number | null>(null)
  const formAction = ref({ ...formActionDefault })
  const refVForm = ref<VForm | null>(null)

  // Only questionnaires with questions can be hosted.
  const questionnaireOptions = computed(() =>
    (questionnairesQuery.data.value ?? [])
      .filter((questionnaire) => (questionnaire.questions[0]?.count ?? 0) > 0)
      .map((questionnaire) => ({
        title: `${questionnaire.name} (${kindLabels[questionnaire.kind]})`,
        value: questionnaire.id,
      })),
  )

  watch(isOpen, (open) => {
    if (!open) return

    questionnaireId.value = null
    formAction.value = { ...formActionDefault }
  })

  // Actions
  const onSubmit = async () => {
    if (questionnaireId.value === null) return

    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      const id = await createSession.mutateAsync(questionnaireId.value)
      isOpen.value = false
      router.push({ name: 'HostControl', params: { id } })
    } catch (error) {
      const { message, status } = handleFormError(error)
      formAction.value = {
        ...formActionDefault,
        formMessage: message,
        formStatus: status,
        formAlert: true,
      }
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
  return {
    questionnairesQuery,
    questionnaireId,
    questionnaireOptions,
    formAction,
    refVForm,
    onFormSubmit,
  }
}
