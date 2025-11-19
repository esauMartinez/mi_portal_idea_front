<script setup lang="ts">
import TablaRequerimientos from '../components/TablaRequerimientos.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaRequerimientos :modulo="true" />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
