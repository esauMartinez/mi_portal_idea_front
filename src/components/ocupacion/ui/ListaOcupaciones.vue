<script setup lang="ts">
import TablaOcupaciones from '../components/TablaOcupaciones.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaOcupaciones />
    </template>
  </v-card>

  <router-view></router-view>
</template>

<style scoped></style>
