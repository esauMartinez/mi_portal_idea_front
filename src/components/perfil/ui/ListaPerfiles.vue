<script setup lang="ts">
import TablaPerfiles from '../components/TablaPerfiles.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaPerfiles />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
