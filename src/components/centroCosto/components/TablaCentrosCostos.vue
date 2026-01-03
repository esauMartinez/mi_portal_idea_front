<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import useCentrosCostos from '../composables/useCentrosCostos'
import type { ICentroCosto } from '../interfaces/centro_costo'

const { centrosCostos, isLoading: obteniendo, filters } = useCentrosCostos()
const { eliminar } = useEliminar()
</script>

<template>
  <v-datatable
    :value="centrosCostos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['clave', 'nombre']"
    paginator
    :rows="20"
    :rowsPerPageOptions="[20, 40, 60]"
    :loading="obteniendo"
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
          :to="{ path: 'crear-centro-costo' }"
          v-if="verificarPermiso('CentrosCostos.Crear')"
        >
          <v-button icon="pi pi-plus" label="Crear centro de costos" size="small" />
        </router-link>
      </div>
    </template>

    <template #empty> No se encontraron datos. </template>
    <template #loading>
      <div class="flex flex-col items-center justify-center">
        <v-progressspinner />
        <span class="text-3xl! text-white">Cargando datos...</span>
      </div>
    </template>

    <v-column field="id" header="ID" sortable />
    <v-column field="clave" header="Codigo" sortable />
    <v-column field="nombre" header="Nombre" sortable />
    <v-column header="Estatus" sortable>
      <template #body="{ data }: { data: ICentroCosto }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activo' : 'Inactivo'"
        />
      </template>
    </v-column>

    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: ICentroCosto }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-centro-costo', params: { id: data.id } }"
            v-if="verificarPermiso('CentrosCostos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-centro-costo', params: { id: data.id } }"
            v-if="verificarPermiso('CentrosCostos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="verificarPermiso('CentrosCostos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
