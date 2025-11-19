<script setup lang="ts">
import useClases from '../composables/useClases'
import useEnlazar from '../composables/useEnlazar'
import type { IClase } from '../interfaces/clase'
import type { PropsTablaEnlaces } from '../interfaces/props'

const { cancelar } = defineProps<PropsTablaEnlaces>()

const { clases, estatus } = useClases()
const { enlazar } = useEnlazar()
estatus.value = 'pendiente'
</script>
<template>
  <v-datatable
    :value="clases"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
  >
    <template #empty>
      <span>No hay clases para enlazar.</span>
    </template>
    <template #loading>
      <v-progressspinner />
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
          <v-toggleswitch v-model="data.enlazada" />
        </div>
      </template>
    </v-column>
  </v-datatable>

  <div class="flex justify-end gap-3 mt-2">
    <v-button
      icon="pi pi-times"
      label="Cancelar"
      severity="danger"
      size="small"
      text
      @click="cancelar"
    />

    <v-button
      icon="pi pi-save"
      label="Guardar"
      size="small"
      type="button"
      @click="enlazar(clases)"
    />
  </div>
</template>

<style scoped></style>
