<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useOrden from '../composables/useOrden'
import type { IOrden } from '../interfaces/orden'
import FormularioOrden from '../components/FormularioOrden.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: orden, isLoading } = useOrden(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (orden: IOrden) => {
  modificarMutation.mutate(orden)
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
    header="Modificar orden"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioOrden
      :orden="orden"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
