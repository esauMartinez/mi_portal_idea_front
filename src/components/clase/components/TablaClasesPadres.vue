<script setup lang="ts">
import { useRoute } from 'vue-router'
import useClasesPadres from '../composables/useClasesPadres'
import type { IClase } from '../interfaces/clase'
import useEnlazarClase from '../composables/useEnlazarClase'

const { params } = useRoute()
const { data: clases, isLoading } = useClasesPadres()
const { enlazar } = useEnlazarClase()
</script>
<template>
  <v-datatable
    :value="clases"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    :loading="isLoading"
  >
    <template #empty>
      <span>No hay clases para enlazar.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="curso.nombre" header="Curso"></v-column>
    <v-column field="fechaInicio" header="Fecha inicio" sortable>
      <template #body="{ data }: { data: IClase }">
        {{ data.fechaInicio }} {{ data.horaInicio }}
      </template>
    </v-column>
    <v-column field="fechaFinalizacion" header="Fecha inicio" sortable>
      <template #body="{ data }: { data: IClase }">
        {{ data.fechaFinalizacion }} {{ data.horaFinalizacion }}
      </template>
    </v-column>
    <v-column field="duracion" header="Duracion"></v-column>
    <v-column header="Enlaces">
      <template #body="{ data }: { data: IClase }">
        <div class="flex justify-center">
          <v-button icon="pi pi-check" size="small" @click="enlazar(data.id, +params.id!)" />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
