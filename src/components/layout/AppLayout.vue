<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['isDrawerVisible', 'theme'])

const theme = ref(localStorage.getItem('theme') ?? 'light')

const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  emit('theme', theme.value)
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar>
        <v-app-bar-nav-icon icon="mdi-menu" :theme="theme" @click="emit('isDrawerVisible')">
        </v-app-bar-nav-icon>

        <v-app-bar-title class="text-display-medium font-weight-bold">
          quiz<span class="text-primary">mosa</span>
        </v-app-bar-title>

        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onToggleTheme"
        ></v-btn>
      </v-app-bar>

      <slot name="navigation"> </slot>

      <v-main>
        <slot name="content"> </slot>
      </v-main>

      <slot name="footer"></slot>
    </v-app>
  </v-responsive>
</template>
