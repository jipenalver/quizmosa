import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryQuery } from '@/stores/dashboard'
import { useSessionQuery, useSessionReportQuery } from '@/stores/sessions'

export function useHostDetailView() {
  const route = useRoute()
  const sessionId = Number(route.params.id)

  const sessionQuery = useSessionQuery(sessionId)
  const reportQuery = useSessionReportQuery(sessionId)
  const historyQuery = useHistoryQuery()

  const summary = computed(() =>
    historyQuery.data.value?.find((row) => row.session_id === sessionId),
  )

  // Expose State and Actions
  return { sessionQuery, reportQuery, summary }
}
