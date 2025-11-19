<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import useUbicacion from '../composables/useUbicacion'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import FormularioUbicacion from '../components/FormularioUbicacion.vue'
import type { IUbicacion } from '../interfaces/ubicacion'
import useModificar from '../composables/useModificar'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: ubicacion, isLoading } = useUbicacion(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (ubicacion: IUbicacion) => {
  modificarMutation.mutate(ubicacion)
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
    header="Modificar ubicacion"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioUbicacion
      :ubicacion="ubicacion"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
