<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useAreasTematicas from '../composables/useAreasTematicas'
import type { IAreaTematica } from '../interfaces/area_tematica'
import useEliminar from '../composables/useEliminar'

const { areasTematicas, filters, isLoading } = useAreasTematicas()
const { eliminar, isPending } = useEliminar()
</script>

<template>
  <v-datatable
    :value="areasTematicas"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['nombre']"
    paginator
    :rows="20"
    :rowsPerPageOptions="[20, 40, 60]"
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
        <router-link
          :to="{ path: 'crear-area-tematica' }"
          v-if="verificarPermiso('Ocupaciones.Crear')"
        >
          <v-button icon="pi pi-plus" label="Crear area tematica" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty>
      <span>No hay areas tematicas para mostrar.</span>
    </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="id" header="ID"></v-column>
    <v-column field="nombre" header="Nombre" sortable>
      <template #body="{ data }: { data: IAreaTematica }">
        {{ data.nombre }}
      </template>
    </v-column>

    <v-column header="Acciones">
      <template #body="{ data }: { data: IAreaTematica }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-area-tematica', params: { id: data.id } }"
            v-if="verificarPermiso('AreasTematicas.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-area-tematica', params: { id: data.id } }"
            v-if="verificarPermiso('AreasTematicas.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id!)"
            :loading="isPending"
            v-if="verificarPermiso('AreasTematicas.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
