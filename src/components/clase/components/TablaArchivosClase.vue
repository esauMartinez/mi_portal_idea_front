<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useArchivosClase from '../composables/useArchivosClase'
import useEliminarArchivoClase from '../composables/useEliminarArchivoClase'
import type { IArchivoClase } from '../interfaces/archivo_clase'
import type { PropsClaseId } from '../interfaces/props'
import useOrdenes from '@/components/orden/composables/useOrdenes'

const { id } = defineProps<PropsClaseId>()

const { archivosClase, isLoading } = useArchivosClase(id)
const { eliminar } = useEliminarArchivoClase()
const { descargar } = useOrdenes()
</script>

<template>
  <v-datatable
    :value="archivosClase"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    :loading="isLoading"
  >
    <template #header>Archivos</template>

    <template #empty>
      <span>No hay alumnos para esta clase.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="nombre" header="Archivo" sortable />
    <v-column header="Acciones" sortable>
      <template #body="{ data }: { data: IArchivoClase }">
        <div class="flex justify-center gap-3">
          <v-button
            severity="success"
            v-if="
              data.pathArchivo.split('.')[1] === 'xlsx' || data.pathArchivo.split('.')[1] === 'xls'
            "
            @click="descargar(data.pathArchivo)"
            size="small"
          >
            <v-icon name="fa-file-excel" />
          </v-button>
          <v-button
            v-if="
              data.pathArchivo.split('.')[1] === 'docx' || data.pathArchivo.split('.')[1] === 'doc'
            "
            @click="descargar(data.pathArchivo)"
            size="small"
          >
            <v-icon name="fa-file-word" />
          </v-button>
          <v-button
            severity="danger"
            v-if="data.pathArchivo.split('.')[1] === 'pdf'"
            @click="descargar(data.pathArchivo)"
            size="small"
          >
            <v-icon name="fa-file-pdf" />
          </v-button>

          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="verificarPermiso('Clases.Eliminar.Archivos')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
