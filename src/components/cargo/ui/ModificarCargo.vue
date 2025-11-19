<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useCargo from '../composables/useCargo'
import type { ICargo } from '../interfaces/cargo'
import FormularioCargo from '../components/FormularioCargo.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()

const { data: cargo, isLoading } = useCargo(+params.id!)

const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (curso: ICargo) => {
  modificarMutation.mutate(curso)
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
    header="Modificar cargo"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioCargo
      :cargo="cargo"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
