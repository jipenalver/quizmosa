<script setup lang="ts">
import { useQuestionImageUrl } from '@/stores/questionnaires'

const props = withDefaults(defineProps<{ path: string; height?: number | string }>(), {
  height: 160,
})

const { data: url } = useQuestionImageUrl(() => props.path)
</script>

<template>
  <v-img v-if="url" :height="height" :src="url" alt="Question image" rounded="lg"></v-img>
</template>
