<script setup lang="ts">
import { ref, watch } from 'vue'
import FormularioRequerimiento from '../components/FormularioRequerimiento.vue'
import router from '@/router'
import useModificar from '../composables/useModificar'
import type { IRequerimiento } from '../interface/requerimineto'
import useRequerimiento from '../composables/useRequerimiento'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'

const { params } = useRoute()
const visible = ref<boolean>(true)

const { data: requerimiento, isLoading } = useRequerimiento(+params.id!)
const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (payload: IRequerimiento) => {
  modificarMutation.mutate(payload)
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
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioRequerimiento
      :requerimiento="requerimiento"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
