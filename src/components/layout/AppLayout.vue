<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('light')

const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar>
        <v-spacer></v-spacer>

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
