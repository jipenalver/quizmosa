import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Session } from '@supabase/supabase-js'
import { queryClient } from '@/utils/queryClient'
import { supabase } from '@/utils/supabase'

export const useAuthUserStore = defineStore('authUser', () => {
  // States
  const session = ref<Session | null>(null)
  // null means not checked yet for the current user.
  const isHost = ref<boolean | null>(null)
  let initializing: Promise<void> | null = null

  const userId = computed(() => session.value?.user.id ?? null)

  function applySession(next: Session | null) {
    if (next?.user.id !== session.value?.user.id) isHost.value = null
    session.value = next
  }

  // Actions
  function init() {
    initializing ??= (async () => {
      const { data } = await supabase.auth.getSession()
      applySession(data.session)

      // Only set state here: calling Supabase inside this callback can deadlock.
      supabase.auth.onAuthStateChange((_event, next) => applySession(next))
    })()

    return initializing
  }

  async function resolveIsHost() {
    if (!session.value) return false

    if (isHost.value === null) {
      const { data, error } = await supabase.rpc('is_host')
      if (error) return false
      isHost.value = data
    }

    return isHost.value
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    applySession(data.session)

    if (!(await resolveIsHost())) {
      await signOut()
      throw new Error('This account is not an admin.')
    }
  }

  async function signOut() {
    await supabase.auth.signOut({ scope: 'local' })
    applySession(null)
    queryClient.clear()
  }

  return { session, isHost, userId, init, resolveIsHost, signIn, signOut }
})
