<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import FormularioArchivosClase from '../components/FormularioArchivosClase.vue'

const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Archivos de la capacitacion"
    :modal="true"
  >
    <FormularioArchivosClase />
  </v-dialog>
</template>

<style scoped></style>
