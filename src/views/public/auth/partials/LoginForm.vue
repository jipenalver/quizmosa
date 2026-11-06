<script setup lang="ts">
import { useRules } from 'vuetify'
import { useLoginForm } from './useLoginForm'

const rules = useRules()

const { formData, formAction, refVForm, isPasswordVisible, onFormSubmit } = useLoginForm()
</script>

<template>
  <v-alert
    v-if="formAction.formAlert"
    :text="formAction.formMessage"
    class="mb-4"
    density="compact"
    type="error"
    variant="tonal"
  ></v-alert>

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      :rules="[rules.required('Email is required'), rules.email('Enter a valid email')]"
      autocomplete="email"
      class="mb-2"
      label="Email"
      type="email"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :rules="[rules.required('Password is required')]"
      :type="isPasswordVisible ? 'text' : 'password'"
      autocomplete="current-password"
      class="mb-2"
      label="Password"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>

    <v-btn :loading="formAction.formProcess" block color="primary" size="large" type="submit">
      Log in
    </v-btn>
  </v-form>
</template>
