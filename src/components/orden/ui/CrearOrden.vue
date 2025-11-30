<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioOrden from '../components/FormularioOrden.vue'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearMutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (orden: FormData) => {
  crearMutation.mutate(orden)
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
    header="Crear orden"
    :modal="true"
  >
    <FormularioOrden :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
