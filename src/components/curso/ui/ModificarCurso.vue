<script setup lang="ts">
import router from '@/router'
import { ref, watch } from 'vue'
import FormularioCurso from '../components/FormularioCurso.vue'
import type { ICurso } from '../interfaces/curso'
import useCurso from '../composables/useCurso'
import { useRoute } from 'vue-router'
import EsqueletoFormulario from '@/components/esqueletos/EsqueletoFormulario.vue'
import useModificar from '../composables/useModificar'

const visible = ref<boolean>(true)
const { params } = useRoute()

const { data: curso } = useCurso(+params.id!)

const { modificarMutation, isPending, isSuccess } = useModificar()

const cancelar = () => {
  visible.value = false
}

const guardar = (curso: ICurso) => {
  modificarMutation.mutate(curso)
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
    :style="{ width: '60%' }"
    v-on:after-hide="router.back()"
    header="Modificar curso"
    :modal="true"
  >
    <EsqueletoFormulario v-if="!curso" />
    <FormularioCurso
      :cancelar="cancelar"
      :curso="curso"
      :guardar="guardar"
      :pendiente="isPending"
      v-else
    />
  </v-dialog>
</template>

<style scoped></style>
