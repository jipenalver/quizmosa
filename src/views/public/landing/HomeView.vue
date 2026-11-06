<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useRules } from 'vuetify'
import AppLogo from '@/components/common/AppLogo.vue'
import HomeIntro from './partials/HomeIntro.vue'
import { useHomeView } from './useHomeView'

const rules = useRules()

const { isIntroVisible, joinCode, refVForm, onFormSubmit } = useHomeView()
</script>

<template>
  <HomeIntro v-if="isIntroVisible" @done="isIntroVisible = false" />

  <v-container class="d-flex flex-column align-center justify-center fill-height ga-8">
    <div class="d-flex flex-column align-center ga-4 text-center">
      <AppLogo height="64" style="max-width: 100%" />
      <span class="text-label">Live quizzes. Spill the answers.</span>
    </div>

    <v-card class="pa-6 w-100" max-width="420">
      <v-form ref="refVForm" @submit.prevent="onFormSubmit">
        <v-text-field
          v-model="joinCode"
          :rules="[
            rules.required('Enter your join code'),
            rules.pattern(/^[A-Za-z0-9]{6}$/, 'Join codes have 6 letters or numbers'),
          ]"
          autocomplete="off"
          class="mb-2"
          label="Join code"
          maxlength="6"
        ></v-text-field>

        <v-btn block color="primary" size="large" type="submit">Join a quiz</v-btn>
      </v-form>
    </v-card>

    <RouterLink :to="{ name: 'Login' }" class="text-body-medium text-muted">
      Admin login
    </RouterLink>
  </v-container>
</template>
