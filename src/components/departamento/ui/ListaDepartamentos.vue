<script setup lang="ts">
import TablaDepartamentos from '../components/TablaDepartamentos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaDepartamentos />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
