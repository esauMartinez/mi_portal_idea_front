<script setup lang="ts">
import { verificarPermiso } from '@/guards/verificarPermiso'
import useCargos from '../composables/useCargos'
import type { ICargo } from '../interfaces/cargo'
import useEliminar from '../composables/useEliminar'

const { cargos, isLoading: obteniendo, filters } = useCargos()
const { eliminar } = useEliminar()
</script>

<template>
  <v-datatable
    :value="cargos"
    showGridlines
    size="small"
    class="p-datatable-sm"
    responsiveLayout="scroll"
    v-model:filters="filters"
    :globalFilterFields="['codigo', 'nombre']"
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
        <router-link :to="{ path: 'crear-cargo' }" v-if="verificarPermiso('Cargos.Crear')">
          <v-button icon="pi pi-plus" label="Crear cargo" size="small" />
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
    <v-column field="codigo" header="Codigo" sortable />
    <v-column field="nombre" header="Nombre" sortable />
    <v-column header="Estatus" sortable>
      <template #body="{ data }: { data: ICargo }">
        <v-tag
          class="w-full"
          :severity="data.activo ? 'success' : 'danger'"
          :value="data.activo ? 'Activo' : 'Inactivo'"
        />
      </template>
    </v-column>

    <v-column header="Acciones" :exportable="false">
      <template #body="{ data }: { data: ICargo }">
        <div class="flex gap-2 justify-center">
          <router-link
            :to="{ name: 'modificar-cargo', params: { id: data.id } }"
            v-if="verificarPermiso('Cargos.Modificar')"
          >
            <v-button icon="pi pi-pencil" severity="warn" size="small" />
          </router-link>
          <router-link
            :to="{ name: 'bitacora-cargo', params: { id: data.id } }"
            v-if="verificarPermiso('Cargos.Bitacora')"
          >
            <v-button icon="pi pi-list" size="small" />
          </router-link>
          <v-button
            icon="pi pi-trash"
            severity="danger"
            size="small"
            @click="eliminar(data.id)"
            v-if="verificarPermiso('Cargos.Eliminar')"
          />
        </div>
      </template>
    </v-column>
  </v-datatable>
</template>

<style scoped></style>
