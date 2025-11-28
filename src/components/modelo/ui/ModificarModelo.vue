<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useModelo from '../composables/useModelo'
import type { IModelo } from '../interfaces/modelo'
import FormularioModelo from '../components/FormularioModelo.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: modelo, isLoading } = useModelo(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (modelo: IModelo) => {
  modificarMutation.mutate(modelo)
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
    header="Modificar modelo"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioModelo
      :modelo="modelo"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
