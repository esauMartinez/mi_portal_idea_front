<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import FormularioCentroCosto from '../components/FormularioCentroCosto.vue'
import type { ICentroCosto } from '../interfaces/centro_costo'

const visible = ref<boolean>(true)
const { crearMutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (centroCosto: ICentroCosto) => {
  crearMutation.mutate(centroCosto)
}

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>
<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '60%' }"
    v-on:after-hide="router.back()"
    header="Crear centro de costos"
    :modal="true"
  >
    <FormularioCentroCosto :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
