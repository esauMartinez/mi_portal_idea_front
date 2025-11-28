<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import type { IModelo } from '../interfaces/modelo'
import FormularioModelo from '../components/FormularioModelo.vue'

const visible = ref<boolean>(true)
const { crearMutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (modelo: IModelo) => {
  crearMutation.mutate(modelo)
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
    header="Crear modelo"
    :modal="true"
  >
    <FormularioModelo :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
