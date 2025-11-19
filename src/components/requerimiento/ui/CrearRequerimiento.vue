<script setup lang="ts">
import { ref, watch } from 'vue'
import FormularioRequerimiento from '../components/FormularioRequerimiento.vue'
import router from '@/router'
import useCrear from '../composables/useCrear'
import type { IRequerimiento } from '../interface/requerimineto'

const visible = ref<boolean>(true)

const { crearmutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (payload: IRequerimiento) => {
  crearmutation.mutate(payload)
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
    header="Crear requerimiento"
    :modal="true"
  >
    <FormularioRequerimiento :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
