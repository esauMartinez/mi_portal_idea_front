<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioEmpleado from '../components/FormularioEmpleado.vue'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearMutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (empleado: FormData) => {
  crearMutation.mutate(empleado)
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
    header="Crear empleado"
    :modal="true"
  >
    <FormularioEmpleado :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
