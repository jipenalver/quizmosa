<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { storeTheme } from '@/utils/interface/vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.current.value.dark)

const onToggleTheme = () => {
  const next = isDark.value ? 'light' : 'dark'
  theme.change(next)
  storeTheme(next)
}
</script>

<template>
  <v-btn
    :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    variant="text"
    @click="onToggleTheme"
  ></v-btn>
</template>
