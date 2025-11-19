<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useDepartamento from '../composables/useDepartamento'
import type { IDepartamento } from '../interfaces/departamento'
import FormularioDepartamento from '../components/FormularioDepartamento.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: departamento, isLoading } = useDepartamento(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (ubicacion: IDepartamento) => {
  modificarMutation.mutate(ubicacion)
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
    header="Modificar departamento"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioDepartamento
      :departamento="departamento"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
