import type { RouteRecordRaw } from 'vue-router'

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/HistoryView.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/questionnaires',
    name: 'Questionnaires',
    component: () => import('@/views/system/questionnaires/QuestionnairesView.vue'),
    meta: { title: 'Questionnaires' },
  },
  {
    path: '/questionnaires/:id',
    name: 'QuestionnaireDetail',
    component: () => import('@/views/system/questionnaires/QuestionnaireDetailView.vue'),
    meta: { title: 'Questionnaire' },
  },
  {
    path: '/hosts',
    name: 'Hosts',
    component: () => import('@/views/system/hosts/HostsView.vue'),
    meta: { title: 'Hosts' },
  },
  {
    path: '/participants',
    name: 'Participants',
    component: () => import('@/views/system/participants/ParticipantsView.vue'),
    meta: { title: 'Participants' },
  },
]
