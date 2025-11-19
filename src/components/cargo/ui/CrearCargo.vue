<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import type { ICargo } from '../interfaces/cargo'
import FormularioCargo from '../components/FormularioCargo.vue'

const visible = ref<boolean>(true)
const { crearMutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (cargo: ICargo) => {
  crearMutation.mutate(cargo)
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
    header="Crear cargo"
    :modal="true"
  >
    <FormularioCargo :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
