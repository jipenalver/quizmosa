<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    seconds: number
    percent: number
    size?: number
    width?: number
  }>(),
  { size: 96, width: 8 },
)

const color = computed(() => (props.seconds <= 5 ? 'error' : 'primary'))
</script>

<template>
  <v-progress-circular
    :color="color"
    :model-value="percent"
    :size="size"
    :width="width"
    role="timer"
  >
    <span class="font-weight-bold" :style="{ fontSize: `${size / 3}px` }">{{ seconds }}</span>
  </v-progress-circular>
</template>
