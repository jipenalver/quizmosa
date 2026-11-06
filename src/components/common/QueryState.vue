<script setup lang="ts">
import { handleFormError } from '@/utils/helpers/forms'
import EmptyState from './EmptyState.vue'

// Shared loading, error and empty states for anything backed by a query.
defineProps<{
  loading: boolean
  error: unknown
  empty: boolean
  emptyTitle: string
  emptyText?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <v-skeleton-loader v-if="loading" type="list-item-two-line@3"></v-skeleton-loader>

  <v-alert
    v-else-if="error"
    :text="handleFormError(error).message"
    title="Could not load this"
    type="error"
    variant="tonal"
  >
    <template #append>
      <v-btn size="small" variant="text" @click="emit('retry')">Retry</v-btn>
    </template>
  </v-alert>

  <EmptyState v-else-if="empty" :text="emptyText" :title="emptyTitle">
    <slot name="empty-action"></slot>
  </EmptyState>

  <slot v-else></slot>
</template>
