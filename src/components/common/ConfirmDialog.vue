<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true })

withDefaults(
  defineProps<{
    title: string
    text: string
    confirmText?: string
    loading?: boolean
  }>(),
  { confirmText: 'Delete', loading: false },
)

const emit = defineEmits<{ confirm: [] }>()
</script>

<template>
  <v-dialog v-model="isOpen" max-width="420">
    <v-card class="pa-2" :text="text" :title="title">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" @click="isOpen = false">Cancel</v-btn>
        <v-btn :loading="loading" color="error" variant="flat" @click="emit('confirm')">
          {{ confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
