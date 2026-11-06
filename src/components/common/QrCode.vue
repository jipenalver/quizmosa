<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import QRCode from 'qrcode'

const props = withDefaults(defineProps<{ value: string; size?: number }>(), { size: 200 })

const dataUrl = ref('')

watchEffect(async () => {
  // Always ink on white, whatever the theme, so phones can scan it.
  dataUrl.value = await QRCode.toDataURL(props.value, {
    width: props.size * 2,
    margin: 2,
    color: { dark: '#17181E', light: '#FFFFFF' },
  })
})
</script>

<template>
  <img
    v-if="dataUrl"
    :alt="`QR code for ${value}`"
    :height="size"
    :src="dataUrl"
    :width="size"
    style="border-radius: 16px"
  />
</template>
