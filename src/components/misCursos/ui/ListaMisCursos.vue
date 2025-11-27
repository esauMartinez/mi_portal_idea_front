<script setup lang="ts">
import TablaMisCursos from '../components/TablaMisCursos.vue'
import useMisCursos from '../composables/useMisCursos'
const { misCursos, isLoading: cargando } = useMisCursos()
</script>

<template>
  <v-card>
    <template #title></template>
    {{ cargando }}
    <template #content>
      <TablaMisCursos :mis-cursos="misCursos!" :empleado="false" :cargando="cargando" />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
