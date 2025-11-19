<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import usePuesto from '../composables/usePuesto'
import FormularioPuesto from '../components/FormularioPuesto.vue'
import type { IPuesto } from '../interfaces/puesto'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: puesto, isLoading } = usePuesto(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (puesto: IPuesto) => {
  modificarMutation.mutate(puesto)
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
    header="Modificar puesto"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioPuesto
      :puesto="puesto"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
