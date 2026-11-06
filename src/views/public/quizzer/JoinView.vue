<script setup lang="ts">
import { useRules } from 'vuetify'
import { useJoinView } from './useJoinView'

const rules = useRules()

const {
  step,
  profile,
  joinForm,
  formAction,
  refProfileForm,
  refJoinForm,
  onLoad,
  onProfileSubmit,
  onJoinSubmit,
} = useJoinView()
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card class="pa-6 w-100" max-width="420">
      <v-alert
        v-if="formAction.formAlert"
        :text="formAction.formMessage"
        class="mb-4"
        density="compact"
        type="error"
        variant="tonal"
      ></v-alert>

      <div v-if="step === 'loading'" class="d-flex justify-center pa-6">
        <v-progress-circular color="primary" indeterminate></v-progress-circular>
      </div>

      <v-btn v-else-if="step === 'failed'" block color="primary" size="large" @click="onLoad">
        Try again
      </v-btn>

      <template v-else-if="step === 'profile'">
        <span class="text-label">First time here</span>
        <h1 class="text-headline-medium font-weight-bold mt-1 mb-6">Who are you?</h1>

        <v-form ref="refProfileForm" @submit.prevent="onProfileSubmit">
          <v-text-field
            v-model="profile.fullName"
            :rules="[rules.required('Full name is required')]"
            autocomplete="name"
            class="mb-2"
            label="Full name"
          ></v-text-field>

          <v-text-field
            v-model="profile.alias"
            autocomplete="nickname"
            class="mb-2"
            label="Alias (optional)"
          ></v-text-field>

          <v-btn :loading="formAction.formProcess" block color="primary" size="large" type="submit">
            Continue
          </v-btn>
        </v-form>
      </template>

      <template v-else>
        <span class="text-label">Almost in</span>
        <h1 class="text-headline-medium font-weight-bold mt-1 mb-6">Join a quiz</h1>

        <v-form ref="refJoinForm" @submit.prevent="onJoinSubmit">
          <v-text-field
            v-model="joinForm.code"
            :rules="[
              rules.required('Enter your join code'),
              rules.pattern(/^[A-Za-z0-9]{6}$/, 'Join codes have 6 letters or numbers'),
            ]"
            autocomplete="off"
            class="mb-2"
            label="Join code"
            maxlength="6"
          ></v-text-field>

          <v-text-field
            v-model="joinForm.displayName"
            :rules="[rules.required('Display name is required'), rules.maxLength(40)]"
            autocomplete="off"
            class="mb-2"
            label="Display name"
            maxlength="40"
          ></v-text-field>

          <v-btn :loading="formAction.formProcess" block color="primary" size="large" type="submit">
            Join
          </v-btn>
        </v-form>
      </template>
    </v-card>
  </v-container>
</template>
