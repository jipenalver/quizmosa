<script setup lang="ts">
import FooterNavigation from '@/components/navigation/FooterNavigation.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content> <p>Welcome to the Home Page</p> </template>

    <template #footer> <FooterNavigation /> </template
  ></AppLayout>
</template>

<style>
body {
  font-family: 'Space Grotesk', sans-serif;
}
</style>
