<script setup lang="ts">
import TablaUbicaciones from '../components/TablaUbicaciones.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaUbicaciones />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
