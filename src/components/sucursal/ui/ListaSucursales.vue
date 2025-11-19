<script setup lang="ts">
import TablaSucursales from '../components/TablaSucursales.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaSucursales />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
