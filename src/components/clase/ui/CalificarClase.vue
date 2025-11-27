<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import TablaCalificaciones from '../components/TablaCalificaciones.vue'
import type { IClaseEmpleado } from '../interfaces/clase_empleado'
import useGuardarCalificaciones from '../composables/useGuardarCalificaciones'

const visible = ref<boolean>(true)
const { calificarMutation, isPending } = useGuardarCalificaciones()

const guardarCalificaciones = (calificaciones: IClaseEmpleado[]) => {
  calificarMutation.mutate(calificaciones)
}

const cancelar = () => {
  visible.value = false
}
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '60%' }"
    v-on:after-hide="router.back()"
    header="Calificaciones"
    :modal="true"
  >
    <TablaCalificaciones
      :guardar-calificaciones="guardarCalificaciones"
      :cancelar="cancelar"
      :pendiente="isPending"
    />
  </v-dialog>
</template>

<style scoped></style>
