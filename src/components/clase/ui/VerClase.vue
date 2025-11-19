<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useClase from '../composables/useClase'
import FormularioClase from '../components/FormularioClase.vue'

const visible = ref<boolean>(true)
const { params } = useRoute()

const { clase, isPending: isPendingClase } = useClase(+params.id!)

const cancelar = () => {
  visible.value = false
}
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '50%' }"
    v-on:after-hide="router.back()"
    header="Ver clase"
    :modal="true"
  >
    <EsqueletoFormulario v-if="isPendingClase" />
    <FormularioClase :cancelar="cancelar" :clase="clase" :pendiente="false" :ver="true" v-else />
  </v-dialog>
</template>

<style scoped></style>
