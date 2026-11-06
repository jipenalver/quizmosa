<script setup lang="ts">
import AppLogo from './AppLogo.vue'

defineProps<{
  title: string
  text?: string
}>()
</script>

<template>
  <div class="d-flex flex-column align-center text-center ga-3 pa-12">
    <AppLogo variant="outline" height="64" />
    <h2 class="text-title-large font-weight-bold">{{ title }}</h2>
    <p v-if="text" class="text-body-medium text-muted">{{ text }}</p>
    <slot></slot>
  </div>
</template>
