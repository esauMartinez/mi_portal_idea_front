<script setup lang="ts">
import TablaPuestos from '../components/TablaPuestos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaPuestos />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
