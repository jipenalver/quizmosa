<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppLogo from '@/components/common/AppLogo.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import FooterNavigation from '@/components/navigation/FooterNavigation.vue'
</script>

<template>
  <v-app-bar color="background" flat>
    <RouterLink :to="{ name: 'Home' }" class="logo-link d-flex ml-4" aria-label="Home">
      <AppLogo height="28" />
    </RouterLink>

    <v-spacer></v-spacer>

    <ThemeToggle class="mr-2" />
  </v-app-bar>

  <v-main>
    <RouterView />
  </v-main>

  <FooterNavigation />
</template>
