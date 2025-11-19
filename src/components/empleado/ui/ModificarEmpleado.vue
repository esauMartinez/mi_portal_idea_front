<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioEmpleado from '../components/FormularioEmpleado.vue'
import type { IEmpleado } from '../interfaces/empleado'
import useEmpleado from '../composables/useEmpleado'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'

const visible = ref<boolean>(true)

const { params } = useRoute()
const { data: empleado, isLoading } = useEmpleado(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (empleado: IEmpleado) => {
  modificarMutation.mutate(empleado)
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
    header="Modificar empleado"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioEmpleado
      :empleado="empleado"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
