<script setup lang="ts">
import CalendarioClases from '../components/CalendarioClases.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <CalendarioClases />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
