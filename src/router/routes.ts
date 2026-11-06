import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import LandingLayout from '@/components/layout/LandingLayout.vue'
import { publicRoutes } from './routes/public'
import { systemRoutes } from './routes/system'

export const routes: RouteRecordRaw[] = [
  { path: '/', component: LandingLayout, children: publicRoutes },
  { path: '/', component: AppLayout, meta: { requiresHost: true }, children: systemRoutes },
  {
    path: '/dashboard/live/:id/screen',
    name: 'BigScreen',
    component: () => import('@/views/dashboard/BigScreenView.vue'),
    meta: { requiresHost: true, title: 'Big screen' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]
