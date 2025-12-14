<script setup lang="ts">
import TablaMisCursos from '@/components/misCursos/components/TablaMisCursos.vue'
import useCursosEmpleado from '../composables/useCursosEmpleado'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'

const visible = ref<boolean>(true)
const { params } = useRoute()
const { data: cursosEmpleado, isLoading } = useCursosEmpleado(+params.id!)
</script>

<template>
  <v-dialog
    v-model:visible="visible"
    :style="{ width: '70%' }"
    v-on:after-hide="router.back()"
    header="Cursos empleado"
    :modal="true"
  >
    <TablaMisCursos
      :mis-cursos="cursosEmpleado!"
      :empleado="true"
      :cargando="isLoading"
      v-if="!isLoading"
    />
  </v-dialog>

  <router-view></router-view>
</template>

<style scoped></style>
