<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useSucursal from '../composables/useSucursal'
import type { ISucursal } from '../interfaces/sucursal'
import FormularioSucursal from '../components/FormularioSucursal.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: sucursal, isLoading } = useSucursal(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (sucursal: ISucursal) => {
  modificarMutation.mutate(sucursal)
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
    header="Modificar sucursal"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioSucursal
      :sucursal="sucursal"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
