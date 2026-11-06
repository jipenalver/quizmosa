<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LoginForm from './partials/LoginForm.vue'
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height ga-6">
    <v-card class="pa-6 w-100" max-width="420">
      <span class="text-label">Admin</span>
      <h1 class="text-headline-medium font-weight-bold mt-1 mb-6">Log in</h1>

      <LoginForm />
    </v-card>

    <RouterLink :to="{ name: 'Home' }" class="text-body-medium text-muted">Join a quiz</RouterLink>
  </v-container>
</template>
