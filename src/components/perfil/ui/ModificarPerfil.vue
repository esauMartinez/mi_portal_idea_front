<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import usePerfil from '../composables/usePerfil'
import FormularioPerfil from '../components/FormularioPerfil.vue'
import type { IPerfil } from '../interfaces/perfil'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: perfil } = usePerfil(+params.id!)

const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (perfil: IPerfil) => {
  modificarMutation.mutate(perfil)
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
    header="Modificar perfil"
    :modal="true"
  >
    <EsqueletoFormulario v-if="!perfil" />
    <FormularioPerfil
      :cancelar="cancelar"
      :guardar="guardar"
      :perfil="perfil"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
