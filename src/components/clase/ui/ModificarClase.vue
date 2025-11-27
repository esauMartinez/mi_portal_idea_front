<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'
import useClase from '../composables/useClase'
import type { IClase } from '../interfaces/clase'
import FormularioClase from '../components/FormularioClase.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()

const { clase, isPending: isPendingClase } = useClase(+params.id!)

const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (clase: IClase) => {
  modificarMutation.mutate(clase)
}

watch(isSuccess, (payload) => {
  if (payload) {
    visible.value = false
  }
})
</script>

<template>
  <v-drawer
    v-model:visible="visible"
    modal
    :dismissable="false"
    header="Crear clase"
    v-on:after-hide="router.back()"
    class="!w-full md:!w-80 lg:!w-[50%] rounded-tr-md rounded-br-md"
  >
    <EsqueletoFormulario v-if="isPendingClase" />
    <FormularioClase
      :cancelar="cancelar"
      :clase="clase"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-drawer>
  <!-- <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Modifcar clase"
    :modal="true"
    :position="'left'"
  >
  </v-dialog> -->
</template>

<style scoped></style>
