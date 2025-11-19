<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioCurso from '../components/FormularioCurso.vue'
import type { ICurso } from '../interfaces/curso'
import useCrear from '../composables/useCrear'

const visible = ref<boolean>(true)
const { crearmutation, isPending, isSuccess } = useCrear()

const cancelar = () => {
  visible.value = false
}

const guardar = (curso: ICurso) => {
  crearmutation.mutate(curso)
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
    header="Crear curso"
    :modal="true"
  >
    <FormularioCurso :cancelar="cancelar" :guardar="guardar" :pendiente="isPending" />
  </v-dialog>
</template>

<style scoped></style>
