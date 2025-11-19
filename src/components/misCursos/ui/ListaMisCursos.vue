<script setup lang="ts">
import TablaMisCursos from '../components/TablaMisCursos.vue'
import useMisCursos from '../composables/useMisCursos'
const { data: misCursos, isSuccess } = useMisCursos()
</script>

<template>
  <v-card>
    <template #title></template>
    <template #content>
      <TablaMisCursos :mis-cursos="misCursos!" :empleado="false" v-if="isSuccess" />
    </template>
  </v-card>

  <router-view />
</template>

<style scoped></style>
