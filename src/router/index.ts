import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { routes } from './routes'

declare module 'vue-router' {
  interface RouteMeta {
    requiresHost?: boolean
    hideFooter?: boolean
    title?: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authUserStore = useAuthUserStore()
  await authUserStore.init()

  if (to.meta.requiresHost && !(await authUserStore.resolveIsHost())) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'Play' && !authUserStore.session) {
    return { name: 'Join', params: { code: to.params.code } }
  }

  if (to.name === 'Login' && (await authUserStore.resolveIsHost())) {
    return { name: 'Dashboard' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · quizmosa` : 'quizmosa'
})

export default router
