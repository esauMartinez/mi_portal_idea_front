<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaInstructoresClase from '../components/TablaInstructoresClase.vue'

const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Instructores"
    :modal="true"
  >
    <TablaInstructoresClase />
  </v-dialog>
</template>

<style scoped></style>
