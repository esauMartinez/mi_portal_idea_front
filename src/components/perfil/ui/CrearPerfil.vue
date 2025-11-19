<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import type { IPerfil } from '../interfaces/perfil'
import FormularioPerfil from '../components/FormularioPerfil.vue'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearmutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (perfil: IPerfil) => {
  crearmutation.mutate(perfil)
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
    header="Crear perfil"
    :modal="true"
  >
    <FormularioPerfil :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
