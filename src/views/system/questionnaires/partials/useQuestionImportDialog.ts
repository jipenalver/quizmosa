import { computed, ref, watch, type Ref } from 'vue'
import { useImportQuestions } from '@/stores/questionnaires'
import { formActionDefault } from '@/utils/helpers/constants'
import { handleFormError } from '@/utils/helpers/forms'
import { parseQuestionImport } from '@/utils/helpers/questionImport'

export function useQuestionImportDialog(isOpen: Ref<boolean>, questionnaireId: number) {
  const importQuestions = useImportQuestions(questionnaireId)

  // States
  const source = ref('')
  const file = ref<File | null>(null)
  const formAction = ref({ ...formActionDefault })

  const preview = computed(() =>
    source.value.trim() === '' ? null : parseQuestionImport(source.value),
  )

  const validRows = computed(() => preview.value?.rows.flatMap((row) => row.value ?? []) ?? [])

  const errorCount = computed(
    () => preview.value?.rows.filter((row) => row.errors.length > 0).length ?? 0,
  )

  const canImport = computed(
    () => validRows.value.length > 0 && errorCount.value === 0 && !preview.value?.fileError,
  )

  watch(isOpen, (open) => {
    if (!open) return

    source.value = ''
    file.value = null
    formAction.value = { ...formActionDefault }
  })

  watch(file, async (next) => {
    if (next) source.value = await next.text()
  })

  // Actions
  const onImport = async () => {
    formAction.value = { ...formActionDefault, formProcess: true }

    try {
      await importQuestions.mutateAsync(validRows.value)
      isOpen.value = false
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

  // Expose State and Actions
  return { source, file, formAction, preview, validRows, errorCount, canImport, onImport }
}
