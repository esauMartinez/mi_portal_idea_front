<script setup lang="ts">
import TablaOrdenes from '../components/TablaOrdenes.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaOrdenes />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
