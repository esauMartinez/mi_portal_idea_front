<script setup lang="ts">
import TablaEmpresas from '../components/TablaEmpresas.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaEmpresas />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
