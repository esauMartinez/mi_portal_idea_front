<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import type { IOcupacion } from '../interfaces/ocupacion'
import FormularioOcupacion from '../components/FormularioOcupacion.vue'

const visible = ref<boolean>(true)
const { crearMutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (ocupacion: IOcupacion) => {
  crearMutation.mutate(ocupacion)
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
    :style="{ width: '40%' }"
    v-on:after-hide="router.back()"
    header="Crear ocupacion"
    :modal="true"
  >
    <FormularioOcupacion :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
