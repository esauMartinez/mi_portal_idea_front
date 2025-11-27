<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useCrear from '../composables/useCrear'
import type { IClase } from '../interfaces/clase'
import FormularioClase from '../components/FormularioClase.vue'

const visible = ref<boolean>(true)
const { crearmutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (curso: IClase) => {
  crearmutation.mutate(curso)
}

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>
<template>
  <!-- <v-drawer
    v-model:visible="visible"
    modal
    :dismissable="false"
    header="Crear clase"
    v-on:after-hide="router.back()"
    class="!w-full md:!w-80 lg:!w-[50%] rounded-tr-md rounded-br-md"
  >
  </v-drawer> -->
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Crear clase"
    :modal="true"
  >
    <!-- :position="'left'" -->
    <FormularioClase :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
