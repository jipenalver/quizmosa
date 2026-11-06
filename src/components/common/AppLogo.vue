<script setup lang="ts">
import { wordmarkMosa, wordmarkQuiz } from './logoPaths'

// "quiz" and the outline ring use currentColor, so they follow the theme:
// ink on light, white on dark.
withDefaults(
  defineProps<{
    variant?: 'full' | 'mark' | 'outline' | 'app'
    height?: number | string
  }>(),
  { variant: 'full', height: 40 },
)

const orange = 'rgb(var(--v-theme-primary))'
const ink = '#17181E'
</script>

<template>
  <svg
    v-if="variant === 'full'"
    viewBox="0 0 971 180"
    :height="height"
    role="img"
    aria-label="quizmosa"
  >
    <circle cx="80" cy="80" r="80" :fill="orange" />
    <path d="M152 115 168 168 117 150Z" :fill="orange" />
    <circle cx="46" cy="80" r="12" fill="#FFFFFF" />
    <circle cx="80" cy="80" r="12" fill="#FFFFFF" />
    <circle cx="114" cy="80" r="12" fill="#FFFFFF" />
    <g transform="translate(219 0)">
      <path :d="wordmarkQuiz" fill="currentColor" />
      <path :d="wordmarkMosa" :fill="orange" />
    </g>
  </svg>

  <svg
    v-else-if="variant === 'mark'"
    viewBox="0 0 170 170"
    :height="height"
    role="img"
    aria-label="quizmosa"
  >
    <circle cx="80" cy="80" r="80" :fill="orange" />
    <path d="M152 115 168 168 117 150Z" :fill="orange" />
    <circle cx="46" cy="80" r="12" fill="#FFFFFF" />
    <circle cx="80" cy="80" r="12" fill="#FFFFFF" />
    <circle cx="114" cy="80" r="12" fill="#FFFFFF" />
  </svg>

  <svg
    v-else-if="variant === 'outline'"
    viewBox="0 0 200 200"
    :height="height"
    role="img"
    aria-label="quizmosa"
  >
    <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" stroke-width="20" />
    <path d="M180 156 197 196 155 176Z" fill="currentColor" />
    <circle cx="63" cy="100" r="13" :fill="orange" />
    <circle cx="100" cy="100" r="13" :fill="orange" />
    <circle cx="137" cy="100" r="13" :fill="orange" />
  </svg>

  <svg v-else viewBox="0 0 220 220" :height="height" role="img" aria-label="quizmosa">
    <rect width="220" height="220" rx="55" :fill="ink" />
    <circle cx="107" cy="106" r="62" :fill="orange" />
    <path d="M160 133 174 173 134 161Z" :fill="orange" />
    <circle cx="80" cy="106" r="9.5" :fill="ink" />
    <circle cx="106" cy="106" r="9.5" :fill="ink" />
    <circle cx="132" cy="106" r="9.5" :fill="ink" />
  </svg>
</template>
