<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import type { IEmpresa } from '../interfaces/empresa'
import useEmpresa from '../composables/useEmpresa'
import FormularioEmpresa from '../components/FormularioEmpresa.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { empresa, isLoading } = useEmpresa(+params.id!)
const { modificarMutation, isSuccess, isPending } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (empresa: IEmpresa) => {
  modificarMutation.mutate(empresa)
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
    header="Modificar empresa"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isLoading" />
    <FormularioEmpresa
      :empresa="empresa"
      :cancelar="cancelar"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
