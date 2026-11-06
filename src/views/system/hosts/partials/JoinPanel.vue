<script setup lang="ts">
import { computed } from 'vue'
import QrCode from '@/components/common/QrCode.vue'

const props = defineProps<{ code: string }>()

const joinUrl = computed(() => `${window.location.origin}/join/${props.code}`)
</script>

<template>
  <v-card class="pa-6">
    <div class="d-flex align-center justify-space-between flex-wrap ga-6">
      <div>
        <span class="text-label">Join code</span>
        <div class="text-display-medium font-weight-bold" style="letter-spacing: 0.08em">
          {{ code }}
        </div>
        <p class="text-body-medium text-muted mt-2">{{ joinUrl }}</p>
      </div>

      <QrCode :value="joinUrl" />
    </div>
  </v-card>
</template>
