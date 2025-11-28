<script setup lang="ts">
import TablaAreasTematicas from '../components/TablaAreasTematicas.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaAreasTematicas />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
