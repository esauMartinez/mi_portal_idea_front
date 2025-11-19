<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import TablaBitacoraEmpleado from '../components/TablaBitacoraEmpleado.vue'

const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '60%' }"
    v-on:after-hide="router.back()"
    header="Bitacora empleado"
    :modal="true"
  >
    <TablaBitacoraEmpleado />
  </v-dialog>
</template>

<style scoped></style>
