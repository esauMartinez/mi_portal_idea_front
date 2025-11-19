<script setup lang="ts">
import TablaCentrosCostos from '../components/TablaCentrosCostos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaCentrosCostos />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
