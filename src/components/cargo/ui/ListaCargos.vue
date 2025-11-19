<script setup lang="ts">
import TablaCargos from '../components/TablaCargos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaCargos />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
