<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useOcupaciones from '../composables/useOcupaciones'
import type { IOcupacion } from '../interfaces/ocupacion'
import useEliminar from '../composables/useEliminar'

const { ocupaciones, filters, isLoading } = useOcupaciones()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="ocupaciones"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['nombre']"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :loading="isLoading"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <v-iconfield>
          <v-inputicon>
            <i class="pi pi-search" />
          </v-inputicon>
          <v-inputtext v-model="filters['global'].value" placeholder="Buscar..." />
        </v-iconfield>
        <router-link :to="{ path: 'crear-ocupacion' }" v-if="verificarPermiso('Ocupaciones.Crear')">
          <v-button icon="pi pi-plus" label="Crear ocupacion" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty>
      <span>No hay clases para enlazar.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="nombre" header="Nombre" sortable>
      <template #body="{ data }: { data: IOcupacion }">
        {{ data.nombre }}
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: IOcupacion }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-ocupacion', params: { id: data.id } }"
            v-if="verificarPermiso('Ocupaciones.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-ocupacion', params: { id: data.id } }"
            v-if="verificarPermiso('Ocupaciones.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('Ocupaciones.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
