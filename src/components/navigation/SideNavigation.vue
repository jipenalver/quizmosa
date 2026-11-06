<script setup lang="ts">
const isVisible = defineModel<boolean | null>({ default: null })

const items = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', to: { name: 'Dashboard' } },
  { title: 'Questionnaires', icon: 'mdi-format-list-checks', to: { name: 'Questionnaires' } },
  { title: 'Hosts', icon: 'mdi-broadcast', to: { name: 'Hosts' } },
  { title: 'Participants', icon: 'mdi-account-group-outline', to: { name: 'Participants' } },
]
</script>

<template>
  <v-navigation-drawer v-model="isVisible">
    <v-list color="primary" nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        rounded="lg"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
