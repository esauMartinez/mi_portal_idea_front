<script setup lang="ts">
import { ref } from 'vue'
import ArbolEmpleado from '../components/ArbolEmpleado.vue'
import router from '@/router'
const visible = ref<boolean>(true)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Jerarquia empleado"
    :modal="true"
  >
    <ArbolEmpleado />
  </v-dialog>
</template>

<style scoped></style>
