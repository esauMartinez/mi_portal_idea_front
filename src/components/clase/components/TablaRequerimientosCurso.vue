<script setup lang="ts">
import type { PropsTablaRequerimientosCurso } from '../interfaces/props'

defineProps<PropsTablaRequerimientosCurso>()
</script>

<template>
  <v-datatable
    :value="requerimientosCurso"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #header>
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-7">
          <span class="text-xl! font-bold">Requerimientos</span>
        </div>
      </div>
    </template>
    <template #empty>
      <span>El curso no cuenta con requerimientos.</span>
    </template>
    <template #loading>
      <v-progressspinner />
    </template>

    <v-column field="requerimiento.clave" header="Clave" sortable />
    <v-column field="requerimiento.nombre" header="Nombre" sortable />
    <v-column field="requerimiento.descripcion" header="Descripcion" sortable />
  </v-datatable>
</template>

<style scoped></style>
