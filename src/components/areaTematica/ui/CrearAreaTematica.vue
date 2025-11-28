<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import type { IAreaTematica } from '../interfaces/area_tematica'
import FormularioAreaTematica from '../components/FormularioAreaTematica.vue'

const visible = ref<boolean>(true)
const { crearMutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (areaTematica: IAreaTematica) => {
  crearMutation.mutate(areaTematica)
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
    header="Crear area tematica"
    :modal="true"
  >
    <FormularioAreaTematica :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
