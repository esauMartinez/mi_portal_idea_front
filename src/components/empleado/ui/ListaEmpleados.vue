<script setup lang="ts">
import TablaEmpleados from '../components/TablaEmpleados.vue'
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaEmpleados />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
