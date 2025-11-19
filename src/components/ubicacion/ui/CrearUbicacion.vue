<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioUbicacion from '../components/FormularioUbicacion.vue'
import type { IUbicacion } from '../interfaces/ubicacion'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearmutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (ubicacion: IUbicacion) => {
  crearmutation.mutate(ubicacion)
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
    header="Crear ubicacion"
    :modal="true"
  >
    <FormularioUbicacion :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
