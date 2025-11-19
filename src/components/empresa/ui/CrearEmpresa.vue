<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import type { IEmpresa } from '../interfaces/empresa'
import FormularioEmpresa from '../components/FormularioEmpresa.vue'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearMutation, isSuccess, isPending } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (empresa: IEmpresa) => {
  crearMutation.mutate(empresa)
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
    header="Crear empresa"
    :modal="true"
  >
    <FormularioEmpresa :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
