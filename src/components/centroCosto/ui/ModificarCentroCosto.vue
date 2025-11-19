<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import FormularioCentroCosto from '../components/FormularioCentroCosto.vue'
import useCentroCosto from '../composables/useCentroCosto'
import type { ICentroCosto } from '../interfaces/centro_costo'

const visible = ref<boolean>(true)
const { params } = useRoute()

const { data: centroCosto, isLoading } = useCentroCosto(+params.id!)

const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (centroCosto: ICentroCosto) => {
  modificarMutation.mutate(centroCosto)
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
    header="Modificar centro de costos"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioCentroCosto
      :centro-costo="centroCosto"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
