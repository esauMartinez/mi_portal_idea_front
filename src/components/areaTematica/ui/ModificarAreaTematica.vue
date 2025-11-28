<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useAreaTematica from '../composables/useAreaTematica'
import type { IAreaTematica } from '../interfaces/area_tematica'
import FormularioAreaTematica from '../components/FormularioAreaTematica.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: areaTematica, isLoading } = useAreaTematica(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (areaTematica: IAreaTematica) => {
  modificarMutation.mutate(areaTematica)
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
    header="Modificar area tematica"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioAreaTematica
      :area-tematica="areaTematica"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
