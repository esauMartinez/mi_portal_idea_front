<script setup lang="ts">
import TablaModelos from '../components/TablaModelos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaModelos />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
