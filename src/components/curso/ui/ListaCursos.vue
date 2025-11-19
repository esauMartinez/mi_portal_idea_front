<script setup lang="ts">
import TablaCursos from '../components/TablaCursos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaCursos />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
